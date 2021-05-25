import React from 'react';



export function getUser(id) {
    return  fetch('http://192.168.1.4:4000/api/getUser/'+id)
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
    return fetch('http://192.168.1.4:4000/api/getUsers/')
      .then((response) => response.json())
      .then((json) => {
          //console.log(json)
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  