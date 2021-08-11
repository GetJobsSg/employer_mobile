import { getAge } from 'src/utils/dateTime';
import { ParticpantResponse } from './apis/types';
import { IParticipant } from './slice/types';

export const participantsTransformer = {
  toState(data: ParticpantResponse[]): IParticipant[] {
    if (!data) return [];
    return data.map((p) => ({
      id: p.id,
      profileImage: p.employee.profile_img,
      name: `${p.employee.first_name} ${p.employee.last_name}` || '',
      gender: p.employee.gender || '',
      age: getAge(p.employee.dob) || 0,
      mobile: p.employee.mobile || '',
      ratings: p.rating ? String(p.rating.toFixed(2)) : '',
    }));
  },
};
