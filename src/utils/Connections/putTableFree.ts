import {API_URL} from '@env';
import {getUserSession} from '../Helper';

export default async function putTableFree(tableID) {
  const user: any = await getUserSession();
  return fetch(`${API_URL}/tables/free/${tableID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      email: user.email,
      password: user.password,
    },
  })
    .then((res) => {
      if (res.status === 400) {
        throw new Error('Bad request');
      }
      return res.json();
    })
    .catch((err) => console.log(err));
}
