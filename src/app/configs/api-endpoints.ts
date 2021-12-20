import { environment } from 'src/environments/environment';

export const baseUrl = environment.apiUrl + '/api';

export const registerUrl = baseUrl + '/Authentication/registration';
export const loginUrl = baseUrl + '/Authentication/login';
export const refreshTokenUrl = baseUrl + '/Authentication/refreshToken';
export const logoutUrl = baseUrl + '/Authentication/logout';

export const addworkspacetUrl = baseUrl + '/Workspace/addworkspace';
export const getUserWorkspaceList = baseUrl + '/Workspace/getworlspacelist';

export const userProfileUrl = baseUrl + '/User/getpersonalinfo';

