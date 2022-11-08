import React from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {Navbar} from 'molecules/Navbar';
import {addNewDebtsType} from 'typings/addNewDebt.type';
import {useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import {DebtAddForm} from './organism';
import useDebts from 'context/DebtsAPI';

export const DebtsAdd = () => {
  const {
    actions: {addDebts},
    state: {addDebtsLoading},
  } = useDebts();

  const {contactId, fullName} = useRoute<any>().params;

  const handleSubmit = async (value: addNewDebtsType) => {
    const data = {
      api_debt: {
        title: value.title,
        amount: value.amount,
        owed_by: value.owed_by === 'true' ? 'you' : 'contact',
        due_date: value.due_date,
      },
    };
    await addDebts(contactId, data);
  };

  const initialValues = {
    title: '',
    amount: '',
    owed_by: '',
    due_date: '',
  };
  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="add.new.debts" />
        <TextView
          mt="xxl"
          mx="xl"
          variant="normalText"
          text="add.new.debts.subtitle"
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          <DebtAddForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={addDebtsLoading}
            fullName={fullName}
          />
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
