const nodemailer = require('nodemailer');

const sendEmail = async options => {
    const treansporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        auth:{
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: 'Mohin <ms9799631@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await treansporter.sendMail(mailOptions);
};

module.exports = sendEmail;
