import { ContactDto } from 'src/types/dto/ContactDto';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { Action } from 'redux';

// Типы экшенов
export enum ContactsActionTypes {
  FETCH_CONTACTS_REQUEST = 'FETCH_CONTACTS_REQUEST',
  FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS',
  FETCH_CONTACTS_FAILURE = 'FETCH_CONTACTS_FAILURE',
}

// Интерфейсы экшенов
export interface FetchContactsRequestAction extends Action{
  type: ContactsActionTypes.FETCH_CONTACTS_REQUEST;
}

export interface FetchContactsSuccessAction extends Action{
  type: ContactsActionTypes.FETCH_CONTACTS_SUCCESS;
  payload: ContactDto[];
}

export interface FetchContactsFailureAction extends Action{
  type: ContactsActionTypes.FETCH_CONTACTS_FAILURE;
  payload: string;
}

export type ContactsAction =
  | FetchContactsRequestAction
  | FetchContactsSuccessAction
  | FetchContactsFailureAction;

// Экшены
export const fetchContactsRequest = (): FetchContactsRequestAction => ({
  type: ContactsActionTypes.FETCH_CONTACTS_REQUEST,
});

export const fetchContactsSuccess = (
  contacts: ContactDto[]
): FetchContactsSuccessAction => ({
  type: ContactsActionTypes.FETCH_CONTACTS_SUCCESS,
  payload: contacts,
});

export const fetchContactsFailure = (
  error: string
): FetchContactsFailureAction => ({
  type: ContactsActionTypes.FETCH_CONTACTS_FAILURE,
  payload: error,
});

// Thunk для загрузки контактов
export const fetchContacts = ():ThunkAction<void, RootState, unknown, ContactsAction> => {
  return async (dispatch) => {
    dispatch(fetchContactsRequest());
    try {
      const response = await fetch('https://mocki.io/v1/285ebe11-815d-41c1-b826-54f137793276');
      if (!response.ok) {
        throw new Error('Ошибка при загрузке контактов');
      }
      const data = await response.json();
      dispatch(fetchContactsSuccess(data));
    } catch (error: any) {
      dispatch(fetchContactsFailure(error.message));
    }
  };
};
