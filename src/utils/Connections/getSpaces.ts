import {getUserSession} from '../Helper';

export default async function getSpaces() {
  const user: any = await getUserSession();

  return fetch('http://192.168.1.94:3000/spaces/tables', {
    method: 'GET',
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
