import { environment } from 'src/environments/environment';

export const baseUrl = environment.apiUrl + '/api';

export const registerUrl = baseUrl + '/Authentication/registration';
export const loginUrl = baseUrl + '/Authentication/login';
export const refreshTokenUrl = baseUrl + '/Authentication/refreshToken';
export const logoutUrl = baseUrl + '/Authentication/logout';
export const twoStepVerificationUrl = baseUrl + '/Authentication/logintwostep';

export const addworkspacetUrl = baseUrl + '/Workspace/addworkspace';
export const getUserWorkspaceList = baseUrl + '/Workspace/getworlspacelist';
export const answerInviteUserUrl = baseUrl + '/Workspace/invite';
export const getWorkspaceUsersUrl = baseUrl + '/Workspace/workspace'
export const deleteUserFromWorkspaseUrl = baseUrl + '/Workspace'
export const userWorkspaceInfoUrl = baseUrl + '/Workspace/getworkspace/'
export const inviteUser = baseUrl + '/Workspace/inviteuser';
export const workspaceActiveInvite = baseUrl + '/Workspace/';
export const changeWorkspaceRoleUrl = baseUrl + '/Workspace/changerole';

export const userProfileUrl = baseUrl + '/User/getpersonalinfo';
export const userInviteList = baseUrl + '/User/invite';
export const activeInvitesUrl = baseUrl + '/User/activeinvite';
export const sendConfirmEmailUrl = baseUrl + '/User/sendconfirmmail';
export const confirmEmailUrl = baseUrl + '/User/confirmemail';
export const changeUserInfoUrl = baseUrl + '/User/changeinfo';
export const checkIsTwoFactorVerificationUrl = baseUrl + '/User/checkistwofactor';
export const change2fUrl = baseUrl + '/User/change2fastatus';
export const sendTwoFactorCodeUrl = baseUrl + '/User/sendtwofactorcode';

export const userImageUrl = baseUrl + '/User/image';

export const addTaskUrl = baseUrl + '/Task/addtask';
