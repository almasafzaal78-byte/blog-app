// =====================================================================
// QUİLLO - COMPLETE SCRIPT.JS (UPDATED: register, login and create post use the backend)
// =====================================================================


// =====================================================================
// 1. AMBIENT ANIMATED BACKGROUND
// =====================================================================

(function initAmbient() {

    const bg = document.createElement("div");
    bg.className = "ambient-bg";
    bg.innerHTML =
        '<div class="wave wave-1"></div>' +
        '<div class="wave wave-2"></div>' +
        '<div class="wave wave-3"></div>';

    if (document.body) {
        document.body.prepend(bg);
    }

    const glyphs = ["A", "a", "Q", "W", "R", "e", "&", "¶", "§", "“", "”", "?"];
    const colors = ["#2f4a3c", "#c98a3f", "#4c7a54"];

    for (let i = 0; i < 16; i++) {

        const el = document.createElement("div");
        el.className = "floating-letter";
        el.textContent = glyphs[i % glyphs.length];
        el.style.left = (Math.random() * 96) + "vw";
        el.style.fontSize = (34 + Math.random() * 50) + "px";
        el.style.color = colors[i % colors.length];
        el.style.animationDuration = (16 + Math.random() * 14) + "s";
        el.style.animationDelay = "-" + (Math.random() * 25) + "s";
        el.style.setProperty("--peak", (0.18 + Math.random() * 0.14).toFixed(2));
        el.style.setProperty("--drift", (Math.random() * 120 - 60).toFixed(0) + "px");

        document.body.appendChild(el);
    }

})();



// =====================================================================
// 2. HOME HERO EFFECTS
// =====================================================================

(function initHeroFx() {

    const fx = document.getElementById("hero-fx");

    if (!fx) return;

    fx.innerHTML =
        '<div class="hero-orb o1"></div>' +
        '<div class="hero-orb o2"></div>' +
        '<div class="hero-ring r1"></div>' +
        '<div class="hero-ring r2"></div>';

    const glyphs = ["A", "a", "Q", "W", "¶", "“", "&", "R", "§", "e", "”"];
    const tints = ["#f5f1e6", "#e0a24a"];

    for (let i = 0; i < 20; i++) {

        const g = document.createElement("span");
        g.className = "hero-glyph";
        g.textContent = glyphs[i % glyphs.length];
        g.style.left = (Math.random() * 96) + "%";
        g.style.fontSize = (28 + Math.random() * 46) + "px";
        g.style.color = tints[i % 2];
        g.style.animationDuration = (9 + Math.random() * 9) + "s";
        g.style.animationDelay = "-" + (Math.random() * 14) + "s";
        g.style.setProperty("--peak", (0.22 + Math.random() * 0.2).toFixed(2));
        g.style.setProperty("--drift", (Math.random() * 90 - 45).toFixed(0) + "px");

        fx.appendChild(g);
    }

})();



// =====================================================================
// 3. TYPEWRITER CARD
// =====================================================================

(function initTypewriterCard() {

    const target = document.getElementById("type-target");

    if (!target) return;

    const lines = [
        "Notes on writing every day",
        "Small habits, better posts",
        "Publish before you feel ready"
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {

        const full = lines[lineIndex];

        if (!deleting) {

            charIndex++;
            target.textContent = full.slice(0, charIndex);

            if (charIndex === full.length) {
                deleting = true;
                setTimeout(tick, 1400);
                return;
            }

        } else {

            charIndex--;
            target.textContent = full.slice(0, charIndex);

            if (charIndex === 0) {
                deleting = false;
                lineIndex = (lineIndex + 1) % lines.length;
            }
        }

        setTimeout(tick, deleting ? 28 : 55);
    }

    tick();

})();



// =====================================================================
// 4. PAGE TRANSITION
// =====================================================================

function navigateTo(url) {

    if (document.querySelector(".exit-green")) {
        return;
    }

    const gold = document.createElement("div");
    gold.className = "exit-gold";

    const green = document.createElement("div");
    green.className = "exit-green";
    green.textContent = "Quillo";

    document.body.appendChild(gold);
    document.body.appendChild(green);

    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            gold.classList.add("in");
            green.classList.add("in");
        });
    });

    setTimeout(function () {
        window.location.href = url;
    }, 680);
}


document.addEventListener("click", function (e) {

    if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey
    ) {
        return;
    }

    const link = e.target.closest("a");

    if (!link) return;

    const href = link.getAttribute("href");

    if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
    ) {
        return;
    }

    if (link.target === "_blank" || link.hasAttribute("download")) {
        return;
    }

    if (/^https?:\/\//i.test(href) && !href.includes(window.location.hostname)) {
        return;
    }

    e.preventDefault();

    navigateTo(href);

});


window.addEventListener("pageshow", function (e) {

    if (e.persisted) {

        document
            .querySelectorAll(".exit-gold, .exit-green")
            .forEach(function (el) {
                el.remove();
            });

    }

});



// =====================================================================
// 5. SPLASH SCREEN
// =====================================================================

window.addEventListener("load", function () {

    const splash = document.getElementById("splash-screen");

    if (!splash) return;

    if (sessionStorage.getItem("splashShown")) {

        splash.style.display = "none";

    } else {

        setTimeout(function () {

            splash.style.opacity = "0";

            setTimeout(function () {
                splash.style.display = "none";
            }, 600);

        }, 2400);

        sessionStorage.setItem("splashShown", "true");
    }

});



// =====================================================================
// 6. TOAST / FLASH MESSAGE
// =====================================================================

function showToast(message, type) {

    type = type || "info";

    const old = document.querySelector(".flash-text");

    if (old) old.remove();

    const wrap = document.createElement("div");
    wrap.className = "flash-text flash-" + type;

    const letters = document.createElement("div");
    letters.className = "flash-letters";

    let index = 0;

    message.split(" ").forEach(function (word, wi, arr) {

        const w = document.createElement("span");
        w.className = "flash-word";

        word.split("").forEach(function (ch) {

            const s = document.createElement("span");
            s.className = "ch";
            s.textContent = ch;
            s.style.animationDelay = (index * 35) + "ms";

            w.appendChild(s);

            index++;

        });

        letters.appendChild(w);

        if (wi < arr.length - 1) {
            letters.appendChild(document.createTextNode(" "));
            index++;
        }

    });

    const line = document.createElement("div");
    line.className = "flash-line";

    wrap.appendChild(letters);
    wrap.appendChild(line);

    document.body.appendChild(wrap);

    const visibleFor = index * 35 + 1700;

    setTimeout(function () {

        wrap.classList.add("out");

        setTimeout(function () {
            wrap.remove();
        }, 500);

    }, visibleFor);

}



// =====================================================================
// 7. BLOG DATA
// =====================================================================

function getBlogs() {

    let blogs = localStorage.getItem("blogs");

    if (!blogs) {

        const seed = [

            {
                id: "1",
                title: "Sample Blog Title",
                category: "General",
                content:
                    "This is the full content of the sample blog post. It talks about how to get started with writing consistently, finding a topic you care about, and sharing it with the world.",
                date: "Sep 20, 2026",
                views: 128,
                status: "Published",
                authorEmail: "test@example.com",
                coverImage: null
            },

            {
                id: "2",
                title: "Another Blog Title",
                category: "Career",
                content:
                    "This is the full content of another blog post. Here we dive deeper into the topic, sharing personal experiences and lessons learned along the way.",
                date: "Sep 18, 2026",
                views: 84,
                status: "Published",
                authorEmail: "test@example.com",
                coverImage: null
            },

            {
                id: "3",
                title: "Notes from my first internship week",
                category: "Career",
                content:
                    "Everything felt new during my first week. From setting up the development environment to understanding the team's workflow, there was a lot to absorb.",
                date: "Sep 14, 2026",
                views: 76,
                status: "Published",
                authorEmail: "demo@writer.com",
                coverImage: null
            },

            {
                id: "4",
                title: "Five VS Code extensions I actually use",
                category: "Tools",
                content:
                    "There are hundreds of VS Code extensions out there, but only a handful actually make it into my daily workflow.",
                date: "Sep 10, 2026",
                views: 0,
                status: "Draft",
                authorEmail: "demo@writer.com",
                coverImage: null
            }

        ];

        localStorage.setItem("blogs", JSON.stringify(seed));

        blogs = JSON.stringify(seed);
    }

    return JSON.parse(blogs);
}


function saveBlogs(blogs) {

    localStorage.setItem("blogs", JSON.stringify(blogs));

}


function getNextId(blogs) {

    const maxId = blogs.reduce(function (max, b) {
        return Math.max(max, parseInt(b.id, 10));
    }, 0);

    return String(maxId + 1);

}


function stripHtml(html) {

    const div = document.createElement("div");

    div.innerHTML = html || "";

    return div.textContent || div.innerText || "";

}


function wordCount(html) {

    return stripHtml(html)
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .length;

}


function readTime(html) {

    return Math.max(1, Math.round(wordCount(html) / 200));

}



// =====================================================================
// 8. BLOG IMAGES
// =====================================================================

const WRITING_PHOTO_IDS = [

    "1455390582262-044cdead277a",
    "1519682337058-a94d519337bc",
    "1544716278-ca5e3f4abd8c",
    "1512820790803-83ca734da794",
    "1517971053567-8bde93bc6a58",
    "1450101499163-c8848c66ca85",
    "1481627834876-b7833e8f5570",
    "1517842645767-c639042777db"

];


function blogImage(id) {

    const photoId =
        WRITING_PHOTO_IDS[parseInt(id, 10) % WRITING_PHOTO_IDS.length];

    return (
        "https://images.unsplash.com/photo-" +
        photoId +
        "?auto=format&fit=crop&w=700&h=450&q=60"
    );

}


function blogCardHTML(b) {

    const img = b.coverImage || blogImage(b.id);

    return `
        <div class="blog-card">

            <a
                href="blog-detail.html?id=${b.id}"
                class="blog-link">

                <div class="blog-card-img-wrap">

                    <img
                        src="${img}"
                        class="blog-card-img"
                        alt="${b.title}">

                </div>

                <div class="blog-card-body">

                    <span class="category-tag">
                        ${b.category}
                    </span>

                    <h3>
                        ${b.title}
                    </h3>

                    <p>
                        ${stripHtml(b.content).substring(0, 90)}...
                    </p>

                    <p class="blog-meta">
                        ${b.date} ·
                        ${b.views} views ·
                        ${readTime(b.content)} min read
                    </p>

                </div>

            </a>

        </div>
    `;

}



// =====================================================================
// 9. AUTH UI + ACTIVE NAV
// =====================================================================

