import { createStore, applyMiddleware, combineReducers, AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import {contactsReducer,  ContactsState } from './contacts/reducer';
import { groupsReducer, GroupsState } from './groups/reducer';
import { favoritesReducer, FavoritesState } from './favorites/reducer';


export interface RootReducer {
  contacts: ContactsState;
  groups: GroupsState;
  favorites: FavoritesState;
}


export const rootReducer = combineReducers<RootReducer>({
  contacts: contactsReducer,
  groups: groupsReducer,
  favorites: favoritesReducer
});

//export type RootState = ReturnType<typeof rootReducer>;

export type RootState = {
   contacts: ContactsState;
   groups: GroupsState;
   favorites: FavoritesState;
};

export const store = createStore(rootReducer, applyMiddleware(thunk));


export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
