# Quillo — Blog Application

A blog application built during the **Codomax Digital Solutions** internship. Module 1 covers the frontend and Module 2 adds a Node.js and Express backend with REST APIs.

Quillo lets writers register, log in, write posts with a rich text editor, and manage them from a personal dashboard.

## Features

**Frontend**
- Home page with a hero section, community posts and read-only access before login
- Register and Login with animated success feedback
- Personalised home page with the user's own published posts
- Dashboard with an overview of posts, drafts and total views
- Search by title and a Published / Draft status filter
- Analytics page with views and category charts
- Profile page with editable details
- Create Post page with a rich text editor and a live preview
- Draft and Published status for every post
- Edit a post from the dashboard
- Cover image through an image URL or an uploaded image (up to 1 MB)
- Fully responsive layout

**Backend (Module 2)**
- Express server with CORS enabled
- User registration with password hashing (bcryptjs)
- User login that checks the hashed password
- Create post API that checks the author is a registered user
- Get posts API (all published posts, or all posts of one author)
- Clear error messages, for example for duplicate emails or a wrong password
- The frontend register, login and create post pages are connected to these APIs

## Tech Stack

- HTML5, CSS3 and vanilla JavaScript
- Node.js and Express
- cors and bcryptjs
- Browser `localStorage` for the post lists shown on Home, Dashboard and Post detail

## API Endpoints

| Method | Endpoint | Purpose |
| ------ | -------- | ------- |
| GET | `/` | Check that the server is running |
| POST | `/api/register` | Create an account (`name`, `email`, `password`) |
| POST | `/api/login` | Log in (`email`, `password`) |
| POST | `/api/blogs` | Create a post (`title`, `category`, `status`, `content`, `image`, `authorEmail`) |
| GET | `/api/blogs` | Get all published posts |
| GET | `/api/blogs?authorEmail=name@example.com` | Get all posts of one author |

## Project Structure

- `backend/` — Express server (`server.js`) and its `package.json`
- `css/` — stylesheets (`style.css`, `dashboard-pages.css`)
- `js/` — shared frontend script (`script.js`)
- `index.html`, `home.html` — landing and home pages
- `login.html`, `register.html` — authentication pages
- `dashboard.html`, `analytics.html`, `profile.html` — workspace pages
- `create-blog.html` — new post editor with live preview
- `blog-detail.html` — single post view

## How to Run

**1. Start the backend**

```
cd backend
npm install
node server.js
```

The server runs at `http://localhost:3000`.

**2. Start the frontend**

1. Open the project folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `home.html` and choose **Open with Live Server**.

The backend must be running for sign up, log in and publishing posts to work.

## Notes

Users and posts are kept in the server's memory for now, so they reset whenever the server restarts. A database is added in the next module. Until then the post lists on Home, Dashboard and Post detail are read from the browser's `localStorage`, and editing or deleting a post only changes the browser copy.

## Author

**Almas Afzaal** — BS-IT
Codomax Digital Solutions Internship, Module 2