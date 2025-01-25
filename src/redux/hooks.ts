import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";

import { ThunkDispatch } from "redux-thunk";

import { RootState } from "./store";
import { AnyAction } from 'redux';
import { useEffect } from 'react';
import { fetchContacts } from './contacts/actions';
import { fetchGroups } from './groups/actions';

export const useAppDispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppStore = useStore<RootState>;


// Хук для инициализации приложения
export const useInitializeApp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Загрузка данных контактов и групп для стора
    dispatch(fetchContacts());
    dispatch(fetchGroups());
  }, [dispatch]);
};
