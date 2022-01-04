export class AuthResponse {
    token?: string;
    refreshToken?: string;
    provider?: string;
    is2StepVerificationRequired: boolean
}
