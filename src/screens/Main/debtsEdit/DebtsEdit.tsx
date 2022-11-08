import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import {Navbar} from 'molecules/Navbar';
import {useRoute} from '@react-navigation/native';
import {Spinner} from 'atoms/Spinner';
import {editDebt} from 'typings/editDebt.type';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import {DebtEditForm} from './organism';
import useDebts from 'context/DebtsAPI';

export const DebtsEdit = () => {
  const {listItemId, contactId, fullName} = useRoute<any>().params;

  const {
    actions: {getDebtItem, editDebts},
    state: {debtItem, debtItemLoading, editDebtsLoading},
  } = useDebts();

  useEffect(() => {
    getDebtItem(listItemId, contactId);
  }, [contactId, getDebtItem, listItemId]);

  const handleSubmit = async (values: editDebt) => {
    const data = {
      api_debt: {
        title: values.title,
        amount: values.amount,
        owed_by: values.owed_by === 'true' ? 'you' : 'contact',
        due_date: values.due_date,
      },
    };
    await editDebts(listItemId, contactId, data);
  };

  const initialValues = {
    title: debtItem.title,
    amount: debtItem.amount,
    owed_by: debtItem.owed_by === 'contact' ? 'false' : 'true',
    due_date: debtItem.due_date,
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="lightBackground">
      <Box>
        <Navbar showBack title="edit.debts.title" />
        <TextView
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="black"
          text={`Edit Debt for ${fullName}`}
        />
      </Box>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box
          mx="xl"
          mt={deviceHeight < 780 ? 'ml' : 'xs'}
          justifyContent="flex-end">
          {debtItemLoading ? (
            // eslint-disable-next-line react-native/no-inline-styles
            <Box style={{height: '100%', justifyContent: 'center'}}>
              <Spinner size={'large'} color={'primary'} />
            </Box>
          ) : (
            <DebtEditForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={editDebtsLoading}
              fullName={fullName}
            />
          )}
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
