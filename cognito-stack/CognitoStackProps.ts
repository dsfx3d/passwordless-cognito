import { StackProps } from '@aws-cdk/core';

export interface CognitoStackProps extends StackProps {
  userPoolName: string;
}
