import { environment } from 'src/environments/environment';

export const baseUrl = environment.apiUrl + '/api';

export const authenticationServiceUrl = baseUrl + '/Authentication/';
export const registrationUrl = authenticationServiceUrl + 'registration';
export const loginUrl = authenticationServiceUrl + 'login';
export const refreshTokenUrl = authenticationServiceUrl + 'refresh-token';
export const logoutUrl = authenticationServiceUrl + 'logout';
export const twoStepVerificationUrl = authenticationServiceUrl + 'login-two-step';
export const passwordUrl = authenticationServiceUrl + 'password';

export const workspaceServiceUrl = baseUrl + '/Workspace/';
export const workspaceUrl = workspaceServiceUrl + 'workspace';
export const workspacesUrl = workspaceServiceUrl + 'workspaces';
export const inviteUrl = workspaceServiceUrl + 'invite';
export const changeWorkspaceRoleUrl = workspaceServiceUrl + 'role';
export const workspaceRolesUrl = workspaceServiceUrl + 'roles';

export const userServiceUrl = baseUrl + '/User/';
export const infoUrl = userServiceUrl + 'info';
export const invitesUrl = userServiceUrl + 'invites';
export const activeInviteUrl = userServiceUrl + 'active-invite';
export const confirmEmailUrl = userServiceUrl + 'confirm-email';
export const twoFactorVerificationUrl = userServiceUrl + 'two-factor-auntification/enable';
export const twoFactorCodeUrl = userServiceUrl + 'two-factor-auntification/code';
export const imageUrl = userServiceUrl + 'image';
export const userpasswordUrl = userServiceUrl + 'password';

export const taskServiceUrl = baseUrl + '/Task/';
export const taskUrl = taskServiceUrl + 'task';
export const statusesUrl = taskServiceUrl + 'statuses';
export const rolesUrl = taskServiceUrl + 'roles';

export const commentServiceUrl = baseUrl + '/Comment/';

export const assignUrl = taskServiceUrl + 'assign';
export const changeRoleUrl = taskServiceUrl + 'change-role';

export const sprintServiceUrl = baseUrl + '/Sprint';

