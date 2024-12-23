# Mindspring App

Mindspring App is a mental health app designed to provide users with tools for mindfulness, journaling, and breathing exercises. It aims to promote mental well-being by offering a simple, intuitive interface and engaging features. This README provides a comprehensive guide for developers and users to understand, set up, and contribute to the application.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Environment Variables](#environment-variables)
7. [Deployment](#deployment)
8. [Contributing](#contributing)
9. [License](#license)
10. [Team](#team)

---

## Features

- **User Authentication**: Secure sign-up and login functionality.
- **Journaling Feature**: Users can log their thoughts and feelings.
- **Breathing Exercises**: Interactive animations for guided breathing.
- **Mobile and Web Compatibility**: Fully responsive design.
- **Data Persistence**: SQLite database for local development; scalable to PostgreSQL for production.

---

## Tech Stack

### Backend

- Node.js
- Prisma ORM
- SQLite (Development)

### Frontend

- React.js
- Tailwind CSS

---

## Prerequisites

- Node.js (v14 or higher)
- npm or Yarn
- Prisma CLI
- SQLite (bundled with Prisma)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/buyekeobare/mindspring_app.git
   cd mindspring
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Initialize the database:

   ```bash
   npx prisma migrate dev --name init
   ```

4. Generate the Prisma client:
   ```bash
   npx prisma generate
   ```

---

## Usage

### Development Server

Start the development server with:

```bash
npm start
```

The app will be accessible at `http://localhost:3000`.

### Database Management

- To access the SQLite database:
  ```bash
  npx prisma studio
  ```
- This opens a web-based interface for managing your data.

---

## Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_jwt_secret_key"
```

---

## Deployment

### Vercel

1. Commit and push your changes to a GitHub repository.
2. Link the repository to Vercel.
3. Set environment variables in the Vercel dashboard.
4. Deploy the app.

### Render

1. Create a Render account.
2. Add your repository and configure a web service.
3. Specify the build command:
   ```bash
   npm install && npx prisma generate && npm run build
   ```
4. Set environment variables for the database.
5. Deploy the app.

---

## Contributing

We welcome contributions! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your fork and create a pull request.

---

## License

Mindspring is licensed under the Apache License. See the [LICENSE](LICENSE) file for details.

---

For questions or support, please contact [support@mindspring.com](mailto:support@mindspring.com).

## Team

Team Mmembers of these app include:

Buyeke Obare - `https://github.com/buyekeobare`
Emmanuel Danso - `https://github.com/EmmanuelDanso1`
Godman Oluwaseun - `https://github.com/GodmanOluwaseun`