function updateAuthUI() {

    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const name = localStorage.getItem("userName") || "there";
    const email = localStorage.getItem("userEmail") || "-";
    const bio = localStorage.getItem("userBio") || "";
    const avatar = localStorage.getItem("userAvatar") || "";
    const joined = localStorage.getItem("userJoinDate") || "";


    document.querySelectorAll(".guest-nav").forEach(function (el) {
        el.style.display = loggedIn ? "none" : "flex";
    });

    document.querySelectorAll(".user-nav").forEach(function (el) {
        el.style.display = loggedIn ? "flex" : "none";
    });

    document.querySelectorAll(".guest-only-section").forEach(function (el) {
        el.style.display = loggedIn ? "none" : "block";
    });

    document.querySelectorAll(".user-only-section").forEach(function (el) {
        el.style.display = loggedIn ? "block" : "none";
    });

    document.querySelectorAll(".welcome-name").forEach(function (el) {
        el.innerText = name;
    });


    const initial = name.charAt(0).toUpperCase();


    const profileIcon = document.getElementById("profile-icon");

    if (profileIcon) {
        profileIcon.innerHTML =
            avatar ? '<img src="' + avatar + '" alt="">' : initial;
    }


    const avatarLg = document.getElementById("profile-avatar-lg");

    if (avatarLg) {
        avatarLg.innerHTML =
            avatar ? '<img src="' + avatar + '" alt="">' : initial;
    }


    const dropNameLg = document.getElementById("dropdown-name-lg");

    if (dropNameLg) {
        dropNameLg.innerText = name;
    }


    const dropJoined = document.getElementById("dropdown-joined");

    if (dropJoined) {
        dropJoined.innerText = joined ? "Member since " + joined : "";
    }


    const dropBio = document.getElementById("dropdown-bio");

    if (dropBio) {
        dropBio.innerText = bio;
    }


    const dropEmail = document.getElementById("dropdown-email");

    if (dropEmail) {
        dropEmail.innerText = email;
    }


    const myPosts = getBlogs().filter(function (b) {
        return b.authorEmail === email;
    }).length;


    const dropCount = document.getElementById("dropdown-postcount");

    if (dropCount) {
        dropCount.innerText = myPosts;
    }


    // ---------------- PROFILE TAB ----------------

    const ptAvatar = document.getElementById("pt-avatar");

    if (ptAvatar) {
        ptAvatar.innerHTML =
            avatar ? '<img src="' + avatar + '" alt="">' : initial;
    }

    const ptName = document.getElementById("pt-name");

    if (ptName) {
        ptName.innerText = name;
    }

    const ptEmail = document.getElementById("pt-email");

    if (ptEmail) {
        ptEmail.innerText = email;
    }

    const ptBio = document.getElementById("pt-bio");

    if (ptBio) {
        ptBio.innerText = bio || "No bio added yet.";
    }

    const ptPosts = document.getElementById("pt-posts");

    if (ptPosts) {
        ptPosts.innerText = myPosts;
    }

    const ptJoined = document.getElementById("pt-joined");

    if (ptJoined) {
        ptJoined.innerText = joined || "—";
    }

    // Active navbar highlight
    setActiveNav();

}


// Highlight only the nav link of the page that is open
function setActiveNav() {

    var path = window.location.pathname.split("/").pop() || "home.html";

    // index.html counts as home
    if (path === "index.html" || path === "") {
        path = "home.html";
    }

    document.querySelectorAll(".nav-links a").forEach(function (link) {

        var href = link.getAttribute("href");

        if (!href) return;

        link.classList.remove("active");

        if (href === path) {
            link.classList.add("active");
        }

    });

}


updateAuthUI();



// =====================================================================
// 10. PROFILE DROPDOWN
// =====================================================================

const profileToggle = document.getElementById("profile-icon");
const profileDropdown = document.getElementById("profile-dropdown");


if (profileToggle && profileDropdown) {

    profileToggle.addEventListener("click", function (e) {

        e.stopPropagation();

        profileDropdown.classList.toggle("open");

    });


    document.addEventListener("click", function (e) {

        if (
            !profileDropdown.contains(e.target) &&
            e.target !== profileToggle
        ) {
            profileDropdown.classList.remove("open");
        }

    });

}



// =====================================================================
// 11. EDIT PROFILE MODAL
// =====================================================================

const editProfileBtn = document.getElementById("edit-profile-btn");
const ptEditBtn = document.getElementById("pt-edit-btn");
const editProfileModal = document.getElementById("edit-profile-modal");
const editProfileForm = document.getElementById("edit-profile-form");
const editProfileCancel = document.getElementById("edit-profile-cancel");
const editAvatarInput = document.getElementById("edit-avatar-input");
const editAvatarPreview = document.getElementById("edit-avatar-preview");

let editAvatarBase64 = null;



function openEditProfileModal() {

    if (!editProfileModal) {
        return;
    }

    const name = localStorage.getItem("userName") || "";
    const email = localStorage.getItem("userEmail") || "";
    const bio = localStorage.getItem("userBio") || "";
    const avatar = localStorage.getItem("userAvatar") || "";

    const nameInput = document.getElementById("edit-name");
    const emailInput = document.getElementById("edit-email");
    const bioInput = document.getElementById("edit-bio");
    const passwordInput = document.getElementById("edit-password");

    if (nameInput) nameInput.value = name;
    if (emailInput) emailInput.value = email;
    if (bioInput) bioInput.value = bio;
    if (passwordInput) passwordInput.value = "";

    editAvatarBase64 = avatar || null;

    if (editAvatarPreview) {
        editAvatarPreview.innerHTML =
            avatar
                ? '<img src="' + avatar + '" alt="">'
                : name.charAt(0).toUpperCase();
    }

    editProfileModal.classList.add("open");

    if (profileDropdown) {
        profileDropdown.classList.remove("open");
    }

}



function closeEditProfileModal() {

    if (editProfileModal) {
        editProfileModal.classList.remove("open");
    }

}



if (editProfileBtn) {
    editProfileBtn.addEventListener("click", openEditProfileModal);
}

if (ptEditBtn) {
    ptEditBtn.addEventListener("click", openEditProfileModal);
}

