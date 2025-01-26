
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { Action } from 'redux';
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto';

// Типы экшенов
export enum FavoritesActionTypes {
  FETCH_FAVORITES_REQUEST = 'FETCH_FAVORITES_REQUEST',
  FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS',
  FETCH_FAVORITES_FAILURE = 'FETCH_FAVORITES_FAILURE',
}

// Интерфейсы экшенов
export interface FetchFavoritesRequestAction extends Action{
  type: FavoritesActionTypes.FETCH_FAVORITES_REQUEST;
}

export interface FetchFavoritesSuccessAction extends Action{
  type: FavoritesActionTypes.FETCH_FAVORITES_SUCCESS;
  payload: FavoriteContactsDto;
}

export interface FetchFavoritesFailureAction extends Action{
  type: FavoritesActionTypes.FETCH_FAVORITES_FAILURE;
  payload: string;
}

export type FavoritesAction =
  | FetchFavoritesRequestAction
  | FetchFavoritesSuccessAction
  | FetchFavoritesFailureAction;

// Экшены
export const fetchFavoritesRequest = (): FetchFavoritesRequestAction => ({
  type: FavoritesActionTypes.FETCH_FAVORITES_REQUEST,
});

export const fetchFavoritesSuccess = (
  favorites: FavoriteContactsDto
): FetchFavoritesSuccessAction => ({
  type: FavoritesActionTypes.FETCH_FAVORITES_SUCCESS,
  payload: favorites,
});

export const fetchFavoritesFailure = (
  error: string
): FetchFavoritesFailureAction => ({
  type: FavoritesActionTypes.FETCH_FAVORITES_FAILURE,
  payload: error,
});

// Thunk для загрузки избранных
export const fetchFavorites = ():ThunkAction<void, RootState, unknown, FavoritesAction> => {
  return async (dispatch) => {
    dispatch(fetchFavoritesRequest());
    try {
      const response = await fetch('https://mocki.io/v1/285ebe11-815d-41c1-b826-54f137793276');
      if (!response.ok) {
        throw new Error('Ошибка при загрузке избранных');
      }
      const data = await response.json();
      const favorites:FavoriteContactsDto = [
        data[0].id,
        data[1].id,
        data[2].id,
        data[3].id,
        data[4].id,
      ];
      dispatch(fetchFavoritesSuccess(favorites));
    } catch (error: any) {
      dispatch(fetchFavoritesFailure(error.message));
    }
  };
};
