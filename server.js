import express from 'express';
    import cors from 'cors';
    import { Configuration, OpenAIApi } from "openai";
    import * as dotenv from 'dotenv';
    dotenv.config();

    const app = express();
    const port = 3000;

    app.use(cors());
    app.use(express.json());

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    app.post('/api/chat', async (req, res) => {
      const { message, context } = req.body;

      try {
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {role: "system", content: "You are a helpful assistant."},
            ...context.map(msg => ({role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.text})),
            {role: "user", content: message}
          ],
        });

        const response = completion.data.choices[0].message.content;
        res.json({ response });
      } catch (error) {
        console.error("Erreur lors de l'appel à l'API OpenAI:", error);
        res.status(500).json({ error: "Erreur lors de la génération de la réponse." });
      }
    });

    app.listen(port, () => {
      console.log(`Serveur API en cours d'exécution sur http://localhost:${port}`);
    });
