import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const MainDetail: React.FC<any> = (props): JSX.Element => {
  return (
    <View style={styles.row}>
      <Text style={styles.key}>{props.fieldName + ':      '}</Text>
      <Text style={styles.value}>{props.fieldValue}</Text>
    </View>
  );
};

export default MainDetail;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  key: {
    color: 'grey',
  },
  value: {
    position: 'absolute',
    left: 125,
  },
});
