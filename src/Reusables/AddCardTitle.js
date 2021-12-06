import * as React from 'react';
import {Avatar, Card} from 'react-native-paper';
export default function AppCardTitle(props) {
  return (
    <Card.Title
      title={props?.title}
      subtitle={props?.subtitle}
      left={propsData => <Avatar.Icon {...propsData} icon={props?.icon} />}
    />
  );
}