if (editProfileCancel) {
    editProfileCancel.addEventListener("click", closeEditProfileModal);
}

if (editProfileModal) {

    editProfileModal.addEventListener("click", function (e) {

        if (e.target === editProfileModal) {
            closeEditProfileModal();
        }

    });

}


document.addEventListener("keydown", function (e) {

    if (
        e.key === "Escape" &&
        editProfileModal &&
        editProfileModal.classList.contains("open")
    ) {
        closeEditProfileModal();
    }

});



if (editAvatarInput) {

    editAvatarInput.addEventListener("change", function () {

        const file = editAvatarInput.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            editAvatarBase64 = e.target.result;

            if (editAvatarPreview) {
                editAvatarPreview.innerHTML =
                    '<img src="' + editAvatarBase64 + '" alt="">';
            }

        };

        reader.readAsDataURL(file);

    });

}



if (editProfileForm) {

    editProfileForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const newName = document.getElementById("edit-name").value.trim();
        const newEmail = document.getElementById("edit-email").value.trim();
        const newBio = document.getElementById("edit-bio").value.trim();
        const newPassword = document.getElementById("edit-password");

        const oldEmail = localStorage.getItem("userEmail") || "";

        localStorage.setItem("userName", newName);
        localStorage.setItem("userEmail", newEmail);
        localStorage.setItem("userBio", newBio);

        if (editAvatarBase64) {
            localStorage.setItem("userAvatar", editAvatarBase64);
        }

        if (oldEmail && newEmail && oldEmail !== newEmail) {

            const blogs = getBlogs().map(function (b) {

                if (b.authorEmail === oldEmail) {
                    return Object.assign({}, b, { authorEmail: newEmail });
                }

                return b;

            });

            saveBlogs(blogs);

        }

        if (newPassword && newPassword.value.trim()) {
            localStorage.setItem("userPassword", newPassword.value.trim());
        }

        closeEditProfileModal();

        updateAuthUI();

        showToast("Profile updated!", "success");

    });

}



// =====================================================================
// 12. WELCOME SCREEN
// =====================================================================

const primaryAuthBtn = document.getElementById("primary-auth-btn");
const secondaryAuthBtn = document.getElementById("secondary-auth-btn");
const welcomeSubtext = document.getElementById("welcome-subtext");


if (primaryAuthBtn && secondaryAuthBtn) {

    const hasAccount = !!localStorage.getItem("userEmail");

    if (hasAccount) {

        primaryAuthBtn.href = "login.html";
        primaryAuthBtn.innerText = "Log in";

        secondaryAuthBtn.href = "register.html";
        secondaryAuthBtn.innerText = "Sign up";

        if (welcomeSubtext) {
            welcomeSubtext.innerText = "Welcome back! Log in to continue.";
        }

    } else {

        primaryAuthBtn.href = "register.html";
        primaryAuthBtn.innerText = "Sign up";

        secondaryAuthBtn.href = "login.html";
        secondaryAuthBtn.innerText = "Log in";

        if (welcomeSubtext) {
            welcomeSubtext.innerText =
                "New here? Create an account to get started.";
        }

    }

}



// =====================================================================
// 13. LOGOUT
// =====================================================================

document.querySelectorAll(".logout-link").forEach(function (btn) {

    btn.addEventListener("click", function () {

        localStorage.removeItem("isLoggedIn");

        showToast("Logged out.", "info");

        setTimeout(function () {
            navigateTo("home.html");
        }, 1300);

    });

});



// =====================================================================
// 13b. BACKEND API HELPER
// The backend (Express) must be running: node server.js
// =====================================================================

const API_URL = "http://localhost:3000";


async function apiPost(path, body) {

    try {

        const response = await fetch(API_URL + path, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        let data = {};

        try {
            data = await response.json();
        } catch (err) {
            data = {};
        }

        return { ok: response.ok, status: response.status, data: data };

    } catch (error) {

        return {
            ok: false,
            status: 0,
            data: {
                message:
                    "Cannot reach the server. Please make sure the backend is running."
            }
        };

    }

}


function formatJoinDate(isoDate) {

    const date = isoDate ? new Date(isoDate) : new Date();

    return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric"
    });

}



// =====================================================================
// 14. REGISTER (uses POST /api/register)
// =====================================================================

const registerForm = document.getElementById("register-form");


if (registerForm) {

    registerForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirm = document.getElementById("confirm-password").value;

        if (password !== confirm) {
            showToast("Passwords do not match.", "error");
            return;
        }

        const submitBtn = registerForm.querySelector('button[type="submit"]');

        if (submitBtn) submitBtn.disabled = true;

        const result = await apiPost("/api/register", {
            name: name,
            email: email,
            password: password
        });

        if (submitBtn) submitBtn.disabled = false;

        if (!result.ok) {
            showToast(
                result.data.message || "Registration failed. Please try again.",
                "error"
            );
            return;
        }

        const user = result.data.user;

        localStorage.setItem("userName", user.name);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userJoinDate", formatJoinDate(user.createdAt));

        // The password is never kept in the browser any more
        localStorage.removeItem("userPassword");

        showToast("Account created! Please log in.", "success");

        registerForm.reset();

        setTimeout(function () {
            navigateTo("login.html");
        }, 2100);

    });

}



// =====================================================================
// 15. LOGIN (uses POST /api/login)
// =====================================================================

const loginForm = document.getElementById("login-form");


