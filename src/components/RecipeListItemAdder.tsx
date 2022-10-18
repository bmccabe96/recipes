import {
  Button,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';

const RecipeListItemAdder: React.FC<any> = ({
  data,
  setListItemData,
  listType,
}) => {
  const [newData, setNewData] = useState<string[]>(data);

  return (
    <View style={styles.container}>
      {newData.map((item: string, index: number) => {
        return (
          <View style={styles.row}>
            <TextInput
              placeholder={`${listType}`}
              style={styles.input}
              value={newData[index]}
              onChangeText={(text) => {
                const updated = [
                  ...newData.slice(0, index),
                  text,
                  ...newData.slice(index + 1),
                ];
                setNewData(updated);
                setListItemData(updated, listType);
              }}
            />
            <TouchableOpacity
              style={styles.delete}
              onPress={() => {
                const updated = [
                  ...newData.slice(0, index),
                  ...newData.slice(index + 1),
                ];
                setNewData(updated);
                setListItemData(updated, listType);
              }}
            >
              <Feather name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        );
      })}

      <Button
        title="Add another"
        onPress={() => {
          setNewData([...newData, '']);
          setListItemData(newData, listType);
        }}
      />
    </View>
  );
};

export default RecipeListItemAdder;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    width: 250,
    borderRadius: 4,
    borderColor: 'blue',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  delete: {
    position: 'absolute',
    right: 10,
  },
});
