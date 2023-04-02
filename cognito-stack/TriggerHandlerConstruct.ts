import { Construct, Duration } from "@aws-cdk/core";
import { Code, Function, Runtime } from "@aws-cdk/aws-lambda"

export class TriggerHandlerConstruct extends Construct {
  readonly function: Function;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.function = new Function(this, 'TriggerHandler', {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset('src/lambda'),
      handler: 'index.handler'
    });
  }
}
