import {useContext} from 'react';
import {StoreContext} from '../store/StoreProvider';
import getTodayOrders from './Connections/getTodayOrders';
import putTablePay from './Connections/putTablePay';
import getSpaces from './Connections/getSpaces';
import putTableFree from './Connections/putTableFree';

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
        // wait 1 sec
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
  const updateOrders = useUpdateOrders();
  const updateSpaces = useUpdateSpaces();
  return (tableId) => {
    putTablePay(tableId)
      .then(() => {
        updateOrders();
        updateSpaces();
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

function useFreeTable() {
  const updateSpaces = useUpdateSpaces();
  return (tableId) => {
    putTableFree(tableId)
      .then(() => {
        updateSpaces();
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export {useFreeTable};
export {useUpdateSpaces};
export {usePayTable};
export {useUpdateSpecialButtonAction};
export {useUpdateOrders};
