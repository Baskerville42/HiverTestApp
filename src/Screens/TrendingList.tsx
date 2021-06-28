import * as React from 'react';

import TrendingRepositoriesProvider from '../Contexts/TrendingRepositories';
import TrendingListHeader from '../Components/TrendingList/Header';
import ErrorMessage from '../Components/TrendingList/ErrorMessage';
import TrendingList from '../Components/TrendingList/TrendingList';

const TrendingListScreen: React.FC = () => {
  return (
    <TrendingRepositoriesProvider>
      <TrendingListHeader />
      <ErrorMessage />
      <TrendingList />
    </TrendingRepositoriesProvider>
  );
};

export default TrendingListScreen;
