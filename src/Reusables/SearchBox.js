import React from 'react';
import {Searchbar} from 'react-native-paper';

export default function SearchBox({props}) {
  const onChangeSearch = query => {
    props.onSearchChange(query);
  };
  return <Searchbar placeholder="Search" onChangeText={onChangeSearch} />;
}
