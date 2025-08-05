# 💼 Developer Portfolio (Frontend)

This is the **public-facing portfolio website** powered by modern technologies and connected to a CMS admin dashboard via Firebase. It showcases the developer’s work, experience, skills, and social presence — all dynamically editable.

---

## ✨ Features

- 🔥 **Fully responsive design** (desktop + mobile)
- 🎨 **Animated UI** with [Framer Motion](https://www.framer.com/motion/)
- ⚙️ **Real-time data** pulled from Firebase Firestore
- 🌐 **Live project previews**, image modals, and testimonials
- 🧩 **Modular section-based layout**
---

## 🚀 Tech Stack

- **React + Vite** – Lightweight, fast frontend
- **TypeScript** – Fully typed for safety and scalability
- **Tailwind CSS** – Rapidly styled with utility classes
- **Framer Motion** – Smooth animations and transitions
- **Firebase Firestore** – Dynamic content and structure
- **Cloudinary** – Asset management (images for projects/testimonials)
- **React Router DOM** – Navigation between routes
- **React Icons** – Scalable icon support for social links

---

## 🔧 Sections Included

- **Hero** – Introduction and CTA
- **About** – Developer background
- **Experience** – Editable work timeline
- **Skills** – Stack showcase
- **Projects** – Interactive grid with details
- **Testimonials** – Client/peer feedback
- **Social Links Sidebar** – Displays only what is set in admin
- **Footer** – Minimal and clean

---

## 🔗 Dynamic Content

All sections (projects, experience, testimonials, etc.) are **fetched from Firebase Firestore**, which is managed from the **admin dashboard**. Changes made in the admin are reflected live on the portfolio.

---

## 🛠 Setup

This frontend is tightly coupled with a Firebase backend. To connect:

1. Set up your Firebase project and Firestore (see [Project Setup Guide](../Project%20Setup%20Guide.txt))
2. Configure your Firebase credentials in `/lib/firebase.ts`
3. Run the project:

```bash
npm install
npm run dev
