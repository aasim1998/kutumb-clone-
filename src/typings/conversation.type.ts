import {ContactFieldTypesProps} from './contactFieldTypes.type';

export type ConversationProps = {
  id: number;
  body: string;
  contact_id: number;
  user_id: number;
  field_id: number;
  date: string;
  created_at: string;
  updated_at: string;
  field: ContactFieldTypesProps;
};
