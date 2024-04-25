import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';


//TODO role: "assistant"역할 부여도 파라미터에 넣어야함
dotenv.config()

const app = express();
app.use(express.json());
app.use(cors()); // CORS 미들웨어 추가


const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

console.log(process.env.OPENAI_ORGANIZATION);
console.log(process.env.OPENAI_API_KEY);



const openai = new OpenAIApi(configuration);
console.log('1');

app.post('/chat', async (req, res) => {
  try {
    console.log("질문 : " +req.body.message);

    const response = await openai.createChatCompletion({
      model: "gpt-4-1106-preview",
      messages: [{ role: "user", content: req.body.message }],
    });

    console.log("답변 : " +response.data.choices[0].message.content);

    res.json(response.data.choices[0].message.content);
  } catch (error) {
  
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
