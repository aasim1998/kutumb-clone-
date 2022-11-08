/* eslint-disable prettier/prettier */
export enum ITEM_TRACKABLE_TYPE {
   CONTACT = 'Contact',
   NOTE = 'Note',
   TASK = 'Task',
   JOURNAL = 'Journal',
   PHONE_CALL = 'PhoneCall',
   RELATIVE = 'Relative',
   GIFT = 'Gift',
   DEBT = 'Debt',
}

export enum ITEM_ACTION_FOR_CONTEXT {
   ADDED_NEW_CONTACT = 'added new contact',
   UNARCHIVED_CONTACT = 'unarchived contact',
   ADDED_NOTE = 'added a note for',
   ADDED_TASK = 'added a task for',
   ADDED_JOURNAL = 'added a journal',
   ADDED_PHONE_CALL = 'added a phone call for',
   ADDED_RELATIVE = 'added a relative for',
   ADDED_GIFT = 'added a gift for',
   ADDED_DEBT = 'added a debt for',
}

export enum ITEM_ACTION_CONTEXT {
   ADDED_NOTE = 'Added note',
   ADDED_TASK = 'Added task',
   ADDED_PHONE_CALL = 'Added phone call',
   ADDED_RELATIVE = 'Added relative',
   ADDED_GIFT = 'Added gift',
   ADDED_DEBT = 'Added debt',
}
