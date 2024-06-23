BACK_END GOOGLE AUTH AND BASIC 

Technologies Used
•	Node.js
•	Express.js
•	MongoDB (with Mongoose ODM)
•	Passport.js (for authentication)
•	bcrypt (for password hashing)
•	Nodemailer (for sending emails)
•	Google OAuth2 (for authentication)
•	dotenv (for managing environment variables)
•	Other relevant technologies...

________________________________________
Installation

Clone the repository
git clone https://github.com/amalfranci/amalfranci-Google_Auth_mobile_app_backend.git

cd <project-folder>

Install dependencies

npm install

Set up environment variables

Create a .env file in the root directory with the following variables:



PORT=5000
SESSION_SECRET=<your-session-secret>
MONGO_URI=<your-mongodb-uri>
CLIENT_ID=<your-google-client-id>
CLIENT_SECRET=<your-google-client-secret>
Auth_Email=<your-gmail-email>
Auth_Pass=<your-gmail-password>
Replace <placeholders> with your actual credentials.

________________________________________
Usage

Start the server

npm start

Access the application at http://localhost:5000/ (or the port you specified).
________________________________________
API Endpoints

POST /user/userlogin

Description: Endpoint for user login.
Parameters:
•	email: User's email address.
•	password: User's password.

POST /user/verifemail

Description: Endpoint for verifying user's email with OTP.
Parameters:
•	userId: User's ID.
•	otp: One-time password for verification.

GET /user/google

Description: Initiates Google OAuth2 authentication.

GET /user/google/callback
Description: Callback endpoint for Google OAuth2 authentication.

GET /user/success
Description: Redirects to this endpoint upon successful Google login.

GET /user/failure
Description: Redirects to this endpoint upon failed Google login.

________________________________________
Authentication
The application uses Passport.js for authentication, supporting both local authentication (email/password) and Google OAuth2.
________________________________________

Testing
To test the API endpoints:
1.	Use tools like Postman to send requests to the defined endpoints.
2.	Ensure environment variables (PORT, SESSION_SECRET, etc.) are correctly set in your .env file.
________________________________________

Contributing
1.	Fork the repository.
2.	Create your feature branch (git checkout -b feature/new-feature).
3.	Commit your changes (git commit -am 'Add new feature').
4.	Push to the branch (git push origin feature/new-feature).
5.	Create a new Pull Request.
