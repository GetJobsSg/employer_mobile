import { ICurrentUserInfo } from './slice/types';
import { ICurrentUserInfoResponse } from './apis/types';

export const authTransformer = {
  toState(user: ICurrentUserInfoResponse): ICurrentUserInfo {
    return {
      email: user.data.first_name || '',
      firstName: user.data.first_name || '',
      lastName: user.data.first_name || '',
      company: {
        id: String(user.data.id) || '',
        name: user.data.first_name || '',
        primaryContact: user.data.first_name || '',
        logoImage: user.data.first_name || null,
      },
      accessLevel: {
        id: String(user.data.id) || '',
        name: user.data.first_name || '',
      },
    };
  },
};
