const client = require("@sendgrid/mail");

function sendEmail(client, message, senderEmail, senderName) {
    return new Promise((fulfill, reject) => {
        const data = {
            from: {
                email: 'szymon.burak0031@gmail.com',
                name: 'Szymon'
            },
            subject: 'Netlify Function - Sendgrid Email',
            to: 'sajmon0031@gmail.com',
            html: `Siemanko!`
        }

        client
            .send(data)
            .then(([response, body]) => {
                fulfill(response)
            })
            .catch(error => reject(error))
    })
}

exports.handler = function(event, context, callback) {
    const {
        SENDGRID_API_KEY,
        SENDGRID_SENDER_EMAIL,
        SENDGRID_SENDER_NAME
    } = process.env

    const body = JSON.parse(event.body)
    const message = body.message

    client.setApiKey(SENDGRID_API_KEY)

    sendEmail(
        client,
        message,
        SENDGRID_SENDER_EMAIL,
        SENDGRID_SENDER_NAME
    )
        .then(response => callback(null, { statusCode: response.statusCode }))
        .catch(err => callback(err, null))
}
