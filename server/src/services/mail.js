require('dotenv').config()
const nodemailer = require('nodemailer')

const sendEmailConfirm = async data => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    })

    await transporter.sendMail({
        from: '"LACATRIP" <nguyenthanhtoan2211@gmail.com>',
        to: data.receive,
        subject: 'Confirm register',
        html: `
        <h3>Hello ${data.name}, </h3>
        <br/>
        <p>Thanks you for your register our app ! To confirm register please click in link here !</p>
        <br/>
        <div>
            <a href="${data.redirectLink}" target="_blank">Confirm register/a>
        </div>
        <br/>
        <p>Thanks</p>
        `
    })
}

module.exports = {
    sendEmailConfirm
}
