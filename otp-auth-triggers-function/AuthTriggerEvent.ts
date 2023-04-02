import {
  CreateAuthChallengeTriggerEvent,
  DefineAuthChallengeTriggerEvent,
  VerifyAuthChallengeResponseTriggerEvent
} from 'aws-lambda';

export type AuthTriggerEvent = CreateAuthChallengeTriggerEvent |
  DefineAuthChallengeTriggerEvent |
  VerifyAuthChallengeResponseTriggerEvent;
