export type LifeEvent = {
  id: number;
  name: string;
  account_id: number;
  group_id: number;
  created_at: string;
  updated_at: string;
  default: boolean;
};

export type ContactEventProps = {
  id: number;
  title: string;
  body: string;
  date: string;
  life_event_id: number;
  contact_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  life_event: LifeEvent;
};
