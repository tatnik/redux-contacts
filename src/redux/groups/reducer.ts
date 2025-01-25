import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { GroupsAction, GroupsActionTypes } from './actions';
//import {AnyAction} from 'redux';

// Тип состояния редьюсера
export interface GroupsState {
  loading: boolean;
  allGroups: GroupContactsDto[];
  error: string | null;
}

// Начальное состояние
export const initialState:GroupsState = {
  loading: false,
  allGroups: [],
  error: null
};

// Редьюсер
export const groupsReducer = (
  state: GroupsState = initialState, 
  action: GroupsAction
): GroupsState => {
  
    switch(action.type) {
    case GroupsActionTypes.FETCH_GROUPS_REQUEST:
      return {...state, loading: true}
    case GroupsActionTypes.FETCH_GROUPS_SUCCESS:
      return {
        loading: false,
        allGroups: action.payload,
        error: null
      };
    case GroupsActionTypes.FETCH_GROUPS_FAILURE:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};
