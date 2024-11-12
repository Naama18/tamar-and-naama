
import React from 'react'

export default function Info() {

    let current = JSON.parse(localStorage.getItem("currrentUser"))
    let name = current.name;
    console.log('name: ', name);

    let email = current.email;
    console.log('email: ', email);
    let phone = current.phone;
    console.log('phone: ', phone);
    let adress = current.address;
    console.log('adress: ', adress);
    return (
        <div>
            <h1>more information about: {name}</h1>
            <ul>
                <li>email: {email}</li>
                <li>phone: {phone}</li>
                <li> adress: {adress}</li>
            </ul>
        </div>
    );

}
