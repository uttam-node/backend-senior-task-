# 🚀 MiniForum API – Backend Developer Assessment

This is a production-ready RESTful API server built with **NestJS**, **TypeScript**, **Prisma**, and **PostgreSQL**, containerized using **Docker**.

The app includes full authentication, CRUD operations for posts and comments, weekly login rankings, test coverage with Jest, and Swagger documentation.

---

## 🧰 Tech Stack

- **Backend Framework:** NestJS (Express)
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** JWT (Bearer Token)
- **Validation:** class-validator, class-transformer
- **Documentation:** Swagger UI
- **Testing:** Jest + Supertest
- **Style Guide:** ESLint + Prettier (Google)
- **Deployment:** Docker + Docker Compose

---

## 📦 Features

### 🔐 Auth

- User registration (email, password, Korean username)
- Login with JWT (20-min expiry)
- Secure password hashing with bcrypt
- Update password / username
- Login tracking with IP + timestamp

### 📝 Posts

- Create post (title, content)
- Paginated post listing (20 per page)
- Post detail view with author + timestamps

### 💬 Comments

- Create comment on post (1–500 chars)
- Cursor-based pagination (limit 10)
- Delete by author or post owner

### 📊 Weekly Login Ranking

- Weekly login rank (Mon–Sun)
- Shared ranks handled
- Return top 20 users with count & rank

### 🛠️ Extras

- Swagger docs (`/docs`)
- Jest unit tests
- Prisma migration deploy on container start
- ESLint + Prettier (Google style)

---

## 🐳 Run with Docker

### 1️⃣ Prerequisites

- Docker
- Docker Compose

## 2️⃣ Build & Run

```bash
docker-compose up --build
```

- NestJS: http://localhost:3001
- Swagger: http://localhost:3001/docs
- PostgreSQL: on port 5432

## 🧪 Test Commands

```bash
# Run all unit tests
npm run test

# Watch mode
npm run test:watch

# Test with coverage
npm run test:cov
```

# 👨‍💻 Developer

- Uttam
- Senior Backend Developer Assessment – May 2025
- Stack: NestJS, Prisma, PostgreSQL, Docker
