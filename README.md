# DraftPoint ✦

> **Professional Portfolio Platform** designed for high-end developers.
> Built with React, Tailwind CSS v4, and Framer Motion.

![DraftPoint Preview](https://via.placeholder.com/1200x600?text=DraftPoint+Preview+Image)

## 📖 Overview

**DraftPoint** is a next-generation portfolio platform that moves away from generic designs. It utilizes a **Deep Atmospheric Dark Mode**, physics-based motion, and a unique "Tag-Based" requirement gathering system for clients.

## ✨ Key Features

- **💎 Deep Glassmorphism UI:** A premium "Slate/Midnight" aesthetic with extensive use of backdrop blurs and subtle gradients.
- **mj Floating Sidebar:** A unique, pill-shaped navigation bar that floats independently of the screen edges (transforms to a bottom bar on mobile).
- **📝 Interactive Requirement Collector:** Clients type requirements ("Login page", "Payment Gateway") and they instantly convert into visual **Tags/Chips**.
- **Message Sending:** Integrated with **EmailJS** to send professional project requests directly to your email without a backend.
- **✨ Physics-Based Motion:** Smooth, staggered animations and hover effects powered by **Framer Motion**.

## 🛠️ Tech Stack

- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Email Service:** EmailJS

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Chanii2024/DraftPoint.git
   cd DraftPoint
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory (use `.env.example` as a reference):
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📧 EmailJS Configuration

To make the "Project Request" form work:
1. Sign up at [EmailJS](https://www.emailjs.com/).
2. Create a generic Email Service (e.g., Gmail).
3. Create an Email Template with a `{{message}}` variable to receive the tag list.
4. Get your `Service ID`, `Template ID`, and `Public Key` and add them to your `.env` file.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).