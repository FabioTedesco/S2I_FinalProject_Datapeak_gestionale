# Gestionale Datapeak

The application is a point-of-sale management system that allows users to manage the store and the cash register in a simple and fast way.

![Datapeak Logo](FE/src/assets/datapeak.png)
![Project Logo](FE/src/assets/log_bullpadel.png)

Visit: [Project Website](https://gestionaledatapeak.up.railway.app)

---

## Table of Contents

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [How to Install Locally with Docker](#how-to-install-locally-with-docker)
5. [API Endpoints](#api-endpoints)
6. [Contact](#contact)

---

## Introduction

The Datapeak Management System for Bullpadel Shop represents the final project of my journey in the Start2Impact Fullstack Master program.
At the same time, it is a first prototype for an application developed for Datapeak (an IT consulting company) for a client: Bullpadel Shop (a padel product outlet).

## Tech Stack

### Backend

- PHP
- MySQL
- JWT token
- Composer
- Docker

### Frontend

- React
- Redux
- Vite
- Tailwind
- Axios
- Docker

---

## Features

### Prodotti

The Prodotti section displays a list of products in stock, grouped in sets of 30 with navigation arrows. Users can add new products, modify details like price, discount, and stock, and search for products using a search bar. Filtering options include:

By category (dropdown menu).
By name.
By barcode, which shows all products sharing the same name as the scanned barcode.

### Cassa

In the Cassa section, products are added to the cart by entering their barcode. Users can view product details, apply additional discounts, or mark items as free. The Remove button removes a single unit, while Remove All clears the entire quantity of a product. Additional options include resetting the cart or completing the order.

When completing an order, a modal allows users to select a payment method and optionally add a customer's email. Upon confirmation, the order is created and becomes available for review in the Orders section.

### Storico Ordini

In the Storico Ordini section, all orders are displayed.
Users can filter orders by date, delete an order, and view order details. By clicking the View Order button, a modal will open showing the details of the specific order.

### Chiusura cassa

The Chiusura Cassa section allows users to view the total daily collection in a modal and close the cash register, recording the total in the database.

---

## How to Install Locally with Docker

Follow these steps to set up the project locally using Docker:

### Prerequisites

- Install [Docker](https://docs.docker.com/get-docker/).
- Install [Docker Compose](https://docs.docker.com/compose/install/).

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/project.git
   cd project
   ```

2. Navigate to the root of the project directory.

3. Verify the `docker-compose.yml` file in the project directory. It should define three services:

   - `db`: MySQL database
   - `backend`: The backend service
   - `frontend`: The frontend service

4. Start the Docker containers:

   ```bash
   docker-compose up --build
   ```

   - This will build and start the services defined in the `docker-compose.yml` file.

5. Access the services:

   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend**: [http://localhost:8080](http://localhost:8080)
   - **Database**: MySQL accessible on `localhost:3307` (username: `user`, password: `password`)

6. To stop the services, use:

   ```bash
   docker-compose down
   ```

7. For persistent data storage, the MySQL database uses a Docker volume defined as `db_data` in the `docker-compose.yml` file.

---

## API Endpoints

### Auth

- **GET** /auth/authenticate: Token authentication
- **POST** /auth/login: Login
- **POST** /auth/createUser: Create a new user
- **GET** /auth/getAll: Get all users registrated
- **DEL** /auth/deleteUser: Delete a user

### Prodotti

- **GET** /prodotti/read: get products
- **GET** /prodotti/categories: get the categories of products
- **GET** /prodotti/filter: filter products by barcode/category/name
- **POST** /prodotti/create: add a new product
- **PUT** /prodotti/update: update price/discount/quantity
- **DEL** /prodotti/delete: delete a product

### Carrello

- **POST**/carrello/scan: add the product scanned in the cart
- **POST**/carrello/completaOrdine: add a new order
- **DEL** /carrello/removeOne: remove 1 unit of product from cart
- **DEL** /carrello/removeAll: remove the product from the cart
- **DEL** /carrello/resetCarrello: reset the cart
- **PUT**/carrello/aggiungiSconto: add more discount to a product in the cart

### Ordini

- **GET**/ordini/getOrdini: get all the orders
- **GET**/ordini/getOrderDetails: get the details of the order, products etc...
- **GET**/ordini/filterByDate: filter orders by date
- **DEL** /ordini/delete: delete an order

### Chiusura Cassa

- **GET**/ordini/totaleGiornaliero: get the total sold of the day
- **POST** /totale/chiusuraCassa: add the total of the day in the db

---

## Contacts

For inquiries or support, please reach out to:

- **Email**: (fabio.tedesco1997@gmail.com)

---
