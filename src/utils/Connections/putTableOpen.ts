import {API_URL} from '@env';
import {getUserSession} from '../Helper';

export default async function putTableOpen(tableData) {
  const user: any = await getUserSession();
  return fetch(`${API_URL}/tables/open/${tableData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      email: user.email,
      password: user.password,
    },
    body: JSON.stringify(tableData),
  })
    .then((res) => {
      if (res.status === 400) {
        throw new Error('Bad request');
      }
      return res.json();
    })
    .catch((err) => console.log(err));
}
