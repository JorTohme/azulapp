import {API_URL} from '@env';
import {SECRET} from '@env';
import {getUserSession} from '../Helper';

export default async function deleteAccount() {
  const user: any = await getUserSession();

  return fetch(`${API_URL}/user/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      email: user.email,
      password: user.password,
      origin: SECRET,
    },
  }).then((res) => {
    if (res.status === 400) {
      throw new Error('Bad request');
    }
    if (res.status === 401) {
      throw new Error('Unauthorized');
    }
    console.log(res.status);
    return res.json();
  });
}
