# Todo App (Next.js MVP)

Implementation follows [`SPECS.md`](./SPECS.md).

## Stack
- Next.js 14 App Router + React 18 + TypeScript
- Tailwind CSS
- NextAuth v4 (stable, credentials demo login)
- Vitest + Testing Library
- GitHub Actions CI

## Runtime Requirement
- Node.js 20 LTS recommended (`nvm use 20`)

## Quick Start
1. Install dependencies:
   - `npm install`
2. Create env file:
   - `cp .env.example .env.local`
3. Run dev server:
   - `npm run dev`
4. Open `http://localhost:3000`

## Demo Login
- Email: `demo@example.com`
- Password: `pass1234`

## Scripts
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run typecheck`
- `npm run test`

## Implemented Milestones
1. Bootstrap project + tooling
2. Auth integration
3. UI screens/components
4. Search/filter/sort
5. Tests + CI
