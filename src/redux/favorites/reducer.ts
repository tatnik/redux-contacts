
import { FavoritesAction, FavoritesActionTypes } from './actions';
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto';
//import {AnyAction} from 'redux';

// Тип состояния редьюсера
export interface FavoritesState {
  loading: boolean;
  allFavorites: FavoriteContactsDto;
  error: string | null;
}

// Начальное состояние
export const initialState:FavoritesState = {
  loading: false,
  allFavorites: [],
  error: null
};

// Редьюсер
export const favoritesReducer = (
  state: FavoritesState = initialState, 
  action: FavoritesAction
): FavoritesState => {
  
    switch(action.type) {
    case FavoritesActionTypes.FETCH_FAVORITES_REQUEST:
      return {...state, loading: true}
    case FavoritesActionTypes.FETCH_FAVORITES_SUCCESS:
      return {
        loading: false,
        allFavorites: action.payload,
        error: null
      };
    case FavoritesActionTypes.FETCH_FAVORITES_FAILURE:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};
