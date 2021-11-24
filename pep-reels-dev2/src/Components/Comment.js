import React,{useState,useEffect} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import {database} from '../firebase'
import Avatar from '@mui/material/Avatar';


function Comment({postData}) {
    const [comments, setComment] = useState(null)
    useEffect(async() => {
        let arr = [ ]
        for(let i = 0; i< postData.comments.length;i++){
            let data = await database.comments.doc(postData.comments[i]).get()
            arr.push(data.data())
        }
        setComment(arr)

    }, [postData])

    return (
        <div >
            {
                comments == null ? <CircularProgress />:
                <>
                {
                    comments.map((comment,index) => (
                        <div style={{display:'flex'}}>
                            <Avatar src = {comment.uProfileImage} />
                            <p><span style={{fontWeight:'bold'}}>{comment.uName}</span>&nbsp;&nbsp; {comment.text}</p>
                        </div>
                    ))
                }

                </>
            }
            
        </div>
    )
}

export default Comment
