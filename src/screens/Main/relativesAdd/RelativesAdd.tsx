import React, {useEffect, useState} from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {FlatList} from 'react-native';
import {Touch} from 'atoms/Touch';
import capitalizeName from 'utils/capitalization';
import {Text} from 'atoms/Text';
import useSetting from 'context/SettingsAPI';
import {AddRelativeForm} from './organism';
import {addNewRelationType} from 'typings/addNewRelation.type';
import {useRoute} from '@react-navigation/native';
import useRelatives from 'context/RelativesAPI';
import {TextInput} from 'atoms/TextInput';
import {isIOS} from 'utils/device';

export const RelativesAdd = () => {
  const {
    actions: {getRelativesContact, addRelatives},
    state: {addRelativesLoading, relativeContactList},
  } = useRelatives();

  const {
    actions: {getRelations},
    state: {relationList},
  } = useSetting();

  useEffect(() => {
    getRelations();
  }, [getRelations]);

  const {contactId} = useRoute<any>().params;
  const [data, setData] = useState<any>({});
  const [searchValue, setSearchValue] = useState('');
  const [selectedContact, setSelectedContact] = useState('');
  const [firstContactId, setFirstContactId] = useState(0);

  useEffect(() => {
    if (relativeContactList.length !== 0) {
      setData(relativeContactList);
    }
  }, [relativeContactList]);

  const searchFunction = (text: string) => {
    setSearchValue(text);
    getRelativesContact(contactId, text);
  };

  const renderItems = ({item}) => {
    return (
      <Touch
        onPress={() => {
          setSelectedContact(`${item.first_name} ${item.last_name}`);
          setSearchValue('');
          setFirstContactId(item.id);
        }}>
        <Text
          mb="m"
          variant="text_Base"
          localeId={capitalizeName(item.first_name + ' ' + item.last_name)}
        />
      </Touch>
    );
  };

  const initialValues = {
    relation: '',
  };

  const handleSubmit = async (value: addNewRelationType) => {
    const apiData = {
      api_relative: {
        first_contact_id: contactId,
        contact_id: firstContactId,
        relation_id: value.relation,
      },
    };
    await addRelatives(contactId, apiData);
  };

  return (
    <Box height="100%" pt={'m'} flex={1} backgroundColor="mainBackground">
      <Box bg="mainBackground" mb={isIOS ? 'l' : 's'}>
        <Navbar showBack title="add.new.relation" />
      </Box>
      <Box mx="xl" mt="bm">
        {selectedContact.length === 0 && (
          <>
            <Text localeId={'search.add.relation'} variant="text_Base" mb="s" />
            <TextInput
              autoFocus={false}
              value={searchValue}
              autoCorrect={false}
              rightIcon={searchValue.length > 0 ? 'cancel' : undefined}
              onRightIconPress={() => {
                setSearchValue('');
                setData({});
              }}
              onChangeText={(text: string) => searchFunction(text)}
            />
          </>
        )}
        {searchValue.length > 0 && (
          <Box mt="-s" mb="l">
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              renderItem={v => renderItems(v)}
            />
          </Box>
        )}
        {selectedContact.length > 0 && (
          <>
            <Text
              variant="text_Base"
              mb="m"
              localeId={`Select ${capitalizeName(selectedContact)}'s relation`}
            />
            <Text variant="text_Base" mb="m" localeId="select.relation" />
            <AddRelativeForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              list={relationList}
              loading={addRelativesLoading}
            />
          </>
        )}
      </Box>
    </Box>
  );
};
