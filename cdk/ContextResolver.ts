import { ConstructNode } from "@aws-cdk/core";

export class ContextResolver {
  static resolveValues<T extends string>(node: ConstructNode, options: T[]): Record<T, string> {
    return options.reduce((result, option) => ({
      ...result,
      [option]: node.tryGetContext(option)
    }), {} as Record<T, string>);
  }
}
