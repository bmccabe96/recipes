import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ListDetails: React.FC<any> = (props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      {props.data.map((item: any) => {
        return <Text>{'   ' + '-' + ' ' + item}</Text>;
      })}
    </View>
  );
};

export default ListDetails;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
  },
});
