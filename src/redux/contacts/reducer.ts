import { ContactDto } from 'src/types/dto/ContactDto';
import { ContactsAction, ContactsActionTypes } from './actions';
//import {AnyAction} from 'redux';

// Тип состояния редьюсера
export interface ContactsState {
  loading: boolean;
  allContacts: ContactDto[];
  error: string | null;
}

// Начальное состояние
export const initialState:ContactsState = {
  loading: false,
  allContacts: [],
  error: null
};

// Редьюсер
export const contactsReducer = (
  state: ContactsState = initialState, 
  action: ContactsAction
): ContactsState => {
  
    switch(action.type) {
    case ContactsActionTypes.FETCH_CONTACTS_REQUEST:
      return {...state, loading: true}
    case ContactsActionTypes.FETCH_CONTACTS_SUCCESS:
      return {
        loading: false,
        allContacts: action.payload,
        error: null
      };
    case ContactsActionTypes.FETCH_CONTACTS_FAILURE:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};
