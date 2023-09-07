import {useContext} from 'react';
import {StoreContext} from '../store/StoreProvider';
import getTodayOrders from './Connections/getTodayOrders';

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

export {useUpdateOrders};
