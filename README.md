
# Slot Booking Application

## Introduction
This slot booking application is designed to demonstrate how to structure and implement the architecture of an agenda system. It uses modern web technologies and a scalable design to handle real-time slot bookings efficiently.

## Architecture
The application comprises:
- **Frontend**: A React application presenting time slots in rows and columns, allowing users to book and view availability.
- **Backend**: A Ruby on Rails application handling booking logic, overlap checks, real-time updates, and database interactions.
- **Database**: PostgreSQL, using the `tsRange` type for efficient and straightforward overlap calculations.
- **WebSocket**: Enables real-time updates for users viewing the same day's schedule.
- **Docker**: Used to containerize and orchestrate services with Docker Compose.

## Setup Instructions
This project uses **docker** and **docker-compose** to build all infrastructure. You will need both installed.
**The setup was only tested in Ubuntu**

First configure server's and client's IPs and ports in the **docker/.env** file. Default values are shown bellow.

```bash
CLIENT_IP=localhost
CLIENT_PORT=80
SERVER_IP=localhost
API_PORT=3010
```

Then build infrastructure and apps with the provided script 

```bash
./scripts/prod/install.sh
```

It will take some time for all the building to finish. After it's done you can access the app at the configured URL. 

eg. http://localhost 

You can remove docker images and containers running following script

```bash
./scripts/prod/uninstall.sh
```

## Usage Instructions
1. Select a date and time slot length (must be a multiple of 15 minutes).
2. Click on a time slot to send a booking request to the backend. The backend checks for overlaps and registers the slot if available.
3. If another user books a slot while you're viewing, you'll see real-time updates on the schedule screen.

## Concurrency Management
- Database locks and transactions are used to prevent overlapping bookings, even under parallel user execution.
- When checking for overlaps during a backup operation, the system creates a database lock only on the day affected by the schedule.

## Real-Time Updates
- WebSockets ensure that messages are broadcast only to users viewing the same day. This avoids unnecessary system-wide broadcasts and enhances scalability and efficiency.

## Database Design
- **Time Slot Representation**: The application uses the PostgreSQL `tsRange` type for defining time slots, leveraging PostgreSQL's range features for efficient overlap calculations directly in the database.

## Future Enhancements
- Adding automated tests to ensure reliability.
- Improving responsiveness for smaller screens.
- Implementing a dark mode for better user experience.

## Contact Information
For questions or support, please contact [Your Contact Information].

## License
GNU General Public License v3
