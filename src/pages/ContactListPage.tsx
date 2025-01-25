import React, { useEffect, useState} from 'react';
import {CommonPageProps} from './types';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {FilterForm, FilterFormValues} from 'src/components/FilterForm';
import {ContactDto} from 'src/types/dto/ContactDto';
import { ContactsState } from 'src/redux/contacts/reducer';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';


export const ContactListPage = (({
  groupContactsState
}: CommonPageProps) => {
 
  const [contacts, setContacts] = useState<ContactDto[]>([]);
  const contactsStore: ContactsState =  useAppSelector((state: RootState) => state.contacts);

  useEffect(() => {
    if(!contactsStore.loading && !contactsStore.error && contacts.length === 0) {
      setContacts(contactsStore.allContacts)
    }
  }, [contacts, contactsStore])


  if (contactsStore.loading){
    return <div>Загрузка...</div>;
  }   

  if (contactsStore.error){
    return <div>Ошибка загрузки...</div>;
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
      const groupContacts = groupContactsState[0].find(({id}) => id === fv.groupId);

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
        <FilterForm groupContactsList={groupContactsState[0]} initialValues={{}} onSubmit={onSubmit} />
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
