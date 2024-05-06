# Admin-Panel
Admin Panel Application

This project is an Admin Panel application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides functionality for user management, database management, and instance management.

Features
User Management: Allows administrators to create, update, delete, and manage user accounts.
Database Management: Provides functionality to create, delete, and manage databases within the application.
Instance Management: Enables users to add and list connected MongoDB instances.

Prerequisites
Before running the application, ensure you have the following installed on your system:

Node.js
MongoDB

Getting Started
Clone the Repository:
bash
Copy code
git clone <repository_url>
Install Dependencies:
bash
Copy code
cd Admin-Panel/server
npm install
cd ../client
npm install
Configure MongoDB:
Make sure MongoDB is running on your system.
Update the MongoDB connection URI in the server/config/config.js file if necessary.
Start the Server and Client:
bash
Copy code
# Start the server
cd ../server
nodemon index.js

# Start the client
cd ../client
npm start
Access the Application:
Open your web browser and navigate to http://localhost:3000 to access the Admin Panel application.
API Routes

User Routes:
/api/users/create: POST request to create a new user.
/api/users/login: POST request to login a user.
/api/users/change-password/:id: PUT request to change a user's password.
/api/users/remove/:id: DELETE request to remove a user.
/api/users/revoke-access/:userId/:dbName: PUT request to revoke user access to a specific database.
/api/users/assign-database/:userId/:dbName: PUT request to assign a new user to a specific database.

Database Routes:
/api/databases/create: POST request to create a new database.
/api/databases/remove/:id: DELETE request to remove an existing database.
/api/databases/add-entry: POST request to add an entry to a database.

Instance Routes:
/api/instances/add: POST request to add a MongoDB instance.
/api/instances/list: GET request to list connected MongoDB instances.

Technologies Used
Frontend:
React.js
Redux
Material-UI

Backend:
Node.js
Express.js
MongoDB
Mongoose
Contributors
Chirag Joshi
