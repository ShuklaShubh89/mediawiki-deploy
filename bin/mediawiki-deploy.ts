#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MediawikiDeployStack } from '../lib/mediawiki-deploy-stack';

const app = new cdk.App();
new MediawikiDeployStack(app, 'MediawikiDeployStack');
