import React, {memo, useEffect, useState} from 'react';
import {CommonPageProps} from './types';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {FilterForm, FilterFormValues} from 'src/components/FilterForm';
import {ContactDto} from 'src/types/dto/ContactDto';
import { fetchContacts } from 'src/redux/contacts/actions';
import { AppDispatch, RootState } from 'src/redux/store';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';


export const ContactListPage = memo<CommonPageProps>(({
  contactsState, groupContactsState
}) => {
 
// +
  const dispatch: AppDispatch = useAppDispatch();
  
  const {allContacts, loading, error} = useAppSelector((state: RootState) => state.contacts);

  const [contacts, setContacts] = useState<ContactDto[]>(allContacts)
  

  useEffect(() => {
    if (loading ||error) {
      dispatch(fetchContacts());
    }
  }, );
//



  const onSubmit = (fv: Partial<FilterFormValues>) => {
    let findContacts: ContactDto[] = contacts;

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
