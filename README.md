# Autorent2

A car rental web application built with Node.js, Express, and EJS templates.

## Features

- User authentication and registration
- Car listing and booking system
- Admin dashboard for managing cars and bookings
- Owner dashboard for managing owned cars
- Booking management for users

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd EJS_HandleBars
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database:
   - Configure your database settings in `config/db.js`
   - Run any necessary migrations or seed data

4. Start the application:
   ```
   npm start
   ```

The application will run on `http://localhost:3000` (or the port specified in your config).

## Usage

- Visit the homepage to browse available cars
- Register or login to book cars
- Owners can add and manage their cars
- Admins can access the admin dashboard for full management

## Admin Accounts

- **Email:** admin@example.com
- **Password:** 123456

Use these credentials to log in as an admin and access the admin dashboard.

## Project Structure

- `app.js`: Main application file
- `config/`: Database configuration
- `controllers/`: Route handlers
- `middlewares/`: Custom middleware
- `models/`: Database models
- `routes/`: Route definitions
- `views/`: EJS templates

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript Templates)
- MongoDB (or your configured database)
- Other dependencies as listed in `package.json`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
