export type Eventable = {
   id: number;
   email: string;
   first_name: string;
   last_name: string;
   phone: string;
   birthday: string;
   address: string;
   about: string;
   user_id: number;
   account_id: number;
   created_at: string;
   updated_at: string;
   archived: boolean;
   archived_on: string;
   relation_id: number;
}

export type Trackable = {
   id: number;
   title: string;
   amount?: string;
   owed_by?: string;
   body?: string;
   contact_id: number;
   user_id: number;
   due_date: string;
   created_at: string;
   updated_at: string;
   completed?: boolean;
}

export type HomeTimelineProps = {
   id: number;
   user_id: number;
   action: string;
   created_at: string;
   updated_at: string;
   action_for_context: string;
   trackable_id: number;
   trackable_type: string;
   eventable_id: number;
   eventable_type: string;
   account_id: number;
   action_context: string;
   eventable?: Eventable;
   trackable?: Trackable;
};
