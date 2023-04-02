import { Callback } from "aws-lambda";
import { AuthTriggerEvent } from "./AuthTriggerEvent";

export type TriggerHandler = (event: AuthTriggerEvent, callback: Callback) =>
  Promise<void>;
