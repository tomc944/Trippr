import AppDispatcher from '../dispatcher/dispatcher';
import SearchConstants from '../constants/search_constants';
import PostUtil from '../util/post_util';

const SearchActions = {
  fetchAllSearches: () => {
    PostUtil.fetchAllSearches(SearchActions.receiveAllSearches);
  },
  receiveAllSearches: (searches) => {
    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_ALL_SEARCHES,
      searches: searches
    })
  }
};

export default SearchActions;
