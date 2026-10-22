# Quillo — Blog Application

A responsive blog application built as part of **Module 1 (Frontend Development)** of the Codomax Digital Solutions internship.

Quillo lets writers publish their thoughts, manage their posts from a personal dashboard, and track how readers interact with their writing.

## Features

- **Home page** with a hero section, community blogs and read-only access before login
- **Register and Login** with animated success feedback
- **Personalised Home** after login with the user's own published posts
- **Dashboard** with an overview of posts, drafts and total views
- **Search by title** and a **Published / Draft status filter**
- **Analytics page** with total views, average views per post, a weekly views chart and a top-categories chart built from the user's real posts
- **Profile page** with an editable name and bio, and a change-password option
- **Create Post** page with a rich text editor (bold, italic, underline, lists, links, headings) and a **live preview**
- **Featured image** support through an image URL
- **Blog detail page** to read a full post
- Fully **responsive** layout for desktop and mobile

## Tech Stack

- HTML5
- CSS3 (custom design, no frameworks)
- JavaScript (vanilla)
- Browser `localStorage` for data (no backend yet)

## Project Structure

- `index.html` — entry page
- `home.html` — home page
- `login.html` and `register.html` — authentication pages
- `dashboard.html` — overview, search and filter
- `analytics.html` — reading statistics
- `profile.html` — account details
- `create-blog.html` — new post editor with live preview
- `blog-detail.html` — single post view
- `css/` — stylesheets (`style.css`, `dashboard-pages.css`)
- `js/` — shared script (`script.js`)

## How to Run

1. Download or clone this repository.
2. Open the folder in VS Code.
3. Install the **Live Server** extension.
4. Right-click `home.html` and choose **Open with Live Server**.

## Design

The theme uses a forest green, sand and gold colour palette with a serif heading style for a calm, writing-focused look.

## Notes

All data (users and posts) is stored in the browser's `localStorage`. A Node.js and Express backend and a database will be added in the next modules.

## Author

**Almas Afzaal** — BS-IT
Codomax Digital Solutions Internship, Module 1