import { Callback, VerifyAuthChallengeResponseTriggerEvent } from "aws-lambda";
import { TriggerHandler } from "./TriggerHandler";
import { ChallengeParam } from "./ChallengeParam";
import { AuthTriggerEvent } from "./AuthTriggerEvent";

export class VerifyOTPChallenge {
  get handler(): TriggerHandler {
    return async (event: AuthTriggerEvent, callback: Callback) =>
      callback(null, this.toVerifiedEvent(event))
  }

  private toVerifiedEvent(event: AuthTriggerEvent): VerifyAuthChallengeResponseTriggerEvent {
    event = event as VerifyAuthChallengeResponseTriggerEvent;
    event.response.answerCorrect = this.isAnswerCorrect(event);
    return event;
  }

  private isAnswerCorrect(
    event: VerifyAuthChallengeResponseTriggerEvent
  ): boolean {
    const otp = event.request.privateChallengeParameters[ChallengeParam.OTP];
    return otp === event.request.challengeAnswer;
  }
}
