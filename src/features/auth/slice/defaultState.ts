import { IAuthInitialState } from './types';

const authInitialState: IAuthInitialState = {
  isLoadingLogin: false,
  isLoadingLogout: false,
  isLoadingSendResetPasswordEmail: false,
  isLoadingSetCurrentUser: false,
  isLoadingChangePassword: false,

  accessToken: '',
  isAuthenticated: false,

  user: {
    email: '',
    firstName: '',
    lastName: '',
    company: {
      id: '',
      name: '',
      primaryContact: '',
      logoImage: '',
    },
    accessLevel: {
      id: '',
      name: '',
    },
  },

  error: null,
  errorResetPassword: null,
  errorChangePassword: null,
};

export default authInitialState;
