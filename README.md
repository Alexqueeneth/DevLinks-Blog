Blog App
A simple blog application built with Node.js and Express.

Table of Contents
- #description
- #features
- #technologies-used
- #installation
- #usage
- #api-endpoints
- #contributing
- #license

Description
This is a basic blog application that allows users to create, read, update, and delete blog posts. The application is built using Node.js and Express, and uses a MongoDB database to store blog posts.

Features
- User authentication and authorization
- Create, read, update, and delete blog posts
- Commenting system for blog posts
- Search functionality for blog posts
- Responsive design for mobile and desktop devices

Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose (ODM for MongoDB)
- Passport.js (for authentication)
- bcrypt (for password hashing)
- EJS (templating engine)
Installation
1. Clone the repository: git clone 
2. Install dependencies: npm install
3. Create a .env file with the following variables:
    - MONGO_URI: MongoDB connection string
    - SESSION_SECRET: secret key for session management
4. Start the application: npm start

Usage
1. Open a web browser and navigate to http://localhost:3000
2. Create an account or log in to an existing account
3. Create, read, update, and delete blog posts
4. Comment on blog posts

API Endpoints
- GET /api/posts: Retrieve a list of all blog posts
- GET /api/posts/:id: Retrieve a single blog post by ID
- POST /api/posts: Create a new blog post
- PUT /api/posts/:id: Update a single blog post by ID
- DELETE /api/posts/:id: Delete a single blog post by ID

Contributing
Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

