import { Button, StyleSheet, View, TextInput } from 'react-native';
import React, { useState } from 'react';

const RecipeListItemAdder: React.FC<any> = ({
  data,
  setListItemData,
  listType,
}) => {
  const [newData, setNewData] = useState<string[]>(data);

  return (
    <View>
      {newData.map((item: string, index: number) => {
        return (
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
});
