import React,{useEffect, useState} from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MovieIcon from '@material-ui/icons/Movie'
import LinearProgress from '@mui/material/LinearProgress';
import {v4 as uuidv4} from 'uuid';
import { database } from '../firebase';


function UploadFiles(props) {
        const [error, setError] = useState('')
        const [loading, setLoading] = useState(true)
        const handleChange = async(file) => {
            if(file == null){
                setError(error)
                setTimeout(() => {
                    setError('')

                },2000)
                return;
            }

            if(file.size/(1024*1024) > 100){
                setError('this video is very big')
                setTimeout(() => {
                    setError('')
                },2000)
                return;
            }

            let uid = uuidv4()
            const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
            uploadTask.on('state_changed',fn1,fn2,fn3);

            function fn1(snapshot){
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100
                console.log(`Upload is ${progress} done`); 
            }
            function fn2(error){
                setError(error)
                setTimeout(() => {
                    setError('')
                },2000)
                setLoading(false)
                return;
            }
             function fn3(){
               uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    console.log(url);
                    let obj =  {
                        likes: [],
                        comments:[],
                        pId: uid,
                        pUrl : url,
                        Uname: props.user.fullname,
                        userId: props.user.userId,
                        createdAt: database.getTimeStamp()
                    }
                })
                    // createdAt: database.getTimeStamp()
                
                // console.log(database.users.doc(uid))
                setLoading(false)
            history.push('/')
            }

        }
    return (
        <div>
            {
            error != ''? <Alert severity="error">{error}</Alert>:
            <>

            <input type="file" accept="video/*" id="uplaod-input" style={{display:'none'}} onChange={(e) =>handleChange(e.target.files[0])} />
            <label htmlFor="upload-input">
                <Button
                    variant="outlined"
                    color="secondary"
                    component= "span"
                    disabled = {loading}

                >

                   <MovieIcon/>&nbsp; Upload Video

                </Button>
               
            </label>
            {loading && <LinearProgress color='primary' style={{marginTop:'3%'}} />}

            </>
        }
            
        </div>
    )
}

export default UploadFiles
