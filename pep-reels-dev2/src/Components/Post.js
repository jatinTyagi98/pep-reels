import React from 'react'
import {useState,useEffect} from 'react'
import {database} from '../firebase'
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Video from './Video';
import './Post.css'
import Like from './Like'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Like2 from './Like2'
import AddComment from './AddComment';


function Post({userData}) {
    console.log('post',userData);
    const [posts, setPost] = useState(null)
    const [open, setOpen] = React.useState(false);
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

    

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  



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
                                    <ChatBubbleIcon className="chat-style" onClick={handleClickOpen}/>
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        fullWidth = {true}
                                        maxWidth = "md"
                                    >
                                        <div className="modal-container">
                                            <div className="video-modal">
                                                 <video autoPlay={true} muted="muted" controls >
                                                     <source src= {post.pUrl}/>
                                                 </video>
                                            </div>
                                            <div claassName="comment-modal">
                                            <Card className="card1">
                                            
                                            </Card>
                                            <Card variant="outlined" className="card2">
                                            <Typography>{post.likes.length == 0?'':`liked by ${post.likes.length} people`}</Typography>
                                                <div style={{display:'flex'}}>
                                                    <Like2 userData= {userData} postData= {post} />
                                                    <AddComment userData={userData} postData={post}/>

                                                </div>
                                        
                                             </Card>


                                            </div>
                                        </div>
                                        
                                        
                                    </Dialog>
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
