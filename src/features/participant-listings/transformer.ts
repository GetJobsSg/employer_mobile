import { getAge } from 'src/utils/dateTime';
import { ParticpantResponse } from './apis/types';
import { IParticipant } from './slice/types';

export const participantsTransformer = {
  toState(data: ParticpantResponse[]): IParticipant[] {
    if (!data) return [];
    return data.map((p) => ({
      id: String(p.id),
      profileImage: p.employee.profile_img,
      name: `${p.employee.first_name} ${p.employee.last_name}` || '',
      gender: p.employee.gender || '',
      age: `${getAge(p.employee.dob)} yrs old`,
      ratings: p.rating ? String(p.rating.toFixed(2)) : '',
    }));
  },
};
