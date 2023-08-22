import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  const { schema, prompt, database } = await req.json()

  const message = `
  Você forneceu um schema SQL para o SGBD "${database}".
  Aqui está o schema SQL que você forneceu:
  ------------------------------------------
  ${schema}
  ------------------------------------------

  Agora, com base nesse schema, por favor, escreva uma query SQL para atender à seguinte solicitação:
  "${prompt}"

  Lembre-se de fornecer apenas o código SQL resultante, sem informações adicionais.

  Aguardo sua query SQL abaixo:
`.trim()

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'user',
        content: message,
      },
    ],
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
