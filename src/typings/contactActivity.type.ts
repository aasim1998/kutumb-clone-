import {AccountActivitiesProps} from './accountActivities.type';

export type ContactActivityProps = {
  id: number;
  title: string;
  body: string;
  date: string;
  activity_id: number;
  contact_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  activity: AccountActivitiesProps;
};
