import nodemailer from 'nodemailer';

export async function sendEmails(formData: { name: string; email: string; phone: string; subject: string; message: string }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Or your SMTP provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'admin@needlon.com',
    subject: `NEW INQUIRY: ${formData.subject}`,
    html: adminTemplate(formData), 
  });

  await transporter.sendMail({
    from: '"Needlon Bespoke" <noreply@needlon.com>',
    to: formData.email,
    subject: 'Thank you for contacting Needlon',
    html: clientTemplate(formData), 
  });
}