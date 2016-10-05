import AppDispatcher from '../dispatcher/dispatcher';
import { Store } from 'flux/utils';
import SearchConstants from '../constants/search_constants';

const SearchStore = new Store(AppDispatcher);

let _searchTitles = [];

SearchStore.__onDispatch = (payload) => {
  switch(payload.actionType) {
    case SearchConstants.RECEIVE_ALL_SEARCHES:
      _receiveAllSearches(payload.searches);
      SearchStore.__emitChange();
      break;
  }
}

SearchStore.allTitles = () => {
  return _searchTitles.slice();
}

const _receiveAllSearches = (searches) => {
  _searchTitles = searches;
}

export default SearchStore;
