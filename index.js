// this is the consumer
require('dotenv').config()
const amqp = require('amqplib')
const { render } = require('@nexrender/core')

const queueName = 'render_queue'

async function connectToRabbitMQ() {
    const connection = await amqp.connect({
        protocol: 'amqp',
        hostname: process.env.RABBITMQ_HOST,
        port: process.env.RABBITMQ_PORT,
        username: process.env.RABBITMQ_USERNAME,
        password: process.env.RABBITMQ_PASSWORD,
    })
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, { durable: true })

    return {
        connection,
        channel,
    }
}

async function startConsumer() {
    const { channel, connection } = await connectToRabbitMQ()

    channel.prefetch(1);
    channel.consume(queueName, async (msg) => {
        if (msg !== null) {
            const jobData = JSON.parse(msg.content.toString())

            try {
                const result = await render(jobData.customizations, {
                    workpath: process.env.BUILDPATH,
                    binary: process.env.AERENDER_BINARY,
                    skipCleanup: true,
                    addLicense: false,
                    debug: true,
                })

                console.log("res:", result)
            } catch (error) {
                console.log("err:", error)
            }
           
            channel.ack(msg) // Acknowledge that the task has been processed
        }
    })

    return function stopConsumer() {
        return connection.close()
    }
}

startConsumer().then((stop) => {
    process.on('SIGINT', async () => {
        await stop()
        process.exit(0)
    })
    process.on('SIGTERM', async () => {
        await stop()
        process.exit(0)
    })
    process.on('beforeExit', async (code) => {
        await stop(0)
    })
    process.on('uncaughtException', async (error) => {
        await stop()
    })
})