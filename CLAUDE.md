# Todo App Project Guidelines

## Project Overview

A modern, responsive Todo application built with Next.js App Router and deployed on Cloudflare. The app features real-time animations, comprehensive testing, and efficient data persistence using SQLite.

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS v3
- **Database**: SQLite with better-sqlite3
- **Testing**:
  - Unit/Integration: Vitest
  - E2E: Playwright
- **Animation**: Framer Motion
- **Deployment**: Cloudflare Pages/Workers
- **Language**: TypeScript
- **Package Manager**: bun
- **Code Formatter**: Biome
- **Git Hooks**: Lefthook

## Architecture Design

### Feature-Sliced Design (FSD)

The project structure is designed based on Feature-Sliced Design principles.
Reference: https://feature-sliced.github.io/documentation/docs

### Layer Structure

- **app**: Next.js App Router
- **pages**: Page components
- **widgets**: Composite components for page composition
- **features**: Independent modules by feature
- **entities**: Business entities
- **shared**: Common libraries, utils, UI components

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── api/               # API routes
│   │   └── todos/         # Todo CRUD endpoints
│   └── globals.css        # Global styles & Tailwind
├── pages/                 # Page components
│   └── todos/             # Todo related pages
├── widgets/               # Composite components for page composition
│   ├── todo-dashboard/    # Todo dashboard
│   └── todo-sidebar/      # Todo sidebar
├── features/              # Feature units (independent features)
│   ├── create-todo/       # Create todo feature
│   ├── edit-todo/         # Edit todo feature
│   ├── delete-todo/       # Delete todo feature
│   └── filter-todos/      # Filter todos feature
├── entities/              # Business entities
│   ├── todo/              # Todo entity
│   │   ├── model/         # Type definitions, interfaces
│   │   ├── api/           # API communication logic
│   │   └── lib/           # Todo utilities
│   └── user/              # User entity
└── shared/                # Common libraries
    ├── ui/                # Common UI components
    ├── lib/               # Utility functions
    ├── hooks/             # Common custom hooks
    ├── types/             # Common type definitions
    └── constants/         # Constant definitions
```

### Dependency Rules

- Upper layers can depend on lower layers
- Avoid cross-dependencies within the same layer
- shared is accessible from all layers
- Direct dependencies between features are prohibited

## Development Guidelines

### Language Policy

- **You must think exclusively in English**. However, you are required to **respond in Japanese**.

### Code Style

- Use 2-space indentation
- Prefer single quotes for strings
- Always use semicolons
- Sort imports: React → Next.js → Third-party → Local (handled by Biome)

### Component Patterns

- Use function components with TypeScript
- Export components as named exports (not default)
- Use `'use client'` directive only when necessary

### TypeScript

- Always define explicit types for props
- Use type for object types
- Avoid using `any` - prefer `unknown` if type is truly unknown
- Export shared types from `src/shared/types/`
- Use clear and descriptive names for TypeScript type definitions
- Break down complex types into smaller, manageable parts

### State Management

- Use React hooks for local state
- For global state, use React Context API
- Implement optimistic updates for todo operations

### Styling with Tailwind

- Use Tailwind classes directly in JSX
- Create custom utilities in globals.css when needed
- Use CSS variables for theming
- Implement responsive design with Tailwind breakpoints

## Code Reusability

### Eliminating Duplication

- Identify duplicate logic and extract into common functions/hooks
- Consolidate similar components or extract common parts
- Centralize common type definitions in `src/shared/types/`
- Manage constant values centrally in `src/shared/constants/`

### Practical Examples of Reuse

- State management logic used across multiple components goes to `src/shared/hooks/`
- Common API communication logic goes to `src/shared/lib/api/`
- Form validation rules go to `src/shared/lib/validation/`
- Centralize error handling patterns

## Code Readability

### Naming Conventions

- Use clear and descriptive names for variables and functions (e.g., `getUserTodos` not `getTodos`)
- Use `is`, `has`, `should` prefixes for boolean variables
- Use `handle` prefix for event handlers

### Code Structure

- Prioritize understandable code over excessive abstraction
- Break down complex processes into smaller functions
- Use early returns to reduce nesting
- Make conditional logic explicit

### Comment Guidelines

- Explain why something is done (e.g., `// Using this approach due to Cloudflare Workers limitations`)
- Always add comments for complex business logic
- Include assignee and deadline in TODO comments
- Use JSDoc to document function descriptions

## Testing Strategy

### Unit Tests (Vitest)

