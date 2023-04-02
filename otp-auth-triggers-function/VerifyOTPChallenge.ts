import { Callback, VerifyAuthChallengeResponseTriggerEvent } from "aws-lambda";
import { TriggerHandler } from "./TriggerHandler";
import { ChallengeParam } from "./ChallengeParam";

export class VerifyOTPChallenge {
  get handler(): TriggerHandler {
    return async (
      event: VerifyAuthChallengeResponseTriggerEvent,
      callback: Callback
    ) => callback(null, this.toVerifiedEvent(event))
  }

  private toVerifiedEvent(
    event: VerifyAuthChallengeResponseTriggerEvent
  ): VerifyAuthChallengeResponseTriggerEvent {
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
