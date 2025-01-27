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
8. [Live Demo](#live-demo)
9. [Contributing](#contributing)
10. [License](#license)
11. [Team](#team)

---

## Features

- **User Authentication**: Secure sign-up and login functionality for personalized experiences.
- **Stress Journaling**: Users can log their thoughts and emotions to track stress patterns.
- **Meditation Tools**: Includes a breathing timer and guided meditation sessions for relaxation.
- **Daily Affirmations**: Empowering quotes and the ability for users to add their own affirmations.
- **Resource Center**: Access to curated mental health resources.
- **Real-Time Peer Support**: Chat with other users for peer support and encouragement.
- **Mobile and Web Compatibility**: Fully responsive design for seamless use across devices.

---

## Tech Stack

### Backend

- Node.js with Express.js
- SQLite (Database)

### Frontend

- React.js
- Tailwind CSS

---

## Prerequisites

- [Node.js](https://nodejs.org) (v14 or higher recommended)
- npm or Yarn
- SQLite

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

3. Set up the SQLite database

4. Start the application in development mode:

```bash
npm run dev
```

---

## Usage

### Development Server

Start the development server with:

```bash
npm start
```

The app will be accessible at `http://localhost:3000`.

## Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_jwt_secret_key"
EMAIL_USER="your-email@example.com"
EMAIL_PASS="your-email-password"
RECEIVER_EMAIL="recipient-email@example.com"
PORT=5000
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

- Start Command: npm start
- Build Command: npm install

4. Set environment variables for the database.
5. Deploy the app.

---

## Live Demo

[Live Demo](https://drive.google.com/file/d/17T48dd4F8h2DeSRPEJVnruWIB_nZUh_F/view?usp=sharing)

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

For questions or support, please contact [@mindspring@outlook.com](mailto:mindspring@outlook.com).

## Team

Team Mmembers of these app include:

Buyeke Obare - `https://github.com/buyekeobare`
Emmanuel Danso - `https://github.com/EmmanuelDanso1`
Godman Oluwaseun - `https://github.com/GodmanOluwaseun`
