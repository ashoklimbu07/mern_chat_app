# Chat App — Frontend

React frontend for the chat application, built with Vite and Tailwind CSS.

## Tech Stack

- React 19
- React Router v7
- Tailwind CSS v4
- Vite

## Getting Started

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

The app runs at `http://localhost:5173` and proxies `/api` requests to the backend at `http://localhost:3000`.

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Project Structure

```
src/
├── components/    # Reusable UI components
├── screens/       # Page-level components
└── App.jsx        # Routes
```
