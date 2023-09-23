import * as cdk from 'aws-cdk-lib'
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway'
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const lineBotHandler = new Function(this, 'LineBotHandler', {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset('src'),
      handler: 'server.handler',
      timeout: cdk.Duration.minutes(15),
      environment: {
        CHANNEL_ACCESS_TOKEN: process.env.CHANNEL_ACCESS_TOKEN!,
        CHANNEL_SECRET: process.env.CHANNEL_SECRET!,
        GENERATE_RECIPE_URL: process.env.GENERATE_RECIPE_URL!,
      },
    })

    // API Gatewayの定義
    new LambdaRestApi(this, 'Endpoint', {
      handler: lineBotHandler,
    })
  }
}
