import {CommonPageProps} from './types';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { ContactsState } from 'src/redux/contacts/reducer';
import { FavoritesState } from 'src/redux/favorites/reducer';

export const FavoritListPage = ((_ : CommonPageProps) => {

  const contactsStore: ContactsState =  useAppSelector((state: RootState) => state.contacts);
  const favoritesStore: FavoritesState =  useAppSelector((state: RootState) => state.favorites);

  if (contactsStore.loading || favoritesStore.loading){
    return <div>Загрузка...</div>;
  }   
  if (contactsStore.error){
    return <div>Ошибка загрузки контактов: {contactsStore.error}</div>;
  }   
  if (favoritesStore.error){
    return <div>Ошибка загрузки избранных: {favoritesStore.error}</div>;
  }   
  const contacts = contactsStore.allContacts.filter(({id}) => favoritesStore.allFavorites.includes(id))

  return (
    <Row xxl={4} className="g-4">
      {contacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
})
