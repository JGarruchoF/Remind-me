import { AsyncStorage } from 'react-native';

const IP = '192.168.1.4';

export function getUser(id) {
    return  fetch('http://'+IP+':4000/api/getUser/'+id)
      .then((response) => response.json())
      .then((json) => {
          //console.log(json)
        return json;
      })
      .catch((error) => {
        console.error(error);
      });

  };


  export function getUsers(){
    return fetch('http://'+IP+':4000/api/getUsers/')
      .then((response) => response.json())
      .then((json) => {
          //console.log(json)
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };




  export function createUser(data) {
    //console.log(data);
    return fetch('http://'+IP+':4000/api/createUser',
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // 'access-token': window.localStorage.token
       },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((json) => {
        //console.log(json)
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  export function login(username, password) {
    return fetch('http://'+IP+':4000/api/login',
    {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
     },
      body: JSON.stringify({
        'userName':username,
        'password':password
      })
    })
    .then((response) =>response.json())
    .then((json) => {
      // console.log(json)
      AsyncStorage.setItem(
        'token',
       json.token
      );      
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
  }
  