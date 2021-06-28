import * as React from 'react';
import useAxios from 'axios-hooks';

import {
  EActionKind,
  TContextType,
  TReducerAction,
  TReducerState,
} from '../Types/TrendingRepositoriesContext';
import useDebounce from '../Utils/Hooks/useDebbounce';
import {ITrendingListItem} from '../Types/TrendingList';

const initialState: TReducerState = {
  data: [],
  retry: false,
  loading: false,
  error: null,
  searchQuery: '',
  expandedId: null,
};

const initialContext: TContextType = [initialState, () => {}];

const reducer = (
  state: TReducerState,
  action: TReducerAction,
): TReducerState => {
  switch (action.type) {
    case EActionKind.request:
      return {
        ...state,
        ...action.payload,
      };
    case EActionKind.searchQuery:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case EActionKind.expandItem:
      return {
        ...state,
        expandedId: action.payload,
      };
    case EActionKind.retry:
      return {
        ...state,
        retry: !state.retry,
      };
    default:
      return state;
  }
};

export const TrendingRepositoriesContext =
  React.createContext<TContextType>(initialContext);

const TrendingRepositoriesProvider: React.FC = ({children}) => {
  const [state, dispatchState] = React.useReducer<
    React.Reducer<TReducerState, TReducerAction>
  >(reducer, initialState);
  const value = React.useMemo<[TReducerState, React.Dispatch<TReducerAction>]>(
    () => [state, dispatchState],
    [state],
  );

  const debouncedSearch = useDebounce<string>(state.searchQuery, 500);

  const query: string = debouncedSearch
    ? `${debouncedSearch} in:name,description`
    : 'trending';

  const [{data, loading, error}, refetch] = useAxios<{
    items: ITrendingListItem[];
  }>(
    {
      url: 'https://api.github.com/search/repositories',
      params: {
        q: query,
        per_page: 20,
        sort: 'stars',
        order: 'desc',
      },
    },
    {
      manual: true,
    },
  );

  React.useEffect(() => {
    dispatchState({
      type: EActionKind.request,
      payload: {
        data: data?.items || [],
        loading,
        error,
      },
    });
  }, [data, error]);

  React.useEffect(() => {
    if (state.retry) {
      (async (): Promise<void> => {
        await refetch();
        dispatchState({
          type: EActionKind.retry,
        });
      })();
    }
  }, [state.retry]);

  React.useEffect(() => {
    refetch();
  }, [debouncedSearch]);

  return (
    <TrendingRepositoriesContext.Provider value={value}>
      {children}
    </TrendingRepositoriesContext.Provider>
  );
};

export const useTrendingRepositories = (): TContextType =>
  React.useContext<TContextType>(TrendingRepositoriesContext);

export default TrendingRepositoriesProvider;
