import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

export default (
  reducer: any,
  actions: any,
  defaultState: Object[] | unknown
) => {
  const Context = React.createContext<any>(null);

  const Provider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const boundActions: any = {};

    for (const key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  Provider.propTypes = {
    children: PropTypes.element.isRequired,
  };

  return { Context, Provider };
};
