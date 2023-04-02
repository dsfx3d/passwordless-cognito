import { App } from "@aws-cdk/core";
import { ContextResolver } from "@pl-cognito/cdk";
import { CognitoStack } from "./CognitoStack";

ContextResolver.resolveValues("MyUserPool");

const app = new App();
new CognitoStack(app, "CognitoStack", {
  userPoolName: "MyUserPool",
});
