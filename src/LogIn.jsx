
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function LogIn() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usersArray, setUsersArray] = useState([])
    useEffect(() => {
        async function checkLogIn(url) {
            try {
                let response = await fetch(url);
                if (!response.ok) throw Error("Did not recived expected data")
                let data = await response.json();
                setUsersArray(data);
            }
            catch (error) {
                alert(error)
            }

        };
        (async () => await checkLogIn("http://localhost:3500/users"))()

    }, [])

    function handleSubmit(event) {
        event.preventDefault();
        console.log(usersArray)
        console.log("submit")
        let exist=false;
        for (let i = 0; i < usersArray.length; i++) {

            console.log('usersArray[i].website: ', usersArray[i].website);
            console.log('usersArray[i].username: ', usersArray[i].username);
            console.log('password: ', password);
            console.log('username: ', username);
            if (username === usersArray[i].username && password === usersArray[i].website) {
                console.log("in")
                localStorage.setItem("currentUser", JSON.stringify(usersArray[i]));
                exist=true;


            }
        }
        if (!exist) {
            alert("שם משתמש או סיסמא שגויים")
        }
        else {
            alert("נכנס בצלחה")
            navigate("/Home");
        }
      
        
    }

    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Enter username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        required
                    />
                </label>
                <label>Enter password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        required
                    />
                </label>
                <input type="submit" />
            </form>

        </>
    )
}

