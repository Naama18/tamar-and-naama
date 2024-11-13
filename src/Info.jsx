
import React from 'react'

export default function Info() {

    let current = JSON.parse(localStorage.getItem("currentUser"))
    console.log('current: ', current);
    
    let name = current.name;
    console.log('name: ', name);

    let email = current.email;
    console.log('email: ', email);
    let phone = current.phone;
    console.log('phone: ', phone);
    let adress = current.address.city;
    console.log('adress: ', adress);
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