if (loginForm) {

    loginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const submitBtn = loginForm.querySelector('button[type="submit"]');

        if (submitBtn) submitBtn.disabled = true;

        const result = await apiPost("/api/login", {
            email: email,
            password: password
        });

        if (submitBtn) submitBtn.disabled = false;

        if (!result.ok) {
            showToast(
                result.data.message || "Login failed. Please try again.",
                "error"
            );
            return;
        }

        const user = result.data.user;

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userJoinDate", formatJoinDate(user.createdAt));

        // The password is never kept in the browser any more
        localStorage.removeItem("userPassword");

        showToast("Login successful!", "success");

        setTimeout(function () {
            navigateTo("home.html");
        }, 1700);

    });

}



// =====================================================================
// 16. BACKGROUND SLIDESHOW
// =====================================================================

function initBgSlideshow(containerId) {

    const container = document.getElementById(containerId);

    if (!container) return;

    WRITING_PHOTO_IDS.forEach(function (photoId, i) {

        const img = document.createElement("img");

        img.src =
            "https://images.unsplash.com/photo-" +
            photoId +
            "?auto=format&fit=crop&w=1600&h=900&q=70";

        if (i === 0) {
            img.className = "active";
        }

        container.appendChild(img);

    });

    let current = 0;

    setInterval(function () {

        const imgs = container.querySelectorAll("img");

        if (!imgs.length) return;

        imgs[current].classList.remove("active");

        current = (current + 1) % imgs.length;

        imgs[current].classList.add("active");

    }, 4500);

}



// =====================================================================
// 17. ROTATING QUOTES
// =====================================================================

const WRITER_QUOTES = [

    "Here's what you've published so far.",
    "Every great post starts with a single sentence.",
    "Small consistent writing beats occasional bursts.",
    "Your ideas deserve to be read — keep going.",
    "The best time to write was yesterday. The next best time is now.",
    "One more paragraph today is progress."

];


function initRotatingQuote(elementId) {

    const el = document.getElementById(elementId);

    if (!el) return;

    let index = 0;

    setInterval(function () {

        el.classList.add("fade-out");

        setTimeout(function () {

            index = (index + 1) % WRITER_QUOTES.length;

            el.innerText = WRITER_QUOTES[index];

            el.classList.remove("fade-out");

        }, 600);

    }, 4000);

}



// =====================================================================
// 18. HOME PAGE
// =====================================================================

const homeBlogGrid = document.getElementById("home-blog-grid");


if (homeBlogGrid) {

    const blogs = getBlogs().filter(function (b) {
        return b.status === "Published";
    });

    homeBlogGrid.innerHTML =
        blogs.length === 0
            ? '<p class="empty-state">No posts yet. Be the first to write one!</p>'
            : blogs.map(blogCardHTML).join("");

}



const myHomeGrid = document.getElementById("my-home-grid");


if (myHomeGrid) {

    initBgSlideshow("home-bg-slideshow");

    initRotatingQuote("rotating-quote");

    const email = localStorage.getItem("userEmail") || "";

    const mine = getBlogs().filter(function (b) {
        return b.authorEmail === email && b.status === "Published";
    });

    myHomeGrid.innerHTML =
        mine.length === 0
            ? '<p class="empty-state">You haven\'t published anything yet. <a href="create-blog.html">Write your first post →</a></p>'
            : mine.map(blogCardHTML).join("");

}



// =====================================================================
// 19. COUNT ANIMATION
// =====================================================================

document.querySelectorAll(".count").forEach(function (el) {

    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1600;

    function start() {

        const t0 = performance.now();

        function tick(now) {

            const p = Math.min((now - t0) / duration, 1);

            const val = target * (1 - Math.pow(1 - p, 3));

            el.textContent =
                (
                    decimals
                        ? val.toFixed(decimals)
                        : Math.round(val).toLocaleString()
                ) + suffix;

            if (p < 1) {
                requestAnimationFrame(tick);
            }

        }

        requestAnimationFrame(tick);

    }

    setTimeout(start, 900);

});



// =====================================================================
// 20. DASHBOARD
// =====================================================================

let dashMasterList = [];
let currentStatusFilter = "all";
let chartsRendered = false;



function populateCategoryFilter(list) {

    const select = document.getElementById("filter-category");

    if (!select) return;

    const categories = Array.from(
        new Set(list.map(function (b) { return b.category; }))
    ).sort();

    select.innerHTML =
        '<option value="all">All Categories</option>' +
        categories.map(function (c) {
            return '<option value="' + c + '">' + c + "</option>";
        }).join("");

}



function publishedThisMonth(list) {

    const now = new Date();

    return list.filter(function (b) {

        if (b.status !== "Published") {
            return false;
        }

        const d = new Date(b.date);

        return (
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
        );

    }).length;

}



function renderDashStats(list) {

    const published = list.filter(function (b) {
        return b.status === "Published";
    });

    const drafts = list.filter(function (b) {
        return b.status === "Draft";
    }).length;

    const totalViews = published.reduce(function (sum, b) {
        return sum + (b.views || 0);
    }, 0);

    let avgText = "—";

    if (list.length) {

        const avgSec = Math.round(
            list.reduce(function (s, b) {
                return s + wordCount(b.content) / 200 * 60;
            }, 0) / list.length
        );

        avgText =
            Math.floor(avgSec / 60) +
            "m " +
            String(avgSec % 60).padStart(2, "0") +
            "s";

    }

    const readTimeEl = document.getElementById("stat-readtime");
    const publishedEl = document.getElementById("stat-published");
    const draftsEl = document.getElementById("stat-drafts");
    const viewsEl = document.getElementById("stat-views");

    if (readTimeEl) readTimeEl.innerText = avgText;
    if (publishedEl) publishedEl.innerText = published.length;
    if (draftsEl) draftsEl.innerText = drafts;
    if (viewsEl) viewsEl.innerText = totalViews;

    const pubTrend = document.getElementById("stat-published-trend");
    const viewsTrend = document.getElementById("stat-views-trend");

    if (pubTrend) {
        pubTrend.innerText = "▲ " + publishedThisMonth(list) + " this month";
    }

    if (viewsTrend) {
        viewsTrend.innerText =
            "across " +
            published.length +
            " published post" +
            (published.length === 1 ? "" : "s");
    }

    const statsLine = document.getElementById("dash-stats");

    if (statsLine) {

        statsLine.innerText =
            list.length === 0
                ? "You haven't published anything yet — create your first post!"
                : "You have " +
                  list.length +
                  " post" +
                  (list.length > 1 ? "s" : "") +
                  " — " +
                  published.length +
                  " published, " +
                  drafts +
                  " draft" +
                  (drafts !== 1 ? "s" : "") +
                  ".";

    }

}



