import {CommonPageProps} from './types';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import {Empty} from 'src/components/Empty';
import {ContactCard} from 'src/components/ContactCard';
import { ContactsState } from 'src/redux/contacts/reducer';
import { GroupsState } from 'src/redux/groups/reducer';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';

export const GroupPage = (_ :CommonPageProps) => {
  const {groupId} = useParams<{ groupId: string }>();

  const contactsStore: ContactsState =  useAppSelector((state: RootState) => state.contacts);
  const groupsStore: GroupsState =  useAppSelector((state: RootState) => state.groups);

  if (contactsStore.loading || groupsStore.loading){
    return <div>Загрузка...</div>;
  }   
  if (contactsStore.error){
    return <div>Ошибка загрузки контактов: {contactsStore.error}</div>;
  }   
  if (groupsStore.error){
    return <div>Ошибка загрузки групп: {groupsStore.error}</div>;
  }

  const findGroup = groupsStore.allGroups.find(({id}) => id === groupId);
  if (!findGroup) {
      return <div>Группа не найдена</div>;
  }  
     
  const findContacts = contactsStore.allContacts.filter(({id}) => (findGroup.contactIds.includes(id)));

  return (
    <Row className="g-4">
      {findGroup ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                <GroupContactsCard groupContacts={findGroup} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row xxl={4} className="g-4">
              {findContacts.map((contact) => (
                <Col key={contact.id}>
                  <ContactCard contact={contact} withLink />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : <Empty />}
    </Row>
  );
};
