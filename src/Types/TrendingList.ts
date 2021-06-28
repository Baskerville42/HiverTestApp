export interface ITrendingListItem {
  id: string;
  full_name: string;
  name: string;
  description: string;
  html_url: string;
  language: string;
  forks: string;
  stargazers_count: string;
  owner: {
    html_url: string;
    avatar_url: string;
    login: string;
  };
}

export type TTrendingListItemProps = {
  item: ITrendingListItem;
};
