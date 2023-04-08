import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, GPT, OpenAI } from 'openai';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI(configuration);
const gpt3 = new GPT({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-3.5-turbo",
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello there //developed by [al.]',
  });
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await gpt3.complete({
      prompt: `${prompt}`,
      max_tokens: 2000,
      n: 1,
      stop: '\n',
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));
