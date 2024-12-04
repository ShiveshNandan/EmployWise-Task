# EmployWise-Task
## Reqres User Management App
This is a React-based user management application that interacts with the Reqres API to handle user authentication and management. The application is responsive, user-friendly, and includes features for authentication, user listing, and basic user management operations.

## Features

### Level 1: Authentication Screen
Users can log in using their credentials:\
Email: eve.holt@reqres.in \
Password: cityslicka\
The token received after login is stored in localStorage.\
Access to the Users List page is restricted unless a valid token is present.


### Level 2: List All Users
Displays a paginated list of users retrieved from the API GET `/api/users?page=1`.\
Each user’s first name, last name, and avatar are displayed.\
Provides a toggle option for viewing users in either Table View or Card View.


### Level 3: Edit, Delete, and Update Users
Edit Users:\
A pre-filled form allows updating user details like first name, last name, and email.\
API Endpoint:\
PUT `/api/users/{id}`.\
Delete Users:\
Users can be removed from the list.\
API Endpoint:\
DELETE `/api/users/{id}`.\
Note: API responses for DELETE and PUT requests are inconsistent. These operations may not work as expected.

## Additional Features
React Router is used for seamless navigation between pages `(Login, Users List, and Edit User)`.
Frontend is responsive, adapting well to both desktop and mobile screens.
### `Error handling`
User-friendly error messages are shown for API failures or validation errors.


## Installation Instructions
#### Prerequisites
Node.js and npm installed.\
A modern browser.\
Steps to Run the Project
#### Clone the repository:
```bash
git clone <repository-url>
cd <repository-folder>
```
#### Install dependencies:
```bash
npm install
```
#### Start the development server:
```bash
npm start
```
#### Open the application in your browser at:
```arduino
http://localhost:3000
```
## APIs Used
POST `/api/login`: Authenticates users with email and password.\
GET `/api/users?page=1`: Fetches a list of users (pagination is done properly).\
PUT `/api/users/{id}`: Updates a user’s details. (Inconsistent response)\
DELETE `/api/users/{id}`: Deletes a user. (Inconsistent response)

## Assumptions & Notes
The APIs for editing and deleting users are not working as expected; results may vary.\
The authentication API only validates the email; password is not verified.\
The token is stored in localStorage, and access to the Users List page is restricted without a valid token.\
Users can toggle between Table View and Card View on the Users List page.\
The frontend is designed to be responsive.

## Tech Stack
Frontend Framework: React\
Routing: React Router\
HTTP Requests: Axios\
Styling: Tailwind CSS, React-Toastify (for success and failure message)\
Project Hosting: Hosted on vercel, https://task-xi-woad.vercel.app/

Author\
Shivesh Nandan

If you have any feedback or suggestions, feel free to reach out!
