import nodemailer from "nodemailer"

const sendMail = async (mailOptions) => {

    return new Promise((resolve, reject) => {

        const transporter = nodemailer.createTransport({
            host: "mail.privateemail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        })

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) resolve(false);
            else resolve(true);
        });
    })
}

export default {
    sendMail
}