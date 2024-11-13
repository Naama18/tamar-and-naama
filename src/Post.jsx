import React, { useState, useEffect } from 'react'

export default function Post(props) {
    const [body, setBody] = useState("");
    const [data, setData] = useState([]);
    const [showComments, setShowComments]=useState(false);
    const [addComment,setAddComment]=useState(false)
    const [username, setUserNmae]=useState("")
    const [newcomment, setnewcomment]=useState("")
    const [submited, setSubmited]=useState(false)
    console.log(data)
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
        (async () => await getPosts(`http://localhost:3500/comments?postId=${props.post.id}`))()

    }, [])
    function DeletePost() {
        let array = props.arr;
        const newArray = array.filter(item => item.id !== props.post.id);
        props.setArr(newArray);
        fetch(`http://localhost:3500/posts/${props.post.id}`, {method:"DELETE",})
        .then((response)=>{
            if(response.ok){
                console.log("post deleted from database");

            }
            else{
                throw new Error ("failed to delete")
            }
        
        })
        .catch((error)=>console.log(error))
    }
    function submitAddComment(event){
        event.preventDefault()
        let obj = {"postId":parseInt(props.post.id), "id": (Math.floor(Math.random() * (10000 - 10) + 10)).toString(), "name": username, "body": newcomment }
       setData(prev => [...prev, obj]);

       setAddComment(false);
       
       fetch('http://localhost:3500/comments', {
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
    function DeleteComment(idcomment, comment) {
        console.log('comment: ', comment);

        console.log(idcomment)
        let array = data;
        const newArray = array.filter(item => item.id !== idcomment);
        console.log('newArray: ', newArray);
        
        setData(newArray);
        fetch(`http://localhost:3500/comments/${idcomment}`, {method:"DELETE"})
        .then((response)=>{
            if(response.ok){
                console.log("comment deleted from database");

            }
            else{
                throw new Error ("failed to delete")
            }
        
        })
        .catch((error)=>console.log(error))
    }

    return (
        <div>

            <p>id: {props.post.id}</p>
            <p>title: {props.post.title}</p>
            <button onClick={() => setBody(props.post.body)}>Content</button>
            <button onClick={DeletePost}>DELETE</button>
            <button onClick={()=>setShowComments(true)}>Show Comments</button>
            <button onClick={()=>setAddComment(true)}>Add Comment</button>
             {addComment&&
             <div>
                           <form onSubmit={submitAddComment}>
                           <label>Enter username:
                               <input
                                   type="text"
                                   value={username}
                                   onChange={(e) => {
                                    setUserNmae(e.target.value)
                                    }}
                                    />
                           </label>
                           <label>Enter Comment:
                               <input
                                   type="text"
                                   value={newcomment}
                                   onChange={(e) => {
                                    setnewcomment(e.target.value)
                                    }}
                                    
                                    />
                           </label>
                           <input type="submit" />
                       </form>
                     
                       </div>
                    }
                      {showComments&&
                       data.map((comment)=>
                       <div>
                         <span><strong>username: </strong>"{comment.name}" <strong>comment: </strong></span>
                        <span>{comment.body}</span>
                        <span><button onClick={()=>DeleteComment(comment.id, comment)}>Delet Comment</button></span>
                        </div> 
                   )}

            <p>{body}</p>
        </div>
    )
}
