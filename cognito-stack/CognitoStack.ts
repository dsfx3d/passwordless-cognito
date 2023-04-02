import { Construct, CfnOutput, Stack, StackProps } from '@aws-cdk/core';
import { AccountRecovery, UserPool } from '@aws-cdk/aws-cognito';
import { CognitoStackProps } from './CognitoStackProps';
import { TriggerHandlerConstruct } from './TriggerHandlerConstruct';

export class CognitoStack extends Stack {
  readonly userPool: UserPool;

  constructor(scope: Construct, id: string, props: CognitoStackProps) {
    super(scope, id, props);
    const triggerHandler = new TriggerHandlerConstruct(this, 'TriggerHandler')

    // Create a Cognito User Pool
    this.userPool = new UserPool(this, 'UserPool', {
      lambdaTriggers: {
        createAuthChallenge: triggerHandler.function,
        defineAuthChallenge: triggerHandler.function,
        verifyAuthChallengeResponse: triggerHandler.function,
      },
      userPoolName: props.userPoolName,
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      autoVerify: { email: true },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },
      passwordPolicy: { minLength: 32 },
      accountRecovery: AccountRecovery.NONE,
    });

    // Output the User Pool ID
    new CfnOutput(this, 'UserPoolId', {
      value: this.userPool.userPoolId,
    });
  }
}
