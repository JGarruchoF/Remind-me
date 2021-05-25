import React from 'react';




export function getReminders(id) {
  return fetch('http://192.168.1.4:4000/api/getReminders/' + id)
    .then((response) => response.json())
    .then((json) => {
      //console.log(json)
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};



export function createReminder(data) {
  console.log(data);
  return fetch('http://192.168.1.4:4000/api/createReminder',
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




export function modifyReminder(id, data) {
  const b = JSON.stringify(data)
  console.log(b);
  return fetch('http://192.168.1.4:4000/api/modifyReminder/' + id,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: b
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


export function removeReminder(id) {
  return fetch('http://192.168.1.4:4000/api/removeReminder/' + id,
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