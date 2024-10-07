const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

class EmailService {
    async sendVerificationEmail(userEmail, verificationToken) {
        const verificationUrl = `http://localhost:3000/verify-email?token=${verificationToken}`;

        const mailOptions = {
            from: 'todolistapp@gmail.com',
            to: userEmail,
            subject: 'Verify your email address',
            text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
            html: `<p>Please verify your email by clicking on the following link:</p> <a href="${verificationUrl}">Verify Email</a>`
        };

        await transporter.sendMail(mailOptions);
    }
}

module.exports = new EmailService();
