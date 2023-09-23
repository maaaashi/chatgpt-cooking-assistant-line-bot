import {
  Client,
  TextMessage,
  WebhookEvent,
  MessageEvent,
  ClientConfig,
} from '@line/bot-sdk'

const config: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN!,
  channelSecret: process.env.CHANNEL_SECRET!,
}

const client = new Client(config)

const handleTextMessage = async (event: MessageEvent): Promise<void> => {
  if (event.message.type !== 'text') {
    return
  }

  const replyToken = event.replyToken
  const userMessage = event.message.text

  try {
    const url = process.env.GENERATE_RECIPE_URL!

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        userMessage,
      }),
    })

    const { recipe } = await response.json()

    console.log(recipe)

    const replyMessage: TextMessage = {
      type: 'text',
      text: recipe,
    }

    await client.replyMessage(replyToken, replyMessage)
  } catch (error) {
    console.error('Error responding to message:', error)
    const replyMessage: TextMessage = {
      type: 'text',
      text: '開発中です。',
    }

    await client.replyMessage(replyToken, replyMessage)
  }
}

export const handleEvent = async (event: WebhookEvent): Promise<void> => {
  if (event.type === 'message' && event.message.type === 'text') {
    await handleTextMessage(event)
  } else {
    console.log(`Unhandled event type: ${event.type}`)
  }
}
