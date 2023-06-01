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
        <p>Thanks you for your register our app ! To confirm register please click in link here !</p>
        <div>
            <a href="${data.redirectLink}" target="_blank">Confirm register</a>
        </div>
        <p>Thanks</p>
        `
    })
}
const sendEmailResetPassword = async data => {
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
        subject: 'Reset Password',
        html: `
        <h3>Hello ${data.name}, </h3>
        <p>Thanks you for your using our app !</p>
        <p>Here is your new Password! ${data.newPassword}</p>
        <div>
            <a href="${data.redirectLink}" target="_blank">Signin Web App</a>
        </div>
        <p>Thanks</p>
        `
    })
}

const sendEmailConfirmEmployee = async data => {
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
        subject: 'Create employee',
        html: `
        <h3>Hello ${data.name}, </h3>
        <p>Thanks you for your working with LACATRIP !</p>
        <p>Here is your new Password! ${data.password}, To confirm register please click in link here:</p>
        <div>
            <a href="${data.redirectLink}" target="_blank">Confirm register</a>
        </div>
        <p>Thanks</p>
        `
    })
}
const sendEmailConfirmServiceManager = async data => {
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
        subject: 'Create Servicemanager',
        html: `
        <h3>Hello ${data.name}, </h3>
        <p>Thanks you for your working with LACATRIP !</p>
        <p>Here is your new Password! ${data.password}, To confirm register please click in link here:</p>
        <div>
            <a href="${data.redirectLink}" target="_blank">Confirm register</a>
        </div>
        <p>Thanks</p>
        `
    })
}
const sendMailInviteToTrip = async (data) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    })
    const result = await transporter.sendMail({
        from: '"LACATRIP" <nguyenthanhtoan2211@gmail.com>',
        to: data.email,
        subject: `Invite to trip ${data.trip.name}`,
        html: `
        <h3>Hello, </h3>
        <p>Your friend was invite you to his/her trip ${data.trip.name}</p>
        <div>
            <a href="${data.redirectLink}" target="_blank">Please complete create account to enjoy the trip</a>
        </div>
        <p>Thanks</p>
        `
    })
    return result
}

module.exports = {
    sendEmailConfirm,
    sendEmailResetPassword,
    sendEmailConfirmEmployee,
    sendEmailConfirmServiceManager,
    sendMailInviteToTrip
}
