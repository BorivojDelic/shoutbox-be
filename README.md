# Shoubox API

## Introduction

The Shoubox API is a backend service built using NestJS.

## Getting Started

### Prerequisites

*   **Node.js:** (Version 18 or higher recommended)
*   **A Database Server:** MySQL

### Installation
1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Configure Environment Variables:**
    *   Create a `.env` file in the root directory of the project, based on the provided `.env.example`.

## Technical Overview
- NestJS framework
- socket.io library for real time communication
- TypeORM library for database management
- class-transformer and class-validator libraries for data validation
- multer library for file upload
- Custom DTOs and pipes for data transformation
- Custom Exceptions and Filters for error handling

## Running the Application

For running the application in development mode with automatic file watching and restarts:

```bash
npm run start:dev
```
