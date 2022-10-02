import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, { useState } from 'react';
import { useRecipes } from '../context/Recipes';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const DeleteModal: React.FC<any> = ({
  modalVisible,
  setModalVisible,
  recipe,
  navigation,
}) => {
  const { recipesDelete } = useRecipes();

  if (!modalVisible) {
    return null;
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{ ...styles.modalText, fontStyle: 'italic' }}
            >
              Are you sure you want to delete this recipe?
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                recipesDelete(recipe.id);
                navigation.navigate('Recipes');
              }}
            >
              <Text
                style={{
                  ...styles.modalText,
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                Yes, delete this recipe
              </Text>
            </TouchableOpacity>
            <Button
              title="Cancel"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    shadowColor: '#000',
    width: width * 0.95,
    height: height / 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingVertical: 10,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export default DeleteModal;
