import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {PressEvent} from 'typings/utils';

export type DateTimePickerProps = {
  visible: boolean;
  mode?: 'date' | 'time' | 'datetime';
  onCancel: PressEvent;
  getDateTime: (date: Date) => void;
  initialDate?: Date;
  minimumDate?: 'today' | Date;
  maximumDate?: 'today' | Date;
};

export const DateTimePicker = ({
  initialDate,
  visible,
  mode,
  onCancel,
  getDateTime,
  maximumDate,
  minimumDate,
}: DateTimePickerProps) => {
  return (
    <DateTimePickerModal
      isVisible={visible}
      mode={mode}
      date={initialDate ? initialDate : new Date()}
      maximumDate={maximumDate === 'today' ? new Date() : maximumDate}
      onConfirm={getDateTime}
      onCancel={onCancel}
      minimumDate={minimumDate ? new Date() : minimumDate}
    />
  );
};

DateTimePicker.defaultProps = {
  mode: 'date',
};
