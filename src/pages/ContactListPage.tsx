import React, { useEffect, useState} from 'react';
import {CommonPageProps} from './types';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {FilterForm, FilterFormValues} from 'src/components/FilterForm';
import {ContactDto} from 'src/types/dto/ContactDto';
import { ContactsState } from 'src/redux/contacts/reducer';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { GroupsState } from 'src/redux/groups/reducer';


export const ContactListPage = ((_: CommonPageProps) => {
 
  const [contacts, setContacts] = useState<ContactDto[]>([]);
  const contactsStore: ContactsState =  useAppSelector((state: RootState) => state.contacts);
  const groupsStore: GroupsState =  useAppSelector((state: RootState) => state.groups);

  useEffect(() => {
    if(!contactsStore.loading && !contactsStore.error && contacts.length === 0) {
      setContacts(contactsStore.allContacts)
    }
  }, [contacts, contactsStore])


  if (contactsStore.loading || groupsStore.loading){
    return <div>Загрузка...</div>;
  }   
  if (contactsStore.error){
    return <div>Ошибка загрузки контактов: {contactsStore.error}</div>;
  }   
  if (groupsStore.error){
    return <div>Ошибка загрузки групп: {groupsStore.error}</div>;
  }   


  const onSubmit = (fv: Partial<FilterFormValues>) => {
    let findContacts: ContactDto[] = contactsStore.allContacts;

    if (fv.name) {
      const fvName = fv.name.toLowerCase();
      findContacts = findContacts.filter(({name}) => (
        name.toLowerCase().indexOf(fvName) > -1
      ))
    }

    if (fv.groupId) {
      const groupContacts = groupsStore.allGroups.find(({id}) => id === fv.groupId);

      if (groupContacts) {
        findContacts = findContacts.filter(({id}) => (
          groupContacts.contactIds.includes(id)
        ))
      }
    }

    setContacts(findContacts)
  }

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm groupContactsList={groupsStore.allGroups} initialValues={{}} onSubmit={onSubmit} />
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {contacts.map((contact) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
})
