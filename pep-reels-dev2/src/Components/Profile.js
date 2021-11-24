import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'
import { database } from '../firebase'
import Typography from '@mui/material/Typography'
import Navbar from './Navbar'
import './Profile.css'
import Like from './Like'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Like2 from './Like2'
import AddComment from './AddComment';
import Comment from './Comment'
import Avatar from '@mui/material/Avatar'


function Profile() {
    const { id } = useParams()
    const [userData, setUserData] = useState(null)
    const [posts, setPosts] = useState(null)
    const [open, setOpen] = React.useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };


    useEffect(() => {
        database.users.doc(id).onSnapshot((snap) => {
            setUserData(snap.data())
        })
    }, [id])

    useEffect(async () => {
        if (userData != null) {
            let parr = []
            for (let i = 0; i < userData.postIds.length; i++) {
                let postData = await database.posts.doc(userData.postIds[i]).get()

                parr.push(postData.data())
            }
            setPosts(parr)

        }
    },[userData])

        console.log(posts);



    return (
        <div>
            {
                posts == null || userData == null ? <CircularProgress /> :
                    <>
                        <Navbar userData={userData} />
                        <div class="spacer"></div>
                        <div class="container">
                            <div class="upper-part">
                                <div class="profile-img">
                                    <img src={userData.profileUrl} />
                                </div>
                                <div className="info">
                                    <Typography variant='h5'>
                                        Email: {userData.email}
                                    </Typography>
                                    <Typography variant='h5'>
                                        Posts: {userData.postIds.length}
                                    </Typography>

                                </div>
                            </div>
                            <hr style={{ marginTop: '3rem', marginBottom: '3rem' }} />



                            <div className="profile-video">
                                {

                                    posts.map((post, index) => (
        
                                            <React.Fragment key={index}>
                                            
                                                <div className='video'>

                                                    <video autoPlay={true} muted="muted" controls >
                                                        <source src={post.pUrl} />
                                                    </video>
                                                    <div className='fa' style={{ display: 'flex' }}>
                                                        <Avatar src={userData.profileUrl} />
                                                        <h4>{userData.fullname}</h4>
                                                        <Like userData={userData} postData={post} />
                                                        <ChatBubbleIcon className="chat-style" onClick={handleClickOpen} />
                                                        <Dialog
                                                            open={open}
                                                            onClose={handleClose}
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                            fullWidth={true}
                                                            maxWidth="md"
                                                        >
                                                            <div className="modal-container">
                                                                <div className="video-modal">
                                                                    <video autoPlay={true} muted="muted" controls >
                                                                        <source src={post.pUrl} />
                                                                    </video>
                                                                </div>
                                                                <div claassName="comment-modal">
                                                                    <Card className="card1" style={{ height: '70vh', padding: '0.5rem' }}>
                                                                        <Comment postData={post} />

                                                                    </Card>
                                                                    <Card variant="outlined" className="card2">
                                                                        <Typography>{post.likes.length == 0 ? '' : `liked by ${post.likes.length} people`}</Typography>
                                                                        <div style={{ display: 'flex' }}>
                                                                            <Like2 userData={userData} postData={post} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                                                            <AddComment userData={userData} postData={post} />


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



                        </div>

                    </>
            }
        </div>
    )
}

export default Profile
