import React, {FC, useEffect} from 'react';
import {CommonPageProps} from './types';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';

import {ContactCard} from 'src/components/ContactCard';
import {Empty} from 'src/components/Empty';

import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { fetchContacts } from 'src/redux/contacts/actions';
import { AppDispatch } from 'src/redux/store';


export const ContactPage: FC<CommonPageProps> = ({
  contactsState
}) => {
  const {contactId} = useParams<{ contactId: string }>();

  const dispatch: AppDispatch = useAppDispatch();
  const { allContacts, loading, error } = useAppSelector(state => state.contacts);

  const contact = allContacts?.find(({id}) => id === contactId);

  useEffect(() => {
    if (loading ||error) {
    dispatch(fetchContacts());
    }
  }, );

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
};
