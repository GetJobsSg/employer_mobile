export interface ICurrentUserInfo {
  email: string;
  firstName: string;
  lastName: string;
  company: {
    id: number | '';
    name: string;
    primaryContact: string;
    logoImage: string | null;
  };
  accessLevel: {
    id: number | '';
    name: string;
  };
}

export interface IAuthInitialState {
  isLoadingLogin: boolean;
  isLoadingLogout: boolean;
  isLoadingSendResetPasswordEmail: boolean;
  isLoadingSetCurrentUser: boolean;
  isLoadingChangePassword: boolean;

  accessToken: string | null;
  isAuthenticated: boolean;

  user: ICurrentUserInfo;

  error: any | null;
  errorResetPassword: any | null;
  errorChangePassword: any | null;
}