// =====================================================================
// 21. ANALYTICS CHARTS
// =====================================================================

function renderCharts(list) {

    const chart = document.getElementById("bar-chart");
    const labels = document.getElementById("bar-labels");

    if (!chart || !labels) return;

    const published = list.filter(function (b) {
        return b.status === "Published";
    });

    const totalViews = published.reduce(function (s, b) {
        return s + (b.views || 0);
    }, 0);

    const weights = [8, 10, 9, 13, 11, 14, 13, 22];

    const wSum = weights.reduce(function (a, b) {
        return a + b;
    }, 0);

    let values;

    if (totalViews > 0) {

        values = weights.map(function (w) {
            return Math.round(totalViews * w / wSum);
        });

    } else {

        values = [22, 34, 26, 48, 38, 55, 44, 70];

    }

    const max = Math.max.apply(null, values.concat([1]));

    chart.innerHTML = "";
    labels.innerHTML = "";

    values.forEach(function (v, i) {

        const bar = document.createElement("div");

        const isLast = i === values.length - 1;

        bar.className = "bar" + (isLast ? " highlight" : "");

        bar.setAttribute(
            "data-val",
            totalViews > 0 ? v + " views" : "waiting for views"
        );

        bar.style.transitionDelay = (i * 60) + "ms";

        if (isLast) {

            const signal = document.createElement("span");
            signal.className = "bar-signal";

            bar.appendChild(signal);

        }

        chart.appendChild(bar);

        const lab = document.createElement("span");
        lab.textContent = "W" + (i + 1);

        labels.appendChild(lab);

        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                bar.style.height = Math.max(6, (v / max) * 100) + "%";
            });
        });

    });

    const donut = document.getElementById("donut");
    const legend = document.getElementById("donut-legend");

    if (!donut || !legend) return;

    if (list.length === 0) {

        donut.style.background = "conic-gradient(#e8e0c9 0 100%)";
        legend.innerHTML = "<span>No categories yet</span>";

        return;

    }

    const counts = {};

    list.forEach(function (b) {
        counts[b.category] = (counts[b.category] || 0) + 1;
    });

    let entries = Object.keys(counts)
        .map(function (k) {
            return [k, counts[k]];
        })
        .sort(function (a, b) {
            return b[1] - a[1];
        });

    if (entries.length > 4) {

        const rest = entries.slice(4).reduce(function (s, e) {
            return s + e[1];
        }, 0);

        entries = entries.slice(0, 4).concat([["Other", rest]]);

    }

    const colors = ["#2f4a3c", "#c98a3f", "#7ea27f", "#a15c33", "#8f8a76"];

    let acc = 0;

    const stops = [];

    entries.forEach(function (e, i) {

        const pct = e[1] / list.length * 100;

        stops.push(colors[i] + " " + acc + "% " + (acc + pct) + "%");

        acc += pct;

    });

    donut.style.background = "conic-gradient(" + stops.join(",") + ")";

    legend.innerHTML = entries.map(function (e, i) {

        return (
            '<span>' +
            '<i class="legend-dot" style="background:' +
            colors[i] +
            '"></i>' +
            e[0] +
            " (" +
            Math.round(e[1] / list.length * 100) +
            "%)" +
            "</span>"
        );

    }).join("");

}



// =====================================================================
// 22. DASHBOARD TABLE
// =====================================================================

function renderDashTable(list) {

    const body = document.getElementById("dash-table-body");

    if (!body) return;

    if (list.length === 0) {

        body.innerHTML =
            '<tr>' +
            '<td colspan="5" style="text-align:center; color:#8f8a76; padding:30px;">' +
            "No posts match." +
            "</td>" +
            "</tr>";

        return;

    }

    body.innerHTML = list.map(function (b) {

        const badgeClass =
            b.status === "Published" ? "status-published" : "status-draft";

        const viewsDisplay = b.status === "Published" ? b.views : "—";

        return `

            <tr data-id="${b.id}">

                <td class="title-cell">

                    <a href="blog-detail.html?id=${b.id}">
                        ${b.title}
                    </a>

                </td>

                <td>
                    <span class="status-badge ${badgeClass}">
                        ${b.status}
                    </span>
                </td>

                <td>
                    ${b.date}
                </td>

                <td>
                    ${viewsDisplay}
                </td>

                <td>

                    <button
                        class="action-edit"
                        onclick="goToEdit('${b.id}')">
                        Edit
                    </button>

                    <button
                        class="action-delete"
                        onclick="deletePost('${b.id}')">
                        Delete
                    </button>

                </td>

            </tr>

        `;

    }).join("");

}



// =====================================================================
// 23. DASHBOARD FILTERS
// =====================================================================

