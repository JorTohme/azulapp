import {useContext} from 'react';
import {StoreContext} from '../store/StoreProvider';
import getTodayOrders from './Connections/getTodayOrders';
import putTablePay from './Connections/putTablePay';
import getSpaces from './Connections/getSpaces';
import putTableFree from './Connections/putTableFree';

function useUpdateOrders(setLoading?) {
  const [store, dispatch] = useContext(StoreContext);

  return () => {
    getTodayOrders().then((orders) => {
      dispatch({
        type: 'SET_ORDERS',
        payload: orders,
      });
    });
  };
}

function useUpdateSpaces(setLoading?) {
  const [store, dispatch] = useContext(StoreContext);

  return () => {
    getSpaces()
      .then((spaces) => {
        dispatch({
          type: 'SET_SPACES',
          payload: spaces,
        });
      })
      .then(() => {
        if (setLoading) {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      });
  };
}

function useUpdateSpecialButtonAction() {
  const [store, dispatch] = useContext(StoreContext);

  return (action) => {
    dispatch({
      type: 'SET_SPECIAL_BUTTON_ACTION',
      payload: action,
    });
  };
}

function usePayTable() {
  return (tableId) => {
    putTablePay(tableId).catch((err) => {
      console.log(err);
    });
  };
}

function useFreeTable() {
  return (tableId) => {
    putTableFree(tableId).catch((err) => {
      console.log(err);
    });
  };
}

export {useFreeTable, usePayTable}; // useOpenTable no existe
export {useUpdateSpaces};
export {useUpdateSpecialButtonAction};
export {useUpdateOrders};
