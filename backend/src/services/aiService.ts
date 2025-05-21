import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateSummary = async (text: string): Promise<string> => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `“Summarize in up to 30 words”).:\n\n${text}`,
      },
    ],
  });

  return response.choices[0].message.content?.trim() || '';
};