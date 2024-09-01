# Tribeinvite

Render Service for TribeInvite

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Triggering the Render Job](#triggering-the-render-job)

## Installation

1. Install project dependencies:
```bash
   npm install
```

2. Install RabbitMQ:
*mac: https://www.rabbitmq.com/docs/install-generic-unix#downloads
*windows: https://www.rabbitmq.com/docs/install-windows#downloads

3. Start RabbitMQ server: 
Windows: Start from the Start menu
Mac: Run the following command:
```bash
rabbitmq-server
```
4. Verify RabbitMQ server status:
```bash
rabbitmqctl status
```
Ensure port 5672 is open. If using a different port, update the `RABBITMQ_PORT` in the .env file.

## Configuration
Update the .env file with the following:
* `BUILDPATH`
* `AERENDER_BINARY`


## Running the project
Ensure Appwrite cloud function and ngrok are set up before running the app. Refer to the readme in the appwritecloud-function folder for details.

Start the project:
```bash
npm run dev
```

## Triggering the render job
Use Postman or terminal to execute the following curl command:
```bash
curl --location --request POST '<appwrite-cloud-function-url>/v1/functions/<appwrite-cloud-function-id>/executions' \
--header 'Content-Type: application/json' \
--header 'X-Appwrite-Project: <appwrite-project-id>' \
--header 'X-Appwrite-Key: <appwrite-api-key>' \
--data ''
```
Replace the following placeholders with values from your Appwrite dashboard:
* `<appwrite-cloud-function-url>`
* `<appwrite-cloud-function-id>`
* `<appwrite-project-id>`
* `<appwrite-api-key>`


Example:
```bash
curl --location --request POST 'https://66d41dd2dd6365632362.appwrite.global/v1/functions/66d41dd1000b26c0535f/executions' \
--header 'Content-Type: application/json' \
--header 'X-Appwrite-Project: 669bd589000118793271' \
--header 'X-Appwrite-Key: 63a1c6a5ea8bb1536ccd12f45fbbc12f196f425b39ae64009d70e4111e2b5c009d4591f8cef136ff40a44ecc825dda52da7bb65b081b7d2f6ab1be2aa9a6bdcc1d080d5ebadbcdaf7d839be716acab0850b836e93cd25089dc704bfb360465053b35a1ba45f50f94246fa408b9807095cab678a39b865d1e21aef882b072c856' \
--data ''
```





