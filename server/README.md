# Item Protecto Backend

Backend server for Item Protecto, a product warranty management system.

## Features

- User authentication with JWT
- Product management with image uploads
- Warranty tracking
- AI-powered chat support
- PostgreSQL database with Prisma ORM

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- OpenAI API key
- pnpm, npm, or yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
- Copy `.env.example` to `.env`
- Update the values in `.env`:
  - Set your PostgreSQL database URL
  - Generate a secure JWT secret
  - Add your OpenAI API key
  - Update CORS origin if needed

3. Set up the database:
```bash
# Create database
createdb item_protecto

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

4. Start the development server:
```bash
npm run dev
```

The server will start on http://localhost:5000

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Products
- POST `/api/products` - Create a product
- GET `/api/products` - Get user's products
- PUT `/api/products/:id` - Update a product
- DELETE `/api/products/:id` - Delete a product

### Warranties
- POST `/api/warranties` - Create a warranty
- GET `/api/warranties/:id` - Get warranty details
- PUT `/api/warranties/:id` - Update a warranty
- DELETE `/api/warranties/:id` - Delete a warranty

### Chat
- POST `/api/chat` - Send message to AI
- GET `/api/chat` - Get chat history

## File Structure

```
src/
├── config/         # Configuration files
├── middleware/     # Express middleware
├── routes/         # API routes
└── index.ts        # Server entry point
```

## Development

- Run tests: `npm test` (to be implemented)
- Run Prisma Studio: `npm run prisma:studio`
- Build for production: `npm run build`
- Start production server: `npm start`

## Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/item_protecto"

# JWT
JWT_SECRET="your-secret-key-here"
JWT_EXPIRES_IN="7d"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# CORS
CORS_ORIGIN="http://localhost:5173"
```

## Error Handling

The API uses consistent error responses:

```json
{
  "error": {
    "message": "Error message here",
    "status": 400
  }
}
```

## Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request