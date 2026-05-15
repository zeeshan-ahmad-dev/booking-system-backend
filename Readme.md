# Airbnb Clone Backend API

A backend system for a property rental platform built with Node.js, Express, and MongoDB. The project implements core backend concepts such as authentication, listings, booking management, payments, and background job processing.

---

## Overview

This project simulates a real-world booking platform where users can:

* Register and authenticate using JWT
* Create and manage property listings (host role)
* Book listings with date conflict validation
* Leave reviews only after confirmed bookings
* Process payments using Stripe (PaymentIntent + Webhooks)
* Handle automated booking updates using cron jobs

---

## Features

### Authentication

* JWT-based authentication
* Role-based access control (User / Host)

### Listings

* Create, update, delete listings (host only)
* Filter listings by location, price, guests, and amenities
* Pagination support

### Bookings

* Date-based booking system
* Prevent overlapping bookings
* Booking lifecycle:
  pending → confirmed → cancelled

### Reviews

* Only users with confirmed bookings can create reviews
* One review per booking restriction

### Payments

* Stripe PaymentIntent integration
* Webhook-based payment confirmation
* Payment lifecycle:
  pending → paid → confirmed

### Background Jobs

* Cron job to expire pending bookings automatically

---

## Tech Stack

* Node.js
* Express.js
* MongoDB & Mongoose
* Stripe API
* JWT Authentication
* node-cron

---

## Project Structure

```
/controllers   route handlers
/models        database schemas
/routes        API routes
/services      business logic
/middlewares   auth and error handling
/utils         reusable helper and utility functions
/db            database connection setup and query layer
/configs       application configuration files
```

---

## API Endpoints

### Auth

* POST /auth/register
* POST /auth/login

### Listings

* GET /listings
* GET /listings/:id
* GET /listings/:id/reviews/summary
* POST /listings
* PUT /listings/:id
* DELETE /listings/:id

### Bookings

* POST /bookings/listing/:listingId
* GET /bookings/my
* PATCH /bookings/:bookingId/confirm
* PATCH /bookings/:bookingId/cancel

### Reviews

* GET /reviews/listings/:listingId
* PATCH /reviews/:reviewId
* DELETE /reviews/:reviewId
* POST /reviews

### Payments

* POST /payments/create/:bookingId
* POST /webhooks/stripe

---

## Setup

```bash
git clone <repo-url>
cd project
npm install
```

### Environment Variables

```
PORT=
DB_URI=
SECRET_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

```

### Run Server

```
npm run dev
```

---

## Notes

This project focuses on backend architecture, state management, and real-world system design concepts such as booking conflicts, payment workflows, and asynchronous processing.
