const sendgrid = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const msg = {
    to: "",
    from: "",
    subject: "",
    text: ""
}
sendgrid.send(msg)
    .then(() => {
        console.log('email sent')
    })
    .catch((error) => {
        console.log(error)
    })

module.exports = sendgridMailSender
