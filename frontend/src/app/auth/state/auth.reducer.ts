import { createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../../models';
import { State } from '../../state';
import * as authActions from './auth.actions';

export interface AuthState {
  accessToken: string;
  user: User;
  isAuthenticated: boolean;
  authenticating: boolean;
}

export const initialState: AuthState = {
  accessToken: '',
  authenticating: false,
  isAuthenticated: false,
  user: { id: '', userName: '', avatarUrl: '', email: '' },
};

export const authReducer = createReducer(
  initialState,
  on(authActions.loginSuccess, (state, action) => {
    const { accessToken, ...user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      accessToken,
      user: { ...state.user, ...user },
    };
  }),

  on(authActions.authenticate, (state) => ({
    ...state,
    authenticating: true,
  })),
  on(authActions.authenticateSuccess, (state, action) => {
    const { accessToken, ...user } = action.payload;

    return {
      ...state,
      authenticating: false,
      isAuthenticated: true,
      accessToken,
      user: { ...state.user, ...user },
    };
  }),

  on(authActions.logoutSuccess, (state) => ({ ...initialState }))
);

export const selectAuth = (state: State) => state.auth;
export const selectAuthenticating = createSelector(
  selectAuth,
  (state) => state.authenticating
);
export const selectAuthStatus = createSelector(
  selectAuth,
  (state) => state.isAuthenticated
);
export const selectAuthUser = createSelector(selectAuth, (state) => state.user);
export const selectAuthAccessToken = createSelector(
  selectAuth,
  (state) => state.accessToken
);
