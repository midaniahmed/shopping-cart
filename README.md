# Workshop Task

## Development Tools and Libraries

| Library/Tool          | Purpose                                                  |
| --------------------- | -------------------------------------------------------- |
| **React 18**          | Core library for building user interfaces.               |
| **TypeScript**        | Type-safe development with enhanced IDE support.         |
| **[vite](https://vite.dev/)**              | Lightning-fast development server and build tool         |
| **[Ant Design](https://ant.design/)** | Styled and customizable components for consistent UI/UX. |
|

#### 1. State Management (ContextAPI):

- **Context API** allows you to maintain a shared state **(CartContext)** that all components in the workflow can easily access. This eliminates the need to pass props down multiple levels **(prop drilling)**, which simplifies your component hierarchy.
- **Lightweight Solution:** For a three-step process with simple complexity it doesn’t require additional libraries like Redux.
- **Shared Data Across Steps:** Products added to Cart needs to be displayed in Cart Summary.
  Using the Context API ensures this data is easily accessible wherever it’s needed without passing it manually through intermediate components.

#### 3. Project structure:

```bash
root
├── public/
├── src/
│   ├── assets/              # Static files like images, fonts, etc.
│   ├── core/                # Core application modules
│   │   ├── context/         # Context API for global state management
│   │   ├── enum/            # Enum definitions for standardizing values
│   │   ├── hooks/           # Custom React hooks
│   │   ├── types/          # TypeScript interfaces
│   │   └── utils/           # Utility functions
│   │
│   ├── components/               # Atomic design
│   │   ├── shared/               # Shared reusable components (Atoms & molecules)
│   │   ├── cart/                 # Organism
│   │   ├── layout/               # molecule
│   │   └── ...
│   │
│   ├── modules/
│   │   ├── ProductDetails/       # Module for managing ad Product details
│   │   ├── ProductListing/
│   │   └── ShoppingCart/
│   │
│   ├── App.tsx              # Main application component
│   ├── index.css            # Global styles
│   └── main.tsx             # Application entry point
│
├── tsconfig.json            # TypeScript configuration
├── package.json             # Project configuration and dependencies
├── vite.config.ts           # Vite configuration
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML template for the app
├── README.md                # Project documentation
├── pnpm-lock                # Lockfile for pnpm dependencies
└── ...
```

##### 3.1 Core/:

Contains foundational resources shared across the entire app, ensuring a single source of truth for non-UI-specific elements.
**Purpose:** To encapsulate reusable logic, types, generic helper functions, and utilities that are app-agnostic.
**Contents:** Enums, Hooks, Hooks, Utils...

##### 3.2 Modules/:

- **Modules/Product listing:** displays and manages product catalogs
- **Modules/Product Details:** Detailed product view with comprehensive information and cart interaction
- **Modules/Shopping Cart:** Complete cart management from item storage to checkout preparation
- **Modules/Shared:** A centralized location for reusable ui components to maintain a consistent design system and shared functionalities across the app.
- ...

##### 3.3 Why this structure:

- **Separation of Concerns:** Core utilities and logic are distinct from UI components, making both easier to manage and test.
- **Scalability:** Adding new features or modules (e.g., "Analytics" or "Reports", ...) doesn’t interfere with existing code.
- **Maintainability:** The structure encourages modular design, so changes to one part of the app don’t ripple unnecessarily into others.
- **Consistency:** A dedicated shared module ensures uniform design and behavior across the app.

##### 3.4 Diagram of the Architecture

![Diagram of the Architecture](/diagram-1.png)

---

## Setup and Installation

### Prerequisites

- **Node.js** (version 18 or higher recommended)
- **pnpm** (or npm or yarn)

### Steps

1. Clone the repository:

   ```bash
   git clone <https://github.com/midaniahmed/workshop-task>
   cd workshop-task
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Build the project for production:

   ```bash
   pnpm build
   ```

5. Preview the production build:

   ```bash
   pnpm preview
   ```

---

## Scripts

- **`pnpm dev`**: Runs the development server.
- **`pnpm build`**: Compiles the application for production.
- **`pnpm preview`**: Previews the production build locally.
- **`pnpm lint`**: Lints the codebase using ESLint.

---

##### Author

midaniahmed
