import React from "react";

export default function Info() {
  let current = JSON.parse(localStorage.getItem("currentUser"));

  let name = current.name;

  let email = current.email;
  let phone = current.phone;
  let adress = current.address.city;
  return (
    <div>
      <h1>more information:</h1>
      <ul>
        <li> full name: {name}</li>
        <li>email: {email}</li>
        <li>phone: {phone}</li>
        <li> city: {adress}</li>
      </ul>
    </div>
  );
}
