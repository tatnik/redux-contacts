import React, {FC} from 'react';
import {CommonPageProps} from './types';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';

import {ContactCard} from 'src/components/ContactCard';
import {Empty} from 'src/components/Empty';

import { useAppSelector } from 'src/redux/hooks';

export const ContactPage: FC<CommonPageProps> = ({
  contactsState
}) => {
  const {contactId} = useParams<{ contactId: string }>();
  const { allContacts} = useAppSelector(state => state.contacts);

  const contact = allContacts?.find(({id}) => id === contactId);


  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
};
