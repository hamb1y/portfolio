# Portfolio Site

A high-performance, easily configurable portfolio website built with Astro.js and centralized plain CSS. This template is designed for developers and creators who want a fast, maintainable, and customizable portfolio site.

🌐 **Live Demo**: [portfolio-hamb1y-1.vercel.app](https://portfolio-hamb1y-1.vercel.app)

## ✨ Features

- 🚀 Built with Astro.js for optimal performance
- 🎨 Centralized plain CSS for easy styling and maintenance
- ⚙️ Highly configurable through `src/config.ts`
- 📝 Project/Article system using MDX
- 🎯 SEO-friendly and accessible
- 📱 Responsive design
- 🔄 Version control-driven content management

## 🏗️ Project Structure

```text
/
├── public/          # Static assets
├── src/
│   ├── config.ts    # Central configuration file
│   ├── layouts/     # Page layouts
│   ├── pages/       # Main pages
│   │   └── projects/  # Project/Article pages
│   │       └── [project].mdx  # Dynamic project pages
│   └── styles/      # CSS styles
└── package.json
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## ⚙️ Configuration

Most site settings can be configured through `src/config.ts`. This includes:
- Site metadata
- Navigation links
- Social media profiles
- Theme settings
- And more...

## 📝 Adding Projects/Articles

The site uses version control (Git) as a content management system. To add new projects or articles:

1. Create a new MDX file in the `src/pages/projects/` directory
2. Follow the frontmatter structure below
3. Commit and push your changes

Example project structure:
```mdx
---
title: Your Project Title
description: Project description
date: 2024-03-21
---

Your project content here...
```

This version control-based approach allows for:
- Easy content versioning
- Collaborative editing
- Content review through pull requests
- Automated deployments on push

## 🛠️ Available Commands

| Command           | Action                                           |
| :---------------- | :----------------------------------------------- |
| `npm install`     | Install dependencies                             |
| `npm run dev`     | Start local dev server at `localhost:4321`       |
| `npm run build`   | Build your production site to `./dist/`          |
| `npm run preview` | Preview your build locally, before deploying     |

## 📚 Documentation

For more detailed information about:
- Configuration options
- Styling guidelines
- Project structure
- Deployment

Please refer to the documentation in the `docs/` directory.

## 📄 License

This project is open source and available under the MIT License.
