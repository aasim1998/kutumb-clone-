export type ArchivedContactProps = {
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
   success: boolean;
   message: string;
};

export type RestoreContactProps = {
   archived: boolean;
   archived_on: string;
   id: number;
   phone: string;
   email: string;
   first_name: string;
   last_name: string;
   birthday: string;
   address: string;
   about: string;
   user_id: number;
   account_id: number;
   created_at: string;
   updated_at: string;
   relation_id: number;
   success: boolean;
   message: string;
};