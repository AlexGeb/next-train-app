import React, { Component } from 'react';
import { Input, styled } from '@smooth-ui/core-sc';
import { observer, inject } from 'mobx-react';
import Autocomplete from 'react-autocomplete';

import { styles } from '../styles';
import { Status } from '../enums';

type PropsType = {
  searchStationStore?: ISearchStationStore;
  departureStore?: IDepartureStore;
};

const Header = styled.div`
  align-items: center;
  background-color: rgb(255, 255, 255);
  display: flex;
  height: 50px;
  justify-content: center;
  padding: 0px ${styles.sidePadding}px;
`;

const CustomInput = styled(Input)`
  background-color: #f1f3f4;
  border: none;
  border-radius: 22px;
  padding: 0px 14px;
  height: 35px;
  width: 560px;
  &:hover {
    background-color: rgb(232, 234, 237);
  }
  &:focus {
    box-shadow: none;
  }
`;

@inject((rootStore: IRootStore) => ({
  searchStationStore: rootStore.searchStationStore,
  departureStore: rootStore.departureStore,
}))
@observer
export class SearchStations extends Component<PropsType> {
  renderItem = (item: ISearchResult, isHighlighted: boolean) => (
    <div
      key={item.id}
      style={{ background: isHighlighted ? 'lightgray' : 'white' }}
    >
      {item.name}
    </div>
  );

  renderInput = (props: React.HTMLProps<HTMLInputElement>) => (
    <CustomInput {...props} placeholder="Rechercher une gare de départ" />
  );

  render() {
    const { searchStationStore, departureStore } = this.props;
    if (!searchStationStore || !departureStore) return null;
    const { results, query, search, status, error } = searchStationStore;
    const { select } = departureStore;
    let items = results.length > 0 ? results : [];
    if (status === Status.PENDING) {
      items = [{ name: 'loading...', id: '' }];
    }
    if (status === Status.ERROR) {
      items = [{ name: error, id: '' }];
    }
    return (
      <Header>
        <Autocomplete
          getItemValue={(item: ISearchResult) => item.name}
          items={items}
          renderItem={this.renderItem}
          renderInput={this.renderInput}
          value={query}
          onChange={e => search(e.target.value)}
          onSelect={(value, item: ISearchResult) => select(item)}
          isItemSelectable={(item: ISearchResult) => item.id.length > 0}
        />
      </Header>
    );
  }
}

export default SearchStations;
