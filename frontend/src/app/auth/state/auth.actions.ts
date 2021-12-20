import { createAction, props } from '@ngrx/store';
import { User } from '../../models';

export const authenticate = createAction('[Auth] Authenticate');
export const authenticateSuccess = createAction(
  '[Auth] Authenticate success',
  props<{ payload: User & { accessToken: string } }>()
);

export const loginSuccess = createAction(
  '[Auth] Login success',
  props<{ payload: User & { accessToken: string } }>()
);

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout success');
