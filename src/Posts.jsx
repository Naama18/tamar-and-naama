
import React from 'react'

import { useState, useEffect } from 'react'

export default function Posts() {
    const current= JSON.parse(localStorage.getItem("currentUser"));
    const id=current.id;
    useEffect(() => {
        async function getPosts(url) {
            try {
                let response = await fetch(url);
                if (!response.ok) throw Error("Did not recived expected data")
                let data = await response.json();
            console.log(data)
               
            }
            catch (error) {
                alert(error)
            }

        };
        (async () => await getPosts(`http://localhost:3500/posts/${id}`))()

    }, [])
      return (
 <></>
  )
}