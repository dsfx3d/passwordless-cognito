import { Construct, CfnOutput, Stack, StackProps } from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';

export interface CognitoUserPoolStackProps extends StackProps {
  userPoolName: string;
}

export class CognitoStack extends Stack {
  public readonly userPool: cognito.UserPool;

  constructor(scope: Construct, id: string, props: CognitoUserPoolStackProps) {
    super(scope, id, props);

    // Create a Cognito User Pool
    this.userPool = new cognito.UserPool(this, 'UserPool', {
      userPoolName: props.userPoolName,
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
        phone: false,
        username: true,
      },
      autoVerify: {
        email: true,
        phone: false,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
    });

    // Output the User Pool ID
    new CfnOutput(this, 'UserPoolId', {
      value: this.userPool.userPoolId,
    });
  }
}
