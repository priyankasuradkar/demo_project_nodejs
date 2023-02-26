const { EMAIL, PASSWORD } = require('../config/prod')
const nodeMailer = require('nodemailer')

const mailSender = (email) => {


    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL,
            pass: PASSWORD,
        }
    });

    mailOptions = {
        from: EMAIL,
        to: email, //argument in db
        subject: 'Sending email using nodejs',
        text: 'That was easy!!'
    }

    //here trasnpoter is higher order functions and 
    transporter.sendMail(mailOptions, (error, info) => {
        if (error)
            console.log(error)
        else
            console.log('email sent' + info)//??

    })

}
module.exports = mailSender
