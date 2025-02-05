import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import { GroupsState } from 'src/redux/groups/reducer';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';

export const GroupListPage = (() => {
  const groupsStore: GroupsState =  useAppSelector((state: RootState) => state.groups);
  if (groupsStore.loading){
    return <div>Загрузка...</div>;
  }   
  if (groupsStore.error){
    return <div>Ошибка загрузки групп: {groupsStore.error}</div>;
  }  

  return (
    <Row xxl={4}>
      {groupsStore.allGroups.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});
