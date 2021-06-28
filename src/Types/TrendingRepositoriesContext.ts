import * as React from 'react';

import {ITrendingListItem} from './TrendingList';

export enum EActionKind {
  request = 'TRENDING_LIST_REQUEST',
  retry = 'TRENDING_LIST_RETRY',
  searchQuery = 'TRENDING_LIST_SEARCH_QUERY',
  expandItem = 'TRENDING_LIST_EXPAND_ITEM',
}

export type TReducerState = {
  data: ITrendingListItem[];
  loading: boolean;
  error: any;
  searchQuery: string;
  expandedId: number | null;
  retry: boolean;
};

export type TRequestAction = {
  type: EActionKind.request;
  payload: {
    data: ITrendingListItem[];
    loading: boolean;
    error: any;
  };
};

export type TRetryAction = {
  type: EActionKind.retry;
};

export type TSearchAction = {
  type: EActionKind.searchQuery;
  payload: string;
};

export type TExpandAction = {
  type: EActionKind.expandItem;
  payload: null | number;
};

export type TReducerAction =
  | TRequestAction
  | TSearchAction
  | TExpandAction
  | TRetryAction;

export type TContextType = [TReducerState, React.Dispatch<TReducerAction>];
