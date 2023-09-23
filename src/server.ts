import * as express from 'express'
import * as bodyParser from 'body-parser'
import { handleEvent } from './bot'
import { Handler } from 'aws-cdk-lib/aws-lambda'

export const handler: Handler = async () => {
  const app = express()

  app.post('/webhook', bodyParser.json(), (req, res) => {
    Promise.all(req.body.events.map(handleEvent)).then((result) =>
      res.json(result)
    )
  })

  const PORT = process.env.PORT || 3000

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}
