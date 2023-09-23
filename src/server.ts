import * as express from 'express'
import * as bodyParser from 'body-parser'
import { handleEvent } from './bot'
import * as awsServerlessExpress from 'aws-serverless-express'

const app = express()

app.post('/webhook', bodyParser.json(), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  )
})

// AWS Lambdaのハンドラとして動作するように設定
const server = awsServerlessExpress.createServer(app)

exports.handler = (event: any, context: any) => {
  awsServerlessExpress.proxy(server, event, context)
}
