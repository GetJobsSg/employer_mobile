export interface ICurrentUserInfo {
  email: string;
  firstName: string;
  lastName: string;
  company: {
    id: string;
    name: string;
    primaryContact: string;
    logoImage: string | null;
  };
  accessLevel: {
    id: string;
    name: string;
  };
}

export interface IAuthInitialState {
  isLoadingLogin: boolean;
  isLoadingLogout: boolean;
  isLoadingSetCurrentUser: boolean;

  accessToken: string | null;
  isAuthenticated: boolean;

  user: ICurrentUserInfo;
  error: any | null;
}