function applyDashFilters() {

    const searchInput = document.getElementById("search-title");
    const categoryFilter = document.getElementById("filter-category");
    const sortFilter = document.getElementById("filter-sort");

    const term = searchInput ? searchInput.value.toLowerCase() : "";
    const category = categoryFilter ? categoryFilter.value : "all";
    const sort = sortFilter ? sortFilter.value : "newest";

    let filtered = dashMasterList.filter(function (b) {
        return b.title.toLowerCase().includes(term);
    });

    if (currentStatusFilter !== "all") {

        filtered = filtered.filter(function (b) {
            return b.status === currentStatusFilter;
        });

    }

    if (category !== "all") {

        filtered = filtered.filter(function (b) {
            return b.category === category;
        });

    }

    filtered = filtered.slice().sort(function (a, b) {

        if (sort === "views") {
            return (b.views || 0) - (a.views || 0);
        }

        const da = new Date(a.date);
        const db = new Date(b.date);

        return sort === "oldest" ? da - db : db - da;

    });

    renderDashTable(filtered);

    const countEl = document.getElementById("results-count");

    if (countEl) {

        countEl.innerText =
            "Showing " +
            filtered.length +
            " of " +
            dashMasterList.length +
            " posts";

    }

}



// =====================================================================
// 24. REFRESH DASHBOARD
// =====================================================================

function refreshDashboard() {

    renderDashStats(dashMasterList);

    if (chartsRendered) {
        renderCharts(dashMasterList);
    }

    populateCategoryFilter(dashMasterList);

    applyDashFilters();

}



// =====================================================================
// 25. STATUS CHIPS
// =====================================================================

document.querySelectorAll(".status-chip").forEach(function (chip) {

    chip.addEventListener("click", function () {

        document.querySelectorAll(".status-chip").forEach(function (c) {
            c.classList.remove("active");
        });

        chip.classList.add("active");

        currentStatusFilter = chip.dataset.status;

        applyDashFilters();

    });

});



// =====================================================================
// 26. DASHBOARD SIDEBAR TAB SWITCHING
// =====================================================================

document.querySelectorAll(".dash-tab").forEach(function (tab) {

    tab.addEventListener("click", function () {

        document.querySelectorAll(".dash-tab").forEach(function (t) {
            t.classList.remove("active");
        });

        document.querySelectorAll(".dash-panel").forEach(function (panel) {
            panel.classList.remove("active");
        });

        tab.classList.add("active");

        const panelId = tab.dataset.panel;

        const targetPanel = document.getElementById(panelId);

        if (targetPanel) {
            targetPanel.classList.add("active");
        }

        if (panelId === "panel-analytics") {

            chartsRendered = true;

            renderCharts(dashMasterList);

        }

    });

});



// =====================================================================
// 27. INITIALIZE DASHBOARD
// =====================================================================

const dashTableBody = document.getElementById("dash-table-body");


if (dashTableBody) {

    initBgSlideshow("dash-bg-slideshow");

    const currentEmail = localStorage.getItem("userEmail") || "";

    dashMasterList = getBlogs().filter(function (b) {
        return b.authorEmail === currentEmail;
    });

    refreshDashboard();

    const searchInput = document.getElementById("search-title");
    const categoryFilter = document.getElementById("filter-category");
    const sortFilter = document.getElementById("filter-sort");

    if (searchInput) {
        searchInput.addEventListener("input", applyDashFilters);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener("change", applyDashFilters);
    }

    if (sortFilter) {
        sortFilter.addEventListener("change", applyDashFilters);
    }

}



// =====================================================================
// 28. EDIT POST
// =====================================================================

function goToEdit(id) {

    navigateTo("create-blog.html?edit=" + id);

}



// =====================================================================
// 29. DELETE POST
// =====================================================================

function deletePost(id) {

    saveBlogs(
        getBlogs().filter(function (b) {
            return b.id !== id;
        })
    );

    dashMasterList = dashMasterList.filter(function (b) {
        return b.id !== id;
    });

    refreshDashboard();

    showToast("Post deleted.", "success");

}



// =====================================================================
// 30. CREATE / EDIT POST (create-blog.html)
// New posts are sent to the backend (POST /api/blogs). A copy is also kept
// in localStorage so Home, Dashboard and Blog detail keep working.
// Editing an existing post only changes the browser copy for now.
// =====================================================================

const createBlogForm = document.getElementById("create-blog-form");


