# Smart Space Booking Backend

NestJS 11 REST API with Prisma ORM and MySQL.

## Setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL` to your MySQL database and `JWT_SECRET` to a strong secret.
2. Install dependencies: `npm install`
3. Validate and generate Prisma client: `npx prisma validate`, `npx prisma generate`
4. Create tables: `npx prisma db push`
5. Seed demo data: `npx prisma db seed`
6. Start development server: `npm run start:dev`

API routes use the `/api` prefix. Swagger is available at `/api/docs`.

Demo credentials: `admin` / `admin123`, `member` / `member123`.
