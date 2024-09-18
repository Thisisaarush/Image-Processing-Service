# [Image Processing Service](https://roadmap.sh/projects/image-processing-service)

The Image upload service allows users to upload, retrive, delete, transform images to/from AWS S3.

## Features

- User authentication using JWT
- Upload, Retrive, Delete, List images to/from AWS S3
- Transform images using Sharp library
- Cache transformed images using Redis
- Rate limiting using Redis
- Using RabbitMQ for async processing (Transforming images)
- Docker and Docker-compose for containerization
- Using Kubernetes for deployment

## Tech Stack

- Express.js
- MongoDB
- Redis
- RabbitMQ
- AWS S3
- Sharp
- Docker
- Kubernetes

## Local Development using Docker (Recommended)

- Clone the repository.
- Create a `.env` file in the root directory and add the environment variables from `.env.example` with your values.
- Run the following command to start the services:

```bash
  docker compose up --build
```

## Local Development without Docker

- Clone the repository.
- Create a `.env` file in the root directory and add the environment variables from `.env.example` with your values.
- Install and start MongoDB, Redis, RabbitMQ services on your local machine.
- Install the dependencies:

```bash
  npm install
```

- Start the server:

```bash
  npm run dev
```

## Deployment using Kubernetes

### Pre-requisites

- Create `secrets.yaml` file in root directory with the content from `secrets.example.yaml` and update the values.
- Use the following command to generate the base64 encoded secret and update the `secret.yaml` file with the generated secret.

```bash
  echo -n "your-secret" | base64
```

- Once the secrets are defined, apply them to your Kubernetes cluster:

```bash
  kubectl apply -f secrets.yaml
```
