import { IAuthInitialState } from './types';

const authInitialState: IAuthInitialState = {
  isLoadingLogin: false,
  isLoadingLogout: false,

  accessToken: null,
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
};

export default authInitialState;
