import { SES } from "@aws-sdk/client-ses";
import { Callback } from 'aws-lambda';
import { AuthTriggerEvent } from './AuthTriggerEvent';
import { CreateOTPChallenge } from "./CreateOTPChallenge";
import { DefineOTPChallenge } from "./DefineOTPChallenge";
import { TriggerHandler } from "./TriggerHandler";
import { TriggerSource } from "./TriggerSource";
import { VerifyOTPChallenge } from "./VerifyOTPChallenge";

const handlers: Record<TriggerSource, TriggerHandler> = {
  [TriggerSource.DefineAuthChallenge]: new DefineOTPChallenge().handler,
  [TriggerSource.CreateAuthChallenge]: new CreateOTPChallenge(new SES({})).handler,
  [TriggerSource.VerifyAuthChallengeResponse]: new VerifyOTPChallenge().handler,
}

export default function (event: AuthTriggerEvent, c: any, callback: Callback) {
  return handlers[event.triggerSource](event, callback)
}
