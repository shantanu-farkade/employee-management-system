# Employee Management System

A Full-Stack Employee Management System built using Spring Boot, MySQL, HTML, CSS, and JavaScript.

## Features

* Employee Login System
* Add Employee
* Update Employee
* Delete Employee
* View All Employees
* Search Employee by Name
* Search Employee by Department
* Filter Employees by Salary Range
* Pagination and Sorting
* Dashboard Statistics
* Responsive User Interface

## Technologies Used

### Backend

* Java 21
* Spring Boot
* Spring Data JPA
* Maven

### Database

* MySQL

### Frontend

* HTML5
* CSS3
* JavaScript

## Project Structure

employee-management-system

├── src/main/java

│ ├── controller

│ ├── service

│ ├── repository

│ ├── entity

│ ├── exception

│ └── config

├── src/main/resources

│ ├── static

│ │ ├── index.html

│ │ ├── login.html

│ │ ├── style.css

│ │ ├── login.css

│ │ ├── script.js

│ │ └── login.js

│ └── application.properties

└── pom.xml

## Database Configuration

Create a MySQL database: CREATE DATABASE employee_db;
Update the database credentials in: src/main/resources/application.properties

## Run the Application
### Clone Repository

git clone <repository-url>

### Open Project

Import the project into VS Code or IntelliJ IDEA.

### Run Spring Boot Application

mvn spring-boot:run
Application will start at: http://localhost:8081

## Login Credentials

Username: admin
Password: admin123

## Future Enhancements

* JWT Authentication
* Role-Based Access Control
* Employee Profile Images
* Department Analytics Dashboard
* Cloud Deployment

## Author
Shantanu Farkade