import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { Action } from 'redux';

// Типы экшенов
export enum GroupsActionTypes {
  FETCH_GROUPS_REQUEST = 'FETCH_GROUPS_REQUEST',
  FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS',
  FETCH_GROUPS_FAILURE = 'FETCH_GROUPS_FAILURE',
}

// Интерфейсы экшенов
export interface FetchGroupsRequestAction extends Action{
  type: GroupsActionTypes.FETCH_GROUPS_REQUEST;
}

export interface FetchGroupsSuccessAction extends Action{
  type: GroupsActionTypes.FETCH_GROUPS_SUCCESS;
  payload: GroupContactsDto[];
}

export interface FetchGroupsFailureAction extends Action{
  type: GroupsActionTypes.FETCH_GROUPS_FAILURE;
  payload: string;
}

export type GroupsAction =
  | FetchGroupsRequestAction
  | FetchGroupsSuccessAction
  | FetchGroupsFailureAction;

// Экшены
export const fetchGroupsRequest = (): FetchGroupsRequestAction => ({
  type: GroupsActionTypes.FETCH_GROUPS_REQUEST,
});

export const fetchGroupsSuccess = (
  contacts: GroupContactsDto[]
): FetchGroupsSuccessAction => ({
  type: GroupsActionTypes.FETCH_GROUPS_SUCCESS,
  payload: contacts,
});

export const fetchGroupsFailure = (
  error: string
): FetchGroupsFailureAction => ({
  type: GroupsActionTypes.FETCH_GROUPS_FAILURE,
  payload: error,
});

// Thunk для загрузки контактов
export const fetchGroups = ():ThunkAction<void, RootState, unknown, GroupsAction> => {
  return async (dispatch) => {
    dispatch(fetchGroupsRequest());
    try {
      const response = await fetch('https://mocki.io/v1/');
      if (!response.ok) {
        throw new Error('Ошибка при загрузке групп контактов');
      }
      const data = await response.json();
      dispatch(fetchGroupsSuccess(data as GroupContactsDto[]));
    } catch (error: any) {
      dispatch(fetchGroupsFailure(error.message));
    }
  };
};
