import { StackProps , Stack, App } from '@aws-cdk/core';
import * as path from 'path';
import * as ecs from '@aws-cdk/aws-ecs';
import { TaskDefinition, Compatibility, ContainerImage } from '@aws-cdk/aws-ecs';
import { Vpc, InstanceType, SubnetType } from '@aws-cdk/aws-ec2';
import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns';
import { ApplicationProtocol } from '@aws-cdk/aws-elasticloadbalancingv2';

export interface MediawikiDeployStackProps extends StackProps {
}

export class MediawikiDeployStack extends Stack {
  constructor(scope: App, id: string, props?: MediawikiDeployStackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'VPC', {
      subnetConfiguration: [{
        cidrMask: 24,
        name: 'Public',
        subnetType: SubnetType.PUBLIC,
      },
      {
        cidrMask: 24,
        name: 'Private',
        subnetType: SubnetType.PRIVATE,
      }]
    });

    const cluster = new ecs.Cluster(this, 'app-cluster', {
      clusterName: 'app-cluster',
      vpc,
    });

    const taskDefinition = new TaskDefinition(this, 'Task', {
      compatibility: Compatibility.EC2,
      memoryMiB: '512',
      cpu: '256',
    });

    taskDefinition
      .addContainer('mediawiki-img', {
        image: ContainerImage.fromAsset(path.join(__dirname, '../container-setup/')),
        memoryLimitMiB:256,
        cpu: 256,
        privileged: true
      })
      .addPortMappings({ containerPort: 80, hostPort: 80 });

    cluster.addCapacity('app-scaling-group', {
      instanceType: new InstanceType('t2.micro'),
      desiredCapacity: 1,
      maxCapacity: 2,
      minCapacity: 1,
    })

    new ecsPatterns.ApplicationLoadBalancedEc2Service(
      this,
      'mediawiki-website',
      {
        cluster,
        cpu: 256,
        desiredCount: 1,
        memoryLimitMiB: 512,
        serviceName: 'mediawiki-service',
        taskDefinition: taskDefinition,
        publicLoadBalancer: true,
      }).targetGroup.configureHealthCheck({
        path: '/mediawiki/index.php'
      });
  }
}