- Test all utility functions in `lib/`
- Test custom hooks with `@testing-library/react-hooks`
- Mock database calls in component tests
- Aim for 80% code coverage

### E2E Tests (Playwright)

- Test critical user flows:
  - Create new todo
  - Mark todo as complete
  - Delete todo
  - Filter todos
- Test on Chrome, Firefox, and Safari
- Run tests before deployment

## Database Schema

### SQLite Tables

```sql
-- todos table
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index for performance
CREATE INDEX idx_todos_completed ON todos(completed);
```

### Database Operations

- Use prepared statements for all queries
- Implement connection pooling
- Handle SQLite specific constraints for Cloudflare

## Deployment (Cloudflare)

### Configuration

- Use `wrangler.toml` for Cloudflare Workers config
- Configure D1 database for SQLite in production
- Set up environment variables in Cloudflare dashboard

### Build Settings

- Build command: `bun run build`
- Output directory: `.next/`
- Node.js version: 18.x or higher

### Edge Runtime Considerations

- Ensure all API routes are compatible with Edge Runtime
- Use Cloudflare D1 for database operations
- Implement proper error boundaries

## Common Commands

```bash
# Development
bun dev                 # Start development server
bun run build           # Build for production
bun start               # Start production server

# Testing
bun test                # Run Vitest tests
bun test:watch          # Run tests in watch mode
bun test:coverage       # Generate coverage report
bun e2e                 # Run Playwright tests
bun e2e:ui              # Run Playwright with UI

# Database
bun db:migrate          # Run database migrations
bun db:seed             # Seed database with sample data

# Deployment
bun deploy              # Deploy to Cloudflare
bun preview             # Preview deployment locally

# Code Quality
bun lint                # Run ESLint
bun lint:fix            # Fix ESLint issues
bun type-check          # Run TypeScript compiler
bun format              # Format with Biome
bun format:check        # Check formatting with Biome
```

## API Routes

### RESTful Endpoints

```
GET    /api/todos       # Get all todos
GET    /api/todos/:id   # Get single todo
POST   /api/todos       # Create new todo
PUT    /api/todos/:id   # Update todo
DELETE /api/todos/:id   # Delete todo
```

### Request/Response Format

- Always return JSON responses
- Use proper HTTP status codes
- Include error messages in response body
- Implement request validation with Zod

## Component Architecture

### Reusable UI Components

- `Button`: Variants (primary, secondary, danger)
- `Input`: With label and error states
- `Checkbox`: Custom styled with Tailwind
- `Card`: Container component with shadow
- `Modal`: With Framer Motion animations

### Todo Components

- `TodoList`: Main container with filtering
- `TodoItem`: Individual todo with actions
- `TodoForm`: Create/edit todo form
- `TodoFilters`: Filter by status
- `TodoStats`: Display completion statistics

### Animation Patterns

- Use Framer Motion for all animations
- Implement stagger animations for lists
- Add micro-interactions for user actions
- Keep animations under 300ms for responsiveness

## Performance Optimization

- Implement React.memo for expensive components
- Use dynamic imports for code splitting
- Optimize images with Next.js Image component
- Implement virtual scrolling for large todo lists
- Cache API responses with proper headers

## Security Considerations

- Sanitize all user inputs
- Implement CSRF protection
- Use Content Security Policy headers
- Validate all API requests
- Never expose database credentials

## Accessibility

- Ensure all interactive elements are keyboard accessible
- Add proper ARIA labels
- Maintain 4.5:1 color contrast ratio
- Test with screen readers
- Implement focus management for modals

## Code Quality Tools

### Biome Configuration
Biome is used for both linting and formatting. Configure in `biome.json`:
- Enable formatting with 2-space indentation
- Sort imports automatically
- Enforce single quotes
- Add trailing commas
- Configure linting rules for React and TypeScript

### Lefthook Pre-commit Hooks
Lefthook runs automated checks before each commit:
- **Format check**: `bun format:check`
- **Lint check**: `bun lint`
- **Type check**: `bun type-check`
- **Test**: `bun test` (only for changed files)
- **Build check**: `bun run build` (optional, for critical changes)

Configure in `lefthook.yml`:
```yaml
pre-commit:
  parallel: true
  commands:
    format:
      run: bun format:check
    lint:
      run: bun lint
    types:
      run: bun type-check
    tests:
      run: bun test --run --changed
```

### Git Workflow
1. Make changes to code
2. Stage changes: `git add .`
3. Commit: `git commit -m "message"`
4. Lefthook automatically runs all checks
5. If any check fails, the commit is blocked
6. Fix issues and try again
7. All checks must pass before commit succeeds
