import { environment } from 'src/environments/environment';

export const baseUrl = environment.apiUrl + '/api';

export const registerUrl = baseUrl + '/Authentication/Register';
export const loginUrl = baseUrl + '/Authentication/Login';
