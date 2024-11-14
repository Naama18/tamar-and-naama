
import React from 'react'

import { useState, useEffect } from 'react'
import Post from './Post'

export default function Posts() {
    const [title, setTitle] = useState("");
    const [bodynew, setBodynew] = useState("")
    const [data, setData] = useState([]);//posts
    const [add, setAdd] = useState(false)
    const current = JSON.parse(localStorage.getItem("currentUser"));
    const userId = current.id;
    useEffect(() => {
        async function getPosts(url) {
            try {
                let response = await fetch(url);
                if (!response.ok) throw Error("Did not recived expected data")
                setData(await response.json());

            }
            catch (error) {
                alert(error)
            }

        };
        (async () => await getPosts(`http://localhost:3500/posts?userId=${userId}`))()

    }, [])
    function AddPost(event) {
        event.preventDefault()
        let obj = {"userId":userId, "id": Math.floor(Math.random() * (10000 - 10) + 10), "title": title, "body": bodynew }
       setData(prev => [...prev, obj]);

       setAdd(false);
       
       fetch('http://localhost:3500/posts', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error posting data:', error));

    }
    return (
        <>
        <h2>Your Posts:</h2>
            <button onClick={()=>setAdd(true)}>ADD POST</button>
            {add &&
                <form onSubmit={AddPost}>
                    <label>Enter title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                        />
                    </label>
                    <label>Enter body:
                        <input
                            type="text"
                            value={bodynew}
                            onChange={(e) => {
                                setBodynew(e.target.value)
                            }}
                          
                        />
                    </label>
                    <input type="submit" />
                </form>
            }
            {data.map((post, i) => {return <Post post={post} i={i} arr={data} setArr={setData} key={post.id} />
}
            )}

        </>
    );
}