if (createBlogForm) {

    const MAX_IMAGE_BYTES = 1024 * 1024;

    const titleEl = document.getElementById("blog-title");
    const categoryEl = document.getElementById("blog-category");
    const statusEl = document.getElementById("np-status");
    const editorEl = document.getElementById("np-editor-content");
    const imageUrlEl = document.getElementById("blog-image");
    const imageFileEl = document.getElementById("np-image-file");
    const publishBtn = document.getElementById("np-publish-btn");
    const publishLabel = document.getElementById("np-publish-label");

    // Edit mode: dashboard links to create-blog.html?id=... (or ?edit=...)
    const params = new URLSearchParams(window.location.search);
    const editId = params.get("edit") || params.get("id");

    let editingPost = null;

    if (editId) {

        editingPost = getBlogs().find(function (b) {
            return String(b.id) === String(editId);
        }) || null;

    }


    function resetPublishButton() {

        if (publishBtn) publishBtn.disabled = false;

        if (publishLabel) {
            publishLabel.textContent =
                editingPost ? "Save changes" : "Publish Post";
        }

    }


    function readFileAsDataUrl(file) {

        return new Promise(function (resolve, reject) {

            const reader = new FileReader();

            reader.onload = function () {
                resolve(reader.result);
            };

            reader.onerror = function () {
                reject(new Error("Could not read the image."));
            };

            reader.readAsDataURL(file);

        });

    }


    // Fill the form after the page script has finished loading
    document.addEventListener("DOMContentLoaded", function () {

        if (editId && !editingPost) {
            showToast("That post could not be found.", "error");
            return;
        }

        if (!editingPost) return;

        titleEl.value = editingPost.title || "";
        categoryEl.value = editingPost.category || "";

        if (statusEl) {
            statusEl.value =
                editingPost.status === "Published" ? "Published" : "Draft";
        }

        editorEl.innerHTML = editingPost.content || "";

        const cover = editingPost.coverImage || "";

        if (cover && cover.indexOf("data:") !== 0 && imageUrlEl) {

            imageUrlEl.value = cover;

            const urlWrap = document.getElementById("np-url-wrap");

            if (urlWrap) urlWrap.classList.add("visible");

            imageUrlEl.dispatchEvent(new Event("input"));

        }

        titleEl.dispatchEvent(new Event("input"));
        categoryEl.dispatchEvent(new Event("change"));
        editorEl.dispatchEvent(new Event("input"));

        const heading = document.querySelector(".np-heading h1");

        if (heading) heading.textContent = "Edit your post";

        resetPublishButton();

    });


    createBlogForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const title = titleEl.value.trim();
        const category = categoryEl.value;
        const status =
            statusEl && statusEl.value === "Published" ? "Published" : "Draft";
        const content = editorEl.innerHTML.trim();

        // The page itself already shows an alert when these are missing
        if (!title || !category || !stripHtml(content).trim()) {
            resetPublishButton();
            return;
        }

        const email = localStorage.getItem("userEmail") || "";

        if (!email) {
            showToast("Please log in first.", "error");
            resetPublishButton();
            return;
        }

        if (publishBtn) publishBtn.disabled = true;

        // ---- cover image: uploaded file, image URL, or the old saved image ----
        let coverImage = null;

        const file =
            imageFileEl && imageFileEl.files ? imageFileEl.files[0] : null;

        const imageUrl = imageUrlEl ? imageUrlEl.value.trim() : "";

        if (file) {

            if (file.size > MAX_IMAGE_BYTES) {
                showToast(
                    "Image is too big (max 1 MB). Use a smaller image or an image URL.",
                    "error"
                );
                resetPublishButton();
                return;
            }

            try {
                coverImage = await readFileAsDataUrl(file);
            } catch (error) {
                showToast("Could not read the image.", "error");
                resetPublishButton();
                return;
            }

        } else if (imageUrl) {

            coverImage = imageUrl;

        } else if (
            editingPost &&
            editingPost.coverImage &&
            editingPost.coverImage.indexOf("data:") === 0
        ) {

            coverImage = editingPost.coverImage;

        }

        // ---- save ----
        if (!editingPost) {

            const result = await apiPost("/api/blogs", {
                title: title,
                category: category,
                status: status,
                content: content,
                image: coverImage || "",
                authorEmail: email
            });

            if (!result.ok) {
                showToast(
                    result.data.message ||
                    "Could not save the post. Please try again.",
                    "error"
                );
                resetPublishButton();
                return;
            }

            const saved = result.data.blog || {};
            const blogs = getBlogs();

            blogs.push({
                id: String(saved.id || getNextId(blogs)),
                title: title,
                category: category,
                content: content,
                coverImage: coverImage,
                date: new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                }),
                views: 0,
                status: status,
                authorEmail: email
            });

            try {
                saveBlogs(blogs);
            } catch (error) {
                showToast(
                    "This browser has no space left. Use a smaller image.",
                    "error"
                );
                resetPublishButton();
                return;
            }

            showToast(
                status === "Published"
                    ? "Post published successfully!"
                    : "Draft saved!",
                "success"
            );

        } else {

            const blogs = getBlogs().map(function (b) {

                if (String(b.id) === String(editingPost.id)) {

                    return Object.assign({}, b, {
                        title: title,
                        category: category,
                        status: status,
                        content: content,
                        coverImage: coverImage
                    });

                }

                return b;

            });

            try {
                saveBlogs(blogs);
            } catch (error) {
                showToast(
                    "This browser has no space left. Use a smaller image.",
                    "error"
                );
                resetPublishButton();
                return;
            }

            showToast("Post updated!", "success");

        }

        setTimeout(function () {
            navigateTo("dashboard.html");
        }, 1800);

    });

}



// =====================================================================
// 31. BLOG DETAIL
// =====================================================================

const detailContainer = document.getElementById("blog-detail-container");


if (detailContainer) {

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    const blogs = getBlogs();

    const blog = blogs.find(function (b) {
        return b.id === id;
    });


    if (blog) {

        const detailImg = document.getElementById("detail-img");
        const detailCategory = document.getElementById("detail-category");
        const detailTitle = document.getElementById("detail-title");
        const detailMeta = document.getElementById("detail-meta");
        const detailContent = document.getElementById("detail-content");

        if (detailImg) {
            detailImg.src = blog.coverImage || blogImage(blog.id);
        }

        if (detailCategory) {
            detailCategory.innerText = blog.category;
        }

        if (detailTitle) {
            detailTitle.innerText = blog.title;
        }

        if (detailMeta) {

            detailMeta.innerText =
                blog.date +
                " · " +
                blog.views +
                " views · " +
                readTime(blog.content) +
                " min read";

        }

        if (detailContent) {
            detailContent.innerHTML = blog.content;
        }

        document.title = blog.title + " — Quillo";

        blog.views = (blog.views || 0) + 1;

        saveBlogs(blogs);

    } else {

        detailContainer.innerHTML =
            '<p class="empty-state">' +
            "This post could not be found." +
            "</p>";

    }

}