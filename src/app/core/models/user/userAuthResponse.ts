export class UserAuthResponse {
    token?: string;
    refreshToken?: string;
    provider: string;
    is2StepVerificationRequired: boolean
}
