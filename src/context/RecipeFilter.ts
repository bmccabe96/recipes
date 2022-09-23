import { useContext } from 'react';
import createDataContext from './createDataContext';

const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';

const showModal = (dispatch: any) => () => {
  dispatch({
    type: SHOW_MODAL,
    modalVisible: true,
  });
};

const hideModal = (dispatch: any) => () => {
  dispatch({
    type: HIDE_MODAL,
    modalVisible: false,
  });
};

const modalReducer = (state: any, action: any) => {
  switch (action.type) {
    case SHOW_MODAL:
      return { modalVisible: action.modalVisible };
    case HIDE_MODAL:
      return { modalVisible: action.modalVisible };
    default:
      return state;
  }
};

const {
  Context: RecipeFilterContext,
  Provider: RecipeFilterProvider,
} = createDataContext(
  modalReducer,
  { showModal, hideModal },
  { modalVisible: false }
);

const useRecipeFilter = () => {
  const context = useContext(RecipeFilterContext);

  if (context === undefined) {
    throw new Error(
      'useRecipeFilter must be used inside a RecipeFilterProvider'
    );
  }

  return context;
};

export { RecipeFilterProvider, useRecipeFilter };
