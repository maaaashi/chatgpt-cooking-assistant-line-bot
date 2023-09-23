import { Client, TextMessage, WebhookEvent, MessageEvent } from '@line/bot-sdk'

const config = {
  channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN',
  channelSecret: 'YOUR_CHANNEL_SECRET',
}

const client = new Client(config)

const handleTextMessage = async (event: MessageEvent): Promise<void> => {
  if (event.message.type !== 'text') {
    return
  }

  const replyToken = event.replyToken
  const userMessage = event.message.text

  const replyMessage: TextMessage = userMessage.includes('こんにちは')
    ? {
        type: 'text',
        text: 'こんにちは！',
      }
    : {
        type: 'text',
        text: 'メッセージを受け取りました: ' + userMessage,
      }

  try {
    await client.replyMessage(replyToken, replyMessage)
  } catch (error) {
    console.error('Error responding to message:', error)
  }
}

export const handleEvent = async (event: WebhookEvent): Promise<void> => {
  if (event.type === 'message' && event.message.type === 'text') {
    await handleTextMessage(event)
  } else {
    console.log(`Unhandled event type: ${event.type}`)
  }
}
