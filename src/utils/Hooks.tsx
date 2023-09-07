import {useContext} from 'react';
import {StoreContext} from '../store/StoreProvider';
import getTodayOrders from './Connections/getTodayOrders';
import putTablePay from './Connections/putTablePay';
import getSpaces from './Connections/getSpaces';

function useUpdateOrders() {
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
    getSpaces().then((spaces) => {
      dispatch({
        type: 'SET_SPACES',
        payload: spaces,
      });

      if (setLoading) {
        setLoading(false);
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
  const updateOrders = useUpdateOrders();
  return (tableId) => {
    putTablePay(tableId)
      .then(() => {
        updateOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export {useUpdateSpaces};
export {usePayTable};
export {useUpdateSpecialButtonAction};
export {useUpdateOrders};
