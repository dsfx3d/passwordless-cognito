import {
  Callback,
  CreateAuthChallengeTriggerEvent,
  DefineAuthChallengeTriggerEvent,
  VerifyAuthChallengeResponseTriggerEvent
} from 'aws-lambda';
import { ChallengeName } from "./ChallengeName";
import { TriggerSource } from './TriggerSource';
import { ChallengeParam } from './ChallengeParam';
import { ChallengeType } from './ChallengeType';
import { genKey } from './genKey';


type AuthTriggerEvent = CreateAuthChallengeTriggerEvent | DefineAuthChallengeTriggerEvent | VerifyAuthChallengeResponseTriggerEvent;
type TriggerHandler = (event: AuthTriggerEvent, callback: Callback) => void;

const triggerMap: Record<TriggerSource, TriggerHandler> = {
  [TriggerSource.DefineAuthChallenge]: defineAuthChallengeHandler,
  [TriggerSource.CreateAuthChallenge]: createAuthChallengeHandler,
  [TriggerSource.VerifyAuthChallengeResponse]: verifyAuthChallengeResponseHandler
};

export function handler(event: AuthTriggerEvent, context: any, callback: Callback): void {
  const handler = triggerMap[event.triggerSource];
  if (handler) {
    handler(event, callback);
  } else {
    callback(null, event);
  }
}

function defineAuthChallengeHandler(
  event: DefineAuthChallengeTriggerEvent,
  callback: Callback
): void {
  if (isChallengePassed(event)) {
    callback(null, toChallengeSuccessEvent(event));
  } else {
    callback(null, toNewChallengeEvent(event));
  }
}

function isChallengePassed(event: DefineAuthChallengeTriggerEvent): boolean {
  const lastChallenge = [...event.request.session].filter(({ challengeName }) =>
    challengeName === ChallengeName.CustomChallenge
  ).pop();
  return Boolean(lastChallenge?.challengeResult)
}

function toChallengeSuccessEvent(
  event: DefineAuthChallengeTriggerEvent
): DefineAuthChallengeTriggerEvent {
  event.response.issueTokens = true;
  event.response.failAuthentication = false;
  event.response.challengeName = '';
  return event;
}

function toNewChallengeEvent(
  event: DefineAuthChallengeTriggerEvent
): DefineAuthChallengeTriggerEvent {
  event.response.issueTokens = false;
  event.response.failAuthentication = false;
  event.response.challengeName = ChallengeName.CustomChallenge;
  return event;
}


function createAuthChallengeHandler(
  event: CreateAuthChallengeTriggerEvent,
  callback: Callback
): void {
  event.response.publicChallengeParameters = {
    [ChallengeParam.Type]: ChallengeType.PasswordLess
  };
  const key = genKey();
  event.response.privateChallengeParameters = {
    [ChallengeParam.Key]: key,
  }
  callback(null, event);
}

function verifyAuthChallengeResponseHandler(
  event: VerifyAuthChallengeResponseTriggerEvent,
  callback: Callback
): void {
  event.response.answerCorrect = isAnswerCorrect(event);
  callback(null, event);
}

function isAnswerCorrect(
  event: VerifyAuthChallengeResponseTriggerEvent
): boolean {
  return event.request.privateChallengeParameters.answer === event.request.challengeAnswer;
}
