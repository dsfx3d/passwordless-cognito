import { Callback, DefineAuthChallengeTriggerEvent, DefineAuthChallengeTriggerHandler } from "aws-lambda";
import { ChallengeName } from "./ChallengeName";
import { TriggerHandler } from "./TriggerHandler";
import { AuthTriggerEvent } from "./AuthTriggerEvent";

export class DefineOTPChallenge {
  get handler(): TriggerHandler {
    return async (event: AuthTriggerEvent, callback: Callback) => {
      event = event as DefineAuthChallengeTriggerEvent;
      if (this.isChallengeCompleted(event)) {
        callback(null, this.toAuthSuccessEvent(event));
      } else {
        callback(null, this.toNewChallengeEvent(event));
      }
    }
  }

  private isChallengeCompleted(event: DefineAuthChallengeTriggerEvent): boolean {
    const lastChallenge = [...event.request.session].filter(({ challengeName }) =>
      challengeName === ChallengeName.CustomChallenge
    ).pop();
    return Boolean(lastChallenge?.challengeResult)
  }

  private toAuthSuccessEvent(
    event: DefineAuthChallengeTriggerEvent
  ): DefineAuthChallengeTriggerEvent {
    event.response.issueTokens = true;
    event.response.failAuthentication = false;
    event.response.challengeName = '';
    return event;
  }

  private toNewChallengeEvent(
    event: DefineAuthChallengeTriggerEvent
  ): DefineAuthChallengeTriggerEvent {
    event.response.issueTokens = false;
    event.response.failAuthentication = false;
    event.response.challengeName = ChallengeName.CustomChallenge;
    return event;
  }
}
