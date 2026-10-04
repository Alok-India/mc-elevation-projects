const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const emailUser = process.env.EMAIL_USER || 'mcelevationprojectss@gmail.com';
const emailPass = process.env.EMAIL_PASS || 'your_app_password_here';
const whatsappFrom = process.env.TWILIO_FROM || 'whatsapp:+14155238886';
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID || 'your_twilio_account_sid';
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN || 'your_twilio_auth_token';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

const client = twilio(twilioAccountSid, twilioAuthToken);

app.post('/api/enquiry', async (req, res) => {
  try {
    const { name, phone, email, projectType, message } = req.body || {};

    if (!name || !phone || !email) {
      return res.status(400).json({ success: false, message: 'Name, phone, and email are required.' });
    }

    const enquiryText = `
New enquiry received from MC Elevation Projects website

Name: ${name}
Phone: ${phone}
Email: ${email}
Project Type: ${projectType || 'Not specified'}

Requirement:
${message || 'No additional details provided'}
    `.trim();

    const mailOptions = {
      from: emailUser,
      to: 'mcelevationprojectss@gmail.com',
      subject: 'New Interior Project Enquiry',
      text: enquiryText,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    if (twilioAccountSid && twilioAuthToken && twilioAccountSid !== 'your_twilio_account_sid') {
      await client.messages.create({
        from: whatsappFrom,
        to: 'whatsapp:+918130232125',
        body: enquiryText,
      });
    }

    res.json({
      success: true,
      message: 'Your enquiry has been submitted successfully.',
    });
  } catch (error) {
    console.error('Enquiry submission error:', error);
    res.status(500).json({
      success: false,
      message: 'There was a problem submitting the enquiry. Please try again.',
    });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
