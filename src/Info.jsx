import React from "react";

export default function Info() {
  let current = JSON.parse(localStorage.getItem("currentUser"));
  let name = current.name;
  let email = current.email;
  let phone = current.phone;
  let adress = current.address.city;
  return (
    <div>
      <h2>more information:</h2>
      <div className="info">
        <p> <strong>full name: </strong>{name}</p>
        <p><strong>email: </strong> {email}</p>
        <p><strong>phone: </strong> {phone}</p>
        <p><strong> city: </strong> {adress}</p>
      </div>
    </div>
  );
}
