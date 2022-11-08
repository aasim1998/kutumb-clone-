export type RelativeContact = {
   id: number,
   email: string,
   first_name: string,
   last_name: string,
   phone: string,
   birthday: string,
   address: string,
   about: string,
   user_id: number,
   account_id: number,
   created_at: string,
   updated_at: string,
   archived: boolean,
   archived_on: string,
   relation_id: number,
}

export type RelativeFirstContact = {
   id: number,
   email: string,
   first_name: string,
   last_name: string,
   phone: string,
   birthday: string,
   address: string,
   about: string,
   user_id: number,
   account_id: number,
   created_at: string,
   updated_at: string,
   archived: boolean,
   archived_on: string,
   relation_id: number,
}

export type RelativeRelation = {
   id: number,
   name: string,
   account_id: number,
   created_at: string,
   updated_at: string,
}

export type RelativesProps = {
   id: number,
   name: string,
   account_id: number,
   created_at: string,
   updated_at: string,
   first_contact_id: number,
   relation_id: number,
   contact_id: number,
   contact: RelativeContact,
   first_contact: RelativeFirstContact,
   relation: RelativeRelation,
}