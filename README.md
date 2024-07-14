# MERN Chat App Backend

This is the backend for a MERN (MongoDB, Express, React, Node.js) chat application. It handles real-time messaging, online status updates, and user authentication using Socket.IO, Mongoose, and bcryptjs.

## Deployed API

[https://mern-chat-backend-3af8.onrender.com](https://mern-chat-backend-3af8.onrender.com)

## Features

- Real-time messaging with Socket.IO
- Online status updates
- User authentication with password hashing using bcryptjs
- MongoDB for database storage with Mongoose ORM

## Technologies Used

- **Express.js**: Web framework for Server
- **Socket.IO**: Real-time web socket library
- **Mongoose**: MongoDB object modeling tool
- **bcryptjs**: Library for password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/iftekharalammithu/Mern-Chat-Backend.git
   cd mern-chat-app-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

   ```plaintext
   PORT=5000
   ADMIN=your_mongodb_connection_admin
   PASSWORD=your_mongodb_connection_password
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key

   ```

4. Run the server:

   ```bash
   npm start
   ```

   The server should now be running on `http://localhost:5000`.

## API Endpoints

- `/api/auth/signup`,`/api/auth/login`,`/api/auth/logout`:
  - `POST`: Authenticate a user
- `/api/messages/message/:receiverid` , `/api/messages/:receiverid`:
  - `POST`: Send Message
  - `GET`: Get Message
- `/api/user/`:
  - `GET`: Get all user

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.

## Acknowledgements

- [Socket.IO](https://socket.io/)
- [Mongoose](https://mongoosejs.com/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)

## Contact

For any inquiries, please contact [IftekharAlamMithu45@gmail.com](mailto:iftekharalammithu45@gmail.com).

Follow on social media:

[<img src="https://user-images.githubusercontent.com/74038190/235294011-b8074c31-9097-4a65-a594-4151b58743a8.gif" width="50">
](https://x.com/M1thuChowdhury)
[<img src="https://user-images.githubusercontent.com/74038190/235294012-0a55e343-37ad-4b0f-924f-c8431d9d2483.gif" width="50">
](https://www.linkedin.com/in/iftekharalammithu/)
[<img src="https://user-images.githubusercontent.com/74038190/235294013-a33e5c43-a01c-43f6-b44d-a406d8b4ab75.gif" width="50">
](https://www.instagram.com/iftekharalammithu/)

<div style="text-align: center;">
  <a href="https://www.buymeacoffee.com/iftekharalammithu">
    <img src="https://media.giphy.com/media/o7RZbs4KAA6tvM4H6j/giphy.gif" style=" display: block; margin: auto;" width="150">
  </a>
</div>
