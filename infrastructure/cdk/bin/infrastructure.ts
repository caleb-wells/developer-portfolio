#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { InfrastructureStack } from '../lib/infrastructure-stack';

const app = new cdk.App();

const domainName = app.node.tryGetContext('domainName');
const hostedZoneId = app.node.tryGetContext('hostedZoneId');

if (!domainName) {
  throw new Error('domainName context variable is required. Use: cdk deploy -c domainName=example.com');
}

new InfrastructureStack(app, 'PortfolioStack', {
  domainName,
  hostedZoneId,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'us-east-1', // ACM certificates for CloudFront must be in us-east-1
  },
  crossRegionReferences: true,
});