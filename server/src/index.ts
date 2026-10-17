
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'showbar-api',
  });
});

app.get('/currency/rates', async (req, res) => {
  try {
    const response = await fetch(
      'https://netarz.ir/api/fx/v1/rates?codes=USD,EUR,GBP,AED,TRY,RUB,GEL,BGN',
      {
        headers: {
          Authorization: `Bearer ${process.env.NETARZ_API_KEY}`,
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();

      return res.status(response.status).json({
        error: 'NetArz request failed',
        status: response.status,
        details: errorText,
      });
    }

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

app.listen(process.env.PORT || 3001, () => {
  console.log('showbar-api running');
});
