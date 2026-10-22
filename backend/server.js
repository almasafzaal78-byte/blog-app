const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 3000;

// Allow the frontend (Live Server) to talk to this backend
app.use(cors());

// Allow the server to read JSON sent from the frontend
// (limit is raised so a post with an image can be sent later)
app.use(express.json({ limit: "6mb" }));

// Temporary storage. It resets whenever the server restarts.
// A real database is added in Module 3.
const users = [];
const blogs = [];

// Test route
app.get("/", (req, res) => {
    res.json({ message: "Quillo backend is running" });
});

// REGISTER: create a new user
app.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required."
        });
    }

    if (String(password).length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters."
        });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    const alreadyExists = users.find(function (user) {
        return user.email === cleanEmail;
    });

    if (alreadyExists) {
        return res.status(409).json({
            message: "An account with this email already exists."
        });
    }

    const hashedPassword = await bcrypt.hash(String(password), 10);

    const user = {
        id: Date.now(),
        name: String(name).trim(),
        email: cleanEmail,
        password: hashedPassword,
        createdAt: new Date().toISOString()
    };

    users.push(user);

    // Never send the password back
    res.status(201).json({
        message: "Registration successful.",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        }
    });
});

// LOGIN: check email and password
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required."
        });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    const user = users.find(function (item) {
        return item.email === cleanEmail;
    });

    // Same message for both cases so nobody can guess which emails exist
    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password."
        });
    }

    const passwordMatches = await bcrypt.compare(String(password), user.password);

    if (!passwordMatches) {
        return res.status(401).json({
            message: "Invalid email or password."
        });
    }

    res.json({
        message: "Login successful.",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        }
    });
});

// CREATE BLOG: save a new post
app.post("/api/blogs", (req, res) => {
    const { title, category, status, content, image, authorEmail } = req.body || {};

    if (!title || !category || !content || !authorEmail) {
        return res.status(400).json({
            message: "Title, category, content and authorEmail are required."
        });
    }

    const cleanEmail = String(authorEmail).trim().toLowerCase();

    const author = users.find(function (user) {
        return user.email === cleanEmail;
    });

    if (!author) {
        return res.status(401).json({
            message: "Author not found. Please register or log in first."
        });
    }

    const cleanStatus = status === "Published" ? "Published" : "Draft";

    const blog = {
        id: Date.now(),
        title: String(title).trim(),
        category: String(category).trim(),
        status: cleanStatus,
        content: String(content),
        image: image ? String(image) : "",
        authorEmail: author.email,
        authorName: author.name,
        views: 0,
        createdAt: new Date().toISOString()
    };

    blogs.push(blog);

    res.status(201).json({
        message: "Blog created successfully.",
        blog: blog
    });
});

// GET BLOGS
// /api/blogs                      -> all published posts (public)
// /api/blogs?authorEmail=a@b.com  -> all posts of that author
app.get("/api/blogs", (req, res) => {
    const authorEmail = req.query.authorEmail
        ? String(req.query.authorEmail).trim().toLowerCase()
        : "";

    let result;

    if (authorEmail) {
        result = blogs.filter(function (blog) {
            return blog.authorEmail === authorEmail;
        });
    } else {
        result = blogs.filter(function (blog) {
            return blog.status === "Published";
        });
    }

    // Newest first
    result = result.slice().sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.json({
        count: result.length,
        blogs: result
    });
});

// Start the server
app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
});