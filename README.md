# 🏦 Plaid Integration
---

## 🛠️ Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Prisma** + **PostgreSQL**
- **Plaid SDK**
- **dotenv** for managing environment variables


### 1. Clone the repository

```bash
git clone https://github.com/HaseebUlHassan207/plaid-integration.git
cd plaid-integration
npm install
```

### 2. Set up Environment Variables

PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
PLAID_ENV=sandbox
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME


### 3. Run Prisma migrations

npx prisma generate
npx prisma migrate dev


### 4. Start the development server

npm run dev