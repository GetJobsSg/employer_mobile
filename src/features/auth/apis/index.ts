import { get } from 'src/utils/network';
import { ICurrentUserInfoResponse } from 'src/features/auth/apis/types';

export const getProfile = (): Promise<ICurrentUserInfoResponse> => get('/web/profile').then((res) => res.data);
