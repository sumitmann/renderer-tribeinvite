import dotenv from 'dotenv';
import { Client } from 'node-appwrite';
import amqp from 'amqplib';

dotenv.config();

const queueName = 'render_queue';

// Function to connect to RabbitMQ via Ngrok
async function connectToRabbitMQ(log) {
    const connection = await amqp.connect({
        protocol: 'amqp',
        hostname: process.env.NGROK_URL,
        port: parseInt(process.env.NGROK_PORT),
        username: process.env.RABBITMQ_USERNAME,
        password: process.env.RABBITMQ_PASSWORD
    });

    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    log('Connection to RabbitMQ via Ngrok successful');
    return {
        connection,
        channel,
    };
}

// Function to publish data to RabbitMQ queue
async function publishToQueue(log, data) {
    const { channel, connection } = await connectToRabbitMQ(log);

    const message = Buffer.from(JSON.stringify(data));
    await channel.sendToQueue(queueName, message);

    log('DATA SENT TO QUEUE');
    return function stopConsumer() {
        channel.close();
        return connection.close();
    };
}

// Appwrite function to handle incoming requests
export default async ({ req, res, log, error }) => {
    log('Function triggered');

    try {
        const stop = await publishToQueue(log, {
            templateId: 1,
            customizations: {
                template: {
                    src: process.env.TEMPLATE_SRC,
                    composition: process.env.TEMPLATE_COMPOSITION,
                    outputModule: 'H.264 - Match Render Settings - 15 Mbps',
                    outputExt: 'mp4',
                    settingsTemplate: 'Best Settings',
                },
            },
        });

        // Optionally stop the connection after sending
        // stop();

        // Send a success response back to the client
        res.json({
            motto: 'Build like a team of hundreds_',
            learn: 'https://appwrite.io/docs',
            connect: 'https://appwrite.io/discord',
            getInspired: 'https://builtwith.appwrite.io',
        });

    } catch (err) {
        error('Error triggering render job:', err.message);
        res.json({
            success: false,
            message: 'Error triggering video rendering job',
            error: err.message,
        });
    }
};