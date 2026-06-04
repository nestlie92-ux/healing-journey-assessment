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
  console.log("🔥 SUBSCRIBE ROUTE HIT");
  
  try {
    const { name, email } = req.body;

    console.log("DATA", name, email);

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

    console.log("✅ MailerLite success");

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});