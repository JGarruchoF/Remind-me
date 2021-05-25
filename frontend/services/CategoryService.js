import React from 'react';


const IP = '192.168.1.4';

export function getCategories(id) {
  return fetch('http://192.168.1.4:4000/api/getCategories/' + id)
    .then((response) => response.json())
    .then((json) => {
      //console.log(json)
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};


export function createCategory(data) {

  return fetch('http://'+IP+':4000/api/createCategory',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};


export function modifyCategory(id, data) {
  console.log(data)

  return fetch('http://'+IP+':4000/api/modifyCategory/' + id,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then((response) => response.text())
    .then((json) => {
      console.log(json)
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};


export function removeCategory(id) {
  return fetch('http://'+IP+':4000/api/removeCategory/' + id,
    {
      method: 'DELETE'
    })
    .then((response) => response.text())
    .then((json) => {
      console.log(json)
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};