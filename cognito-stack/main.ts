import { App } from "@aws-cdk/core";
import { CognitoStack } from "./CognitoStack";

const app = new App();
new CognitoStack(app, "CognitoStack", {
  userPoolName: "MyUserPool",
});
