
# FlowSync – Smart Team Productivity Board

FlowSync is a **production-style Nuxt 3/4 SaaS application** that helps teams manage work in a **real-time, analytics-driven productivity board**.  
It combines a drag-and-drop Kanban board, focus timers, activity timeline, and analytics dashboard into a cohesive, scalable architecture.

FlowSync is intentionally designed to look and feel like a real SaaS product, not a demo.

---

## Overview

FlowSync gives teams:

- **Kanban-style flow**: Backlog → In Progress → Review → Done
- **Per-task focus timers**: Pomodoro-style 25-min focused work sessions
- **Real-time updates**: Simulated WebSocket events with global toasts
- **Activity feed**: Timeline for task creation, moves, completions, and focus sessions
- **Analytics dashboard**: Productivity trends, focus time distribution, and column load
- **Productivity heatmap**: GitHub-style grid showing daily completions
- **Performance scoring**: Composite score based on completions, focus time, and consistency
- **AI-powered priority suggestions (mock)**: Server-side API estimating priority + reasoning
- **Authentication guard**: Simple mock auth + route middleware
- **Dark/Light theme**: App-wide theme toggle with persistence

---

## Tech Stack

- **Framework**: Nuxt 3/4 (Vue 3, Vite, Nitro)
- **Language**: TypeScript (strict, with type-checking)
- **State Management**: Pinia (modular stores)
- **Styling**: TailwindCSS (utility-first, theme-aware)
- **Composition Utils**: VueUse (`@vueuse/core`, `@vueuse/nuxt`)
- **Drag & Drop**: Vue Draggable (Vue 3 compatible)
- **Charts**: Chart.js + Vue wrapper
- **Runtime APIs**: Nuxt server API routes (`server/api/*`)
- **Real-time Simulation**: Custom event bus + composables (`useRealtime`)

---

## High-Level Architecture

The app is structured to scale with teams, features, and modules:

- **Pages**: High-level routes (`/board`, `/analytics`, `/activity`, `/login`)
- **Components**: Small, focused UI units under categorical folders
- **Composables**: Reusable logic hooks, each owning a single domain concern
- **Stores**: Pinia modules for board, tasks, users, activities, analytics
- **Server API**: Mock backend for tasks, activity, and AI priority suggestions
- **Plugins**: Client-only real-time bridge
- **Middleware**: Authentication gate for protected routes

### Required Folder Structure

The project follows this structure:

```txt
/components
  /board
    BoardColumn.vue
    TaskCard.vue
    CreateTaskModal.vue
  /analytics
    ProductivityChart.vue
    HeatmapGrid.vue
    ScoreCard.vue
  /activity
    ActivityItem.vue
  /shared
    AppButton.vue
    AppCard.vue
    AppModal.vue
    AppToast.vue

/composables
  useBoard.ts
  useTask.ts
  useRealtime.ts
  useFocusTimer.ts
  useAnalytics.ts
  useTheme.ts

/stores
  board.store.ts
  task.store.ts
  user.store.ts
  activity.store.ts
  analytics.store.ts

/middleware
  auth.ts

/plugins
  realtime.client.ts

/server/api
  tasks.get.ts
  tasks.post.ts
  tasks.update.ts
  activity.get.ts
  ai-priority.post.ts

/pages
  index.vue
  board.vue
  analytics.vue
  activity.vue
  login.vue
```

Each part of the app has **one clear responsibility** and is isolated from others through composables and stores.

---

## Data Models

### Task

```ts
export interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  column: 'backlog' | 'in-progress' | 'review' | 'done'
  createdAt: string
  deadline: string
  focusTime: number
  completed: boolean
}
```

### Activity

```ts
export interface Activity {
  id: string
  type: 'create' | 'move' | 'complete' | 'focus'
  message: string
  timestamp: string
  userId: string
}
```

These models are shared between **Pinia stores**, **composables**, and **server API handlers** to keep types consistent across the stack.

---

## Why Composables?

Composables encapsulate **feature logic** outside of components:

- **`useBoard`**: Board-level operations (column ordering, drag & drop handling, optimistic updates)
- **`useTask`**: Create, update, and persist tasks via API + store
- **`useRealtime`**: Event bus abstraction for global “WebSocket-like” events
- **`useFocusTimer`**: Timer lifecycle, countdown, and focus-time persistence per task
- **`useAnalytics`**: Derived metrics for charts, heatmap, and scoring
- **`useTheme`**: Dark/light mode management with storage and media preference support

Benefits:

- Components stay **small and declarative**
- Logic can be **unit-tested in isolation**
- Features can evolve without rewriting UI

---

## Why Modular Pinia Stores?

Each domain owns its own store:

- **`board.store`**: Column definitions, ordering, and board-level derived state
- **`task.store`**: All task entities, CRUD operations, and local cache
- **`user.store`**: Auth state (mock), roles, and session meta
- **`activity.store`**: Activity timeline, logging helpers, filtering
- **`analytics.store`**: Aggregated metrics, scores, and trend series

Advantages:

- **Separation of concerns**: Clear boundaries per domain
- **Scalability**: Easy to split, lazy-load, or hydrate per route
- **Performance**: Stores can be subscribed to selectively from components

---

## Real-Time Simulation

FlowSync simulates a WebSocket-style real-time layer using:

- A **client-side event bus** exposed from `useRealtime`
- A **Nuxt plugin** that wires global listeners and toasts
- **Broadcast events** whenever:
  - Tasks are created
  - Tasks move between columns
  - Tasks are completed
  - Focus sessions start

Example:

- “John moved `Landing Page UI` to Done”
- “Focus started on `Onboarding Checklist`”

This keeps UI decoupled from the transport layer and makes replacing the simulation with a real WebSocket backend straightforward.

---

## Scaling Strategy

FlowSync is designed to evolve into a real multi-tenant SaaS:

- **Front-end separation by concern**: Stores, composables, and components are cleanly isolated
- **API-first mindset**: All task operations go through Nuxt server routes
- **Analytics as a first-class module**: Metrics are derived centrally instead of ad-hoc
- **UI primitives**: Shared components (`AppButton`, `AppCard`, `AppModal`, `AppToast`) enable consistent design and easy theming
- **Performance practices**:
  - Dynamic imports for heavy charts and analytics pages
  - Minimal reactive surface; computed properties for derived data
  - Memoization where feasible for derived analytics

Future scaling options:

- Replace mock APIs with a real backend (REST or GraphQL)
- Hook real WebSockets or SSE instead of the simulated bus
- Add multi-tenant orgs, billing, and role-based access control

---

## Future Improvements

Some advanced ideas that can be layered on top:

- **Offline mode** with localStorage / IndexedDB sync and conflict resolution
- **Undo/redo** for board moves and edits
- **Keyboard shortcuts** for power users (e.g. quick focus start, move column)
- **Command palette (Ctrl + K)** for jumping between tasks and views
- **Role-based permissions** (Admin / Member) with restricted analytics or edits
- **Advanced filters and search** across tasks, users, and activity
- **Team-level dashboards** aggregating multiple boards

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

---

## Screenshots

Add screenshots or GIFs of:

- Board view with drag & drop
- Focus timer active on a task
- Activity timeline
- Analytics dashboard with charts and heatmap

```txt
./public/screenshots/board.png
./public/screenshots/analytics.png
./public/screenshots/activity.png
```

---

## License

This project is provided as a portfolio / learning project.  
Adapt and extend it as needed for your own use.
