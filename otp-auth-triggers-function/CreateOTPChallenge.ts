import { SES, SendEmailRequest } from "@aws-sdk/client-ses";
import { Callback, CreateAuthChallengeTriggerEvent } from "aws-lambda";
import { ChallengeParam } from "./ChallengeParam";
import { ChallengeType } from "./ChallengeType";
import { genOTP } from "./genOTP";
import { TriggerHandler } from "./TriggerHandler";
import { EnvVar } from "./EnvVar";

export class CreateOTPChallenge {
  constructor(private ses: SES) { }

  get handler(): TriggerHandler {
    return async (event: CreateAuthChallengeTriggerEvent, callback: Callback) => {
      const otp = genOTP();
      await this.sendEmail(event.request.userAttributes.email, otp);
      callback(null, this.toOTPChallengeEvent(event, otp));
    }
  }

  private async sendEmail(email: string, otp: string): Promise<void> {
    const params: SendEmailRequest = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: {
            Data: `Your login code is ${otp}`,
          },
        },
        Subject: {
          Data: "Your login code",
        },
      },
      Source: process.env[EnvVar.ChallengerEmail],
    };
    await this.ses.sendEmail(params);
  }

  private toOTPChallengeEvent(
    event: CreateAuthChallengeTriggerEvent,
    otp: string
  ): CreateAuthChallengeTriggerEvent {
    event.response.publicChallengeParameters = {
      [ChallengeParam.Type]: ChallengeType.OTP
    };
    event.response.privateChallengeParameters = {
      [ChallengeParam.OTP]: otp,
    }
    return event;
  }
}
