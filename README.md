# Next.js + Sanity Studio Template

This repository is a public GitHub template for quickly starting projects that use **Next.js** (with the `/app` directory) and **Sanity Studio** together in a single codebase. It provides a clean, modern setup for building robust web applications with a powerful headless CMS.

---

## 📁 Structure Overview

```
/
├── app/              # Next.js App Directory
│   ├── studio/       # Route to serve Sanity Studio in Next.js at /studio
│   └── page.tsx      # Example Next.js home page
├── sanity/           # Sanity Studio source code
├── .env.example      # Sample environment variables for Sanity
├── README.md
├── package.json
├── next.config.js
└── ...               # Other Next.js config files
```

- **app/**: Contains the Next.js application, using the new `/app` directory routing system.
- **app/studio/**: Mounts the Sanity Studio inside your Next.js app at `/studio`.
- **sanity/**: The Sanity Studio project files (schemas, configuration, etc.).
- **.env.example**: Template for required environment variables.
- **README.md**: This documentation.

---

## 🚀 Getting Started

### 1. **Use as a GitHub Template**

- Click "Use this template" on GitHub to create a new repository from this template.

### 2. **Install Dependencies**

```bash
npm install
cd sanity && npm install
```

### 3. **Set Up Environment Variables**

- Copy `.env.example` to `.env` in your project root.
- Fill in your Sanity credentials:
    - Get your **project ID** and **dataset** from [Sanity.io manage projects](https://manage.sanity.io/).
    - Generate API tokens in your Sanity project.

```env
# .env
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="your_dataset"
NEXT_PUBLIC_SANITY_API_VERSION="2023-01-01"
SANITY_API_WRITE_TOKEN="your_write_token"
SANITY_API_READ_TOKEN="your_read_token"
```

### 4. **Run the Development Servers**

- **To run both Next.js and Sanity Studio together:**

```bash
npm run dev
```

- **(Optional) To run Sanity Studio standalone (for schema work):**

```bash
cd sanity
npm start
```

### 5. **Access Your App**

- **Next.js site:** [http://localhost:3000](http://localhost:3000)
- **Sanity Studio:** [http://localhost:3000/studio](http://localhost:3000/studio)

---

## 🛠️ Customization

- **Sanity Studio**: Edit schemas and config in `/sanity`.
- **Sanity Studio Route**: Served from `/studio` in your Next.js app via `/app/studio/page.tsx`.
- **Next.js App**: Build your frontend using the `/app` directory structure.

**Note:**  
Sanity Studio is embedded in your Next.js app using `next-sanity/studio` for seamless integration and easy deployment on Vercel/Netlify.

---

## 🧩 Environment Variables

See `.env.example` for all required variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=""
NEXT_PUBLIC_SANITY_DATASET=""
NEXT_PUBLIC_SANITY_API_VERSION=""
SANITY_API_WRITE_TOKEN=""
SANITY_API_READ_TOKEN=""
```

- **NEXT_PUBLIC_SANITY_*:** Used on the frontend for querying and displaying content.
- **SANITY_API_WRITE_TOKEN:** Used for server-side mutations (keep private!).
- **SANITY_API_READ_TOKEN:** Used for server-side secure reads (optional).

---

## 📝 How to Replace the Sanity Project

When you use this template, you should create your own Sanity project:

1. Go to [Sanity.io](https://www.sanity.io/) and create a new project.
2. Copy your new project’s ID and dataset name to your `.env`.
3. (Optional) Update `sanity/sanity.config.ts` if you need custom configuration.

---

## 📚 More Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [next-sanity (Official)](https://www.npmjs.com/package/next-sanity)
- [Sanity Studio Embedding Docs](https://www.sanity.io/docs/embedding-sanity-studio)

---

## 🤝 Contributing

Feel free to open issues or PRs to improve this template for everyone!

---

## ⚖️ License

MIT — free for personal and commercial use.
