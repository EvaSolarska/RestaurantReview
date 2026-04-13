# RestaurantReview App

## Project Description
RestaurantReview App is a web application for rating restaurants. It provides user registration and authentication functionality.

- Unauthenticated users can browse the list of available restaurants and read reviews submitted by other users.
- Authenticated users can add their own reviews and edit or delete their existing ones.
- Administrators have full management access to the restaurant database, including adding new restaurants, editing existing ones, and deleting them. Administrators also have access to all user functionalities.

---

## Technologies

### Backend
- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT (JSON Web Token)
- MySQL

### Frontend
- React
- Axios
- React Router DOM 

---

## How to run the project

### 1. Clone repository
```bash
git clone https://github.com/EvaSolarska/RestaurantReview.git
```

### 2. Environment variables
Example environment file is provided: `.env.example`

Create your own `.env` file based on it.

### 3. Run with Docker
```bash
docker compose up --build
```

### 4. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
