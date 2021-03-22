# Welcome to your CDK TypeScript project!

This is a project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

Use these commands in sequence to run the app:

1. install npm
2. install pnpm ( npm install -g pnpm)
3. install cdk cli (npm install -g cdk)
4. pnpm build
5. cdk deploy ( This assumes you have your aws cli configured )
6. In the outputs navigate to the loadbalancer dns.
7. change the url to <dns>/mediawiki

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
