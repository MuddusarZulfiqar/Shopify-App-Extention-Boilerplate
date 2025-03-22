# Shopify App Installation using REMIX NODE MYSQL PRISMA

## 1. Installation

To set up and run the Shopify app, follow these steps:

### Prerequisites  
- You must have **Shopify CLI** installed.  
- Ensure you have **Node.js** installed on your system.  

### Installation Steps  
1. Run the following command to install dependencies:  
   ```sh
   npm install
   ```
2. **Paste your database URL (MySQL/MongoDB) into the `.env` file.**  
   - Example of `.env` file entry:
     ```
     DATABASE_URL="mysql://user:password@localhost:3306/database_name"
     ```
3. To deploy the project on your **Shopify Partner account**, run:  
   ```sh
   npm run deploy
   ```
4. To start the project locally, use:  
   ```sh
   npm run dev
   ```

> **Note:** If you encounter issues, try running the command with the `--reset` flag:
> ```sh
> npm run dev -- --reset
> ```

---

## 2. Database Management

### Schema Management  
1. Create your schema file inside the `prisma/schema/` folder.  
   - The file name should follow the format:  
     ```
     [tableName].prisma
     ```
2. Define your schema in the Prisma format. Example for `PageOption` table:
   ```prisma
   model PageOption {
     id    Int    @id @default(autoincrement())
     title String
   }
   ```
3. To synchronize the schema with the database and create a migration, run:  
   ```sh
   npm run prisma migrate dev
   ```

### Seeding the Database  
1. Define the seed data inside `prisma/seeders/seed.js`:  
   ```ts
   import { PrismaClient } from "@prisma/client";

   const prisma = new PrismaClient();

   export async function pageOptionSeeder() {
     await prisma.pageOption.create({
       data: { title: 'Home Screen' }
     });
     await prisma.pageOption.create({
       data: { title: 'Product Page' }
     });
   }

   pageOptionSeeder()
     .then(async () => { await prisma.$disconnect(); })
     .catch(async (e) => {
       console.error(e);
       await prisma.$disconnect();
       process.exit(1);
     });
   ```
2. Run the following command to execute the seeder:  
   ```sh
   npx prisma db seed
   ```

### Defining Relationships  
For defining relationships between tables, refer to the [Prisma documentation](https://www.prisma.io/docs/concepts/components/prisma-schema/relations).  

---

## 3. Additional Notes
- Make sure you have configured Prisma correctly in your project.  
- If using MySQL, ensure the database is running before running migrations.  
- To inspect the database visually, you can use Prisma Studio:  
  ```sh
  npx prisma studio
  ```
- **Keep your `.env` file secure** as it contains sensitive database credentials.  

---

## 4. Authentication

Always authenticate the request in **loader** and **action** using:

```ts
const { admin, session } = await authenticate.admin(request);
```

This ensures that your Shopify shop is authenticated properly.

### Session Object
Once authenticated, the `session` object containts the session off your shop.

### Admin Object Structure
Once authenticated, the `admin` object contains:
- **graphql**: Executes Shopify GraphQL queries and mutations.

### Session Management
- Use `session` to get the current session.
- The `session.id` **coresponds to** your database `session.id`.
- For relating other tables (e.g., `Product`) with a session, use database `session.session_id`.
- session from authetication dose not have `session.session_id` because it is not that saved in database its comes from shop authetication

---

## 5. Organizing Loader & Action Code

To maintain a **clean frontend structure**, follow these practices:
- Store **all loader and action logic** in the `services` folder.
- Create corresponding service files for each feature (e.g., `services/auth.js`, `services/orders.js`).
- Keep frontend files free from authentication and business logic.

---

## 6. Authentication in Background Jobs

If you need authentication outside of pages (e.g., **cron jobs, background tasks**), use:

```ts
await unauthenticate.admin(shop);
```

Where `shop` is retrieved from `session.shop` in your database.

---

## 7. Shopify Webhook Management

### Registering a Webhook
To register a webhook, add the following to your Shopify app **TOML** file under the `[webhooks]` section:

```toml
[[webhooks.subscriptions]]
  topics = [ "topic" ]
  uri = "/webhooks/app/topic"
```

**Example:** Registering an `orders/update` webhook:

```toml
[[webhooks.subscriptions]]
  topics = [ "orders/update" ]
  uri = "/webhooks/app/orders/update"
```

---

### Handling Webhooks

Create a **JSX/TS file** in `app/routes/` named:

```
webhook.app.orders.update.jsx/ts
```

This file will handle incoming webhook data whenever Shopify triggers a webhook.

#### Example Webhook Handler (JS/TS)

```ts
import { authenticate } from "../shopify.server";
import { storeSegmentesToDatabase } from "../../services/segment/segmentService";

export const action = async ({ request }) => {
  const { payload, session, topic, shop, admin } = await authenticate.webhook(request);
  
  // `payload` contains the data Shopify sends when the webhook is triggered
  // `session` holds the authenticated session details
  // `topic` specifies which webhook event was triggered
  // `shop` contains the shop details related to the event
  // `admin` provides access to Shopify GraphQL API

  // Process the webhook payload
};
```

This ensures that Shopify webhooks are properly received and processed in your app.

---

With this setup, you should be able to get your Shopify app up and running smoothly! 🚀  

