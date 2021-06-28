import * as React from 'react';
import {ActivityIndicator, FlatList} from 'react-native';

import {useTrendingRepositories} from '../../Contexts/TrendingRepositories';
import TrendingListItem from './ListItem';
import {EActionKind} from '../../Types/TrendingRepositoriesContext';
import {ITrendingListItem} from '../../Types/TrendingList';

const TrendingList: React.FC = () => {
  const [context, dispatchContext] = useTrendingRepositories();

  const handleRefresh = (): void => {
    dispatchContext({
      type: EActionKind.retry,
    });
  };

  const keyExtractor = (item: ITrendingListItem): string => String(item.id);

  const renderItem = ({
    item,
  }: {
    item: ITrendingListItem;
  }): React.ReactElement => <TrendingListItem item={item} />;

  if (context.error) return null;

  return (
    <FlatList
      ListEmptyComponent={<ActivityIndicator />}
      data={context.data}
      keyExtractor={keyExtractor}
      refreshing={context.loading}
      onRefresh={handleRefresh}
      renderItem={renderItem}
    />
  );
};

export default TrendingList;
