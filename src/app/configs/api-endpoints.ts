import { environment } from 'src/environments/environment';

export const baseUrl = environment.apiUrl + '/api';

export const authenticationUrl = baseUrl + '/Authentication/';
export const registerUrl = authenticationUrl + 'registration';
export const loginUrl = authenticationUrl + 'login';
export const refreshTokenUrl = authenticationUrl + 'refresh-token';
export const logoutUrl = authenticationUrl + 'logout';
export const twoStepVerificationUrl = authenticationUrl + 'login-two-step';

export const workspaceUrl = baseUrl + '/Workspace/';
export const addworkspacetUrl = workspaceUrl + 'workspace';
export const getUserWorkspaceList = workspaceUrl + 'workspaces';
export const answerInviteUserUrl = workspaceUrl + 'invite';
export const userWorkspaceInfoUrl = workspaceUrl + 'workspace';
export const updateWorkspaceUrl = workspaceUrl + 'workspace';
export const getWorkspaceUsersUrl = workspaceUrl + 'workspaces';
export const inviteUser = workspaceUrl + 'invite';
export const changeWorkspaceRoleUrl = workspaceUrl + 'role';

export const userUrl = baseUrl + '/User/';
export const userProfileUrl = userUrl + 'info';
export const userInviteList = userUrl + 'invites';
export const activeInvitesUrl = userUrl + 'active-invite';
export const sendConfirmEmailUrl = userUrl + 'confirm-email';
export const confirmEmailUrl = userUrl + 'confirm-email';
export const changeUserInfoUrl = userUrl + 'info';
export const checkIsTwoFactorVerificationUrl = userUrl + 'two-factor-auntification/enable';
export const change2fUrl = userUrl + 'two-factor-auntification/enable';
export const sendTwoFactorCodeUrl = userUrl + 'two-factor-auntification/code';
export const userImageUrl = userUrl + 'image';

export const taskUrl = baseUrl + '/Task/';
export const addTaskUrl = taskUrl + 'task';
export const getTaskStatuses = taskUrl + 'statuses';
export const getTaskWorkerRoles = taskUrl + 'roles';
