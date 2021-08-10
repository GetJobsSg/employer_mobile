import { ICurrentUserInfo } from './slice/types';
import { ICurrentUserInfoResponse } from './apis/types';

export const authTransformer = {
  toState(user: ICurrentUserInfoResponse): ICurrentUserInfo {
    return {
      email: user.data.email || '',
      firstName: user.data.first_name || '',
      lastName: user.data.last_name || '',
      company: {
        id: user.data.company.id || '',
        name: user.data.company.name || '',
        primaryContact: user.data.company.primary_contact || '',
        logoImage: user.data.company.logo_img || null,
      },
      accessLevel: {
        id: user.data.access_level.id || '',
        name: user.data.access_level.name || '',
      },
    };
  },
};
