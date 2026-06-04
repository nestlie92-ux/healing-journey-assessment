const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const GROUP_ID = '188572544667747580';

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.post('/subscribe', async (req, res) => {
  try {
    const { name, email } = req.body;

    console.log('========================');
    console.log('NEW SUBMISSION RECEIVED');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('========================');

    const response = await axios.post(
      'https://connect.mailerlite.com/api/subscribers',
      {
        email,
        fields: {
          name: name
        },
        groups: [GROUP_ID]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Subscriber added to MailerLite');

    res.json({
      success: true,
      message: 'Subscriber added successfully'
    });

  } catch (error) {

    console.error(
      'MailerLite Error:',
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});