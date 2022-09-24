import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native';
import React from 'react';
import { useRecipeFilter } from '../context/RecipeFilter';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const RecipesFilter: React.FC<any> = (props) => {
  const { hideModal } = useRecipeFilter();
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed');
          hideModal();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Filter by a category:
            </Text>
            <View>
              <Button
                title={'All'}
                onPress={() => props.filterRecipes('all')}
              />
              {props.categories.map((item: any) => {
                return (
                  <Button
                    title={item}
                    onPress={() => props.filterRecipes(item)}
                  />
                );
              })}
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => hideModal()}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RecipesFilter;

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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
