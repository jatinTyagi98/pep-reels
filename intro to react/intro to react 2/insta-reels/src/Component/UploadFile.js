import React from 'react'
import Button from '@mui/material/Button';
import MovieIcon from '@material-ui/icons/Movie'
import Alert from '@mui/material/Alert';
import { useContext , useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import LinearProgress from '@mui/material/LinearProgress';
import { database, storage } from '../firebase';


function UploadFile(props) {
    console.log(props.user);
    const [error, setError] = useState('')

    const[loading,setLoading]  =useState(false)

    // console.log(props.user)

    const handleChange = async (file) => {
            if(file == null){
                setError(error)
                setTimeout(() => {
                    setError('')
                },2000)
                return;
        }
        if(file.size/(1024*1024) > 100){
            setError('file is big')
            setTimeout(() => {
                setError('')
            },2000)
            return
        }

        let uid = uuidv4()
        setLoading(true)
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
                    let obj = {
                        likes:[],
                        comments:[],
                        pId: uid,
                        pUrl : url,
                        uName: props.user.fullname ,
                        userId: props.user.userId,
                        createdAt: database.getTimeStamp()
                    }
                    console.log(obj)
                    // console.log(obj, props.user);
                    // console.log(database.posts);
                    // database.posts.add(obj)
                    database.posts.add(obj).then(async (ref) => {
                        console.log('ref',ref)
                        let res = await database.users.doc(props.user.userId).update({
                            postIds: props.user.postIds != null ? [...props.user.postIds,ref.id] : [ref.id]
                        })
                    })
                    .then(() => {
                        setLoading(false)
                    }).catch((error) => {
                        setError(error)
                        setTimeout(() => {
                            setError('')
                        },2000)
                        setLoading(false)
                    })
                })
             }
    }

    return (
        <div>

        {
            error != ''?   <Alert severity="error">{error}</Alert> :
            <>
            <input type="file" accept= "video/*" id="upload-input" style={{display:'none'}} onChange={(e) => handleChange(e.target.files[0])} />
            <label htmlFor="upload-input" >
            <Button 
                variant="outlined" 
                color="secondary" 
                component="span"
                disabled={loading} >


             <MovieIcon/>&nbsp; Upload Video
            </Button>
           
            
            </label>
            {loading && <LinearProgress color="secondary" />}

            </>
        
            
       
        }
        </div>


        
    )
}

export default UploadFile
