## Project Structure

```
src
├── app/ ---- App Router and API Routes handler
├── assests/
├── features
│   ├── base ---- The Shadcn ui and base components
│   │   ├── components
│   │   │   ├── icons.tsx
│   │   │   ├── image-with-fallback.tsx
│   │   │   └── ui/
│   │   ├── hooks/
│   │   └── lib/
│   │   └── utils.ts
│   ├── feature-x
│   │   ├── api/ ---- The data-fetching-related: type of "payload" (which browser send to API) and "response", query types, query keys,...
│   │   ├── components/
│   │   └── hooks/
│   │   ├── utils.ts
│   │   └── constants.ts
├── middleware.ts
└── types/ ---- The folder to override 3rd package modules's type
```

## Setting Up Your Development Environment

Ensure your workspace is configured with ESlint, Prettier, and git-recommit hooks.
