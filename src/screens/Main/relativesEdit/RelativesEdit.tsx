import React, {useEffect, useState} from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {Text} from 'atoms/Text';
import useSetting from 'context/SettingsAPI';
import {useRoute} from '@react-navigation/native';
import useRelatives from 'context/RelativesAPI';
import {Spinner} from 'atoms/Spinner';
import {EditRelativeForm} from './organism/';
import {editRelative} from 'typings/editRelative.type';
import capitalizeName from 'utils/capitalization';

export const RelativesEdit = () => {
  const {contactId, listItemId} = useRoute<any>().params;

  const {
    actions: {getRelativeItem, editRelatives},
    state: {relativeItem, relativeItemLoading, editRelativesLoading},
  } = useRelatives();

  useEffect(() => {
    getRelativeItem(listItemId, contactId);
  }, [contactId, getRelativeItem, listItemId]);

  const {
    actions: {getRelations},
    state: {relationList},
  } = useSetting();

  useEffect(() => {
    getRelations();
  }, [getRelations]);

  const [relativeDetails, setRelativeDetails] = useState<any>({});

  useEffect(() => {
    if (relativeItem) {
      setRelativeDetails(relativeItem);
    }
  }, [relativeItem]);

  const initialValues = {
    relation: relativeDetails?.relation?.id,
  };

  const handleSubmit = async (value: editRelative) => {
    const first_contact = relativeDetails?.contact.id;
    const apiData = {
      api_relative: {
        first_contact_id: contactId,
        contact_id: first_contact,
        relation_id: value.relation,
      },
    };
    await editRelatives(listItemId, contactId, apiData);
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="mainBackground">
      <Box bg="mainBackground">
        <Navbar showBack title="edit.relation" />
        <Text
          mt="xxl"
          ml="xl"
          variant="normalText"
          color="black"
          localeId={`Edit ${capitalizeName(
            relativeDetails?.contact?.first_name +
              ' ' +
              relativeDetails?.contact?.last_name,
          )}'s Relation`}
        />
      </Box>
      <Box mx="xl">
        {relativeItemLoading ? (
          // eslint-disable-next-line react-native/no-inline-styles
          <Box style={{height: '100%', justifyContent: 'center'}}>
            <Spinner size={'large'} color={'primary'} />
          </Box>
        ) : (
          <>
            <EditRelativeForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              list={relationList}
              loading={editRelativesLoading}
            />
          </>
        )}
      </Box>
    </Box>
  );
};
