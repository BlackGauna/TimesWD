import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_SMTP,
  port: parseInt(process.env.SMTP_PORT!),
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PW,
  },
})

export const sendMail = async (subject: string, message: string) => {
  const info = await transporter.sendMail({
    from: `Me <${process.env.MAIL_ADDRESS}>`,
    to: process.env.TARGET_MAIL,
    subject: subject,
    text: message,
  })

  console.log("Message sent: %s", info.messageId)
}
