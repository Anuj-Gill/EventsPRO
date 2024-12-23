# EventsPro

EventsPro is an innovative platform designed to simplify the management of events. Built with a modern tech stack, it enables users to easily publicize events, handle registrations, manage attendance, and more.

## Key Features

1. **Easy Publicity**: Share your event with just one link.
2. **Effortless Registrations**: Supports both solo and team-based event registrations.
3. **QR Code Attendance**: Generate a unique QR code for each attendee to simplify attendance management.
4. **Automated Email Delivery**: Send event tickets directly to attendees' inboxes.
5. **User Authentication**: Secure sign-in via Google OAuth.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript, Prisma (ORM)
- **Database**: PostgreSQL
- **State Management**: Recoil (Frontend)
- **Authentication**: Google OAuth
- **Others**: Docker, Vite

## Installation & Setup

### Prerequisites

1. Node.js and npm installed on your machine.
2. Docker (optional for running PostgreSQL via container).

### Steps to Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Anuj-Gill/EventsPRO.git
   cd EventsPRO
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd client
   npm install

   cd ../server
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the backend folder with the following keys:
     ```env
     DATABASE_URL=your_postgresql_database_url
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     FRONTEND_URL=http://localhost:3000
     ```
   - Create a `.env` file in the frontend folder with:
     ```env
     VITE_API_URL=http://localhost:5000
     ```

4. Start the PostgreSQL database (if using Docker):
   ```bash
   docker-compose up
   ```

5. Run the backend server:
   ```bash
   cd server
   npm run dev
   ```

6. Run the frontend application:
   ```bash
   cd client
   npm run dev
   ```

7. Access the app in your browser at `http://localhost:3000`.

## Folder Structure

```
.
├── eventsProClient    # Frontend code
│   ├── src
│   ├── public
│   └── ...
├── eventsProBackend   # Backend code
│   ├── src
│   ├── prisma
│   └── ...
└── README.md
```

## Key Moments in Development

1. **The Idea**: Originated as a semester project to use a one-time QR code for student verification at events.
2. **Initial Version**: Built with minimal UI and several bugs, leading to a complete rebuild.
3. **Rebuild**: Started in October 2024, finalized, and launched successfully in November 2024 with an improved tech stack and features.

## Future Enhancements

1. Admin dashboards for better event management.
2. Analytics to track registrations and attendance.
3. Integration with payment gateways for paid events.
4. Multilingual support for wider accessibility.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes and push:
   ```bash
   git commit -m "Add your message here"
   git push origin feature/your-feature-name
   ```
4. Create a pull request.

## Contact

For any inquiries or feedback, feel free to reach out:

- **Email**: [gillanuj1208@gmail.com](gillanuj1208@gmail.com)
- **GitHub**: [Anuj-Gill](https://github.com/Anuj-GIll)

---

Happy Event Management with EventsPro!

