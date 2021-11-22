import React from 'react'
import {useState,useEffect} from 'react'
import {database} from '../firebase'
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Video from './Video';
import './Post.css'
import Like from './Like'



function Post({userData}) {
    console.log('post',userData);
    const [posts, setPost] = useState(null)
    useEffect(() => {
        let parr = []
        const unsub = database.posts.orderBy('createdAt','desc').onSnapshot((querySnapshot)=> {
            parr= []
            querySnapshot.forEach((doc) => {
                let data = {...doc.data(),postId:doc.id}
                parr.push(data)
            })

            setPost(parr)

        })
        return unsub
    }, [])



    return (
        <div>
            {

                posts == null || userData == null ? <CircularProgress /> : 
                <div className="video-container">
                    { 
                        posts.map((post,index) => (

                            <React.Fragment key={index}>
                                <div className='video'>
                                 <Video src = {post.pUrl}/>
                                 <div className='fa' style={{display:'flex'}}>
                                     <Avatar  src={userData.profileUrl} />
                                    <h4>{userData.fullname}</h4>
                                    <Like userData={userData} postData= {post}/>

                                 </div>
                            </div>
                               
                            </React.Fragment>
                        ))
                    }   
                </div> 
            }
            
        </div>
    )
}

export default Post
