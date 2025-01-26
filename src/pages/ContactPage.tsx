import React, {FC} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';

import {ContactCard} from 'src/components/ContactCard';
import {Empty} from 'src/components/Empty';

import { useAppSelector } from 'src/redux/hooks';

export const ContactPage: FC = () => {
  const {contactId} = useParams<{ contactId: string }>();
  const contactsStore = useAppSelector(state => state.contacts);

  if (contactsStore.loading ){
    return <div>Загрузка...</div>;
  }   
  if (contactsStore.error){
    return <div>Ошибка загрузки контактов: {contactsStore.error}</div>;
  }
  const contact = contactsStore.allContacts.find(({id}) => id === contactId);


  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
};
