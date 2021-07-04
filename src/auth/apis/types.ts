export interface ICurrentUserInfoResponse {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    date_updated: string;
    date_created: string;
    company: {
      id: number;
      name: string;
      desc: string;
      primary_contact: string;
      logo_img: string;
      date_updated: string;
      date_created: string;
    };
    access_level: {
      id: number;
      name: string;
      date_updated: string;
      date_created: string;
    };
  };
}
