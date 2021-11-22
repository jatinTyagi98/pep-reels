import * as React from 'react';
import Card from '@mui/material/Card';
import { useState } from 'react';
import { useContext } from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {makeStyles} from '@mui/styles';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import  CloudUploadIcon  from '@material-ui/icons/CloudUpload';
import {Link, useHistory} from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import {database,storage} from '../firebase'
import logo from '../Assets/Insta-logo.png'
import './Signup.css'

export default function Signup() {
    const useStyle = makeStyles({
        text: {
            color:'grey',
            textAlign:'center'
            
        },
        card2: {
            height: '6vh',
            marginTop:'2%'
        }
    })
    const classes = useStyle();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
    const history = useHistory();

    const {signup} = useContext(AuthContext);

    const  handleSubmit = async( ) =>{
        if(file == null){
        setError('Uplaod the file first')
        setTimeout(() => {
            setError('')
        },2000)
        return;
    }

        try{
            setError('')
            setLoading(true)
            let userObj =  await signup(email,password);
            let uid = userObj.user.uid
            // console.log(uid);

            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
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

                    database.users.doc(uid).set({
                        email:email,
                        userId:uid,
                        password:password,
                        fullname: name,
                        profileUrl:url,
                        createdAt: database.getTimeStamp()
                    })
                   
                })
                setLoading(false)
                history.push('/')
	}




        }catch(error){
            if(file == null){
                setError('Uplaod the file first')
                setTimeout(() => {
                    setError('')
                },2000)
            }
        }
    }

    

  return (
      <div className="signupWrapper">
          <div className = "signupCard">
            <Card variant="outlined" >
                <div className="cardLogo" >
                       <img src={logo}/>
                    </div>
                {/* <CardActionArea> */}
                    <CardContent>
                    
                    <Typography className= {classes.text} >
                        Sign up  to see photos and videos from your friends 
                    </Typography>
                   { error != '' &&  <Alert severity="error">{error}</Alert>}
                    <TextField id="outlined-basic" label="Email" variant="outlined"  fullWidth= {true} margin="dense" size="small" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth = {true} margin="dense" size="small" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <TextField id="outlined-basic" label="Fullname" variant="outlined"  fullWidth={true} margin="dense" size="small" value={name} onChange={(e) => setName(e.target.value)} />
                    <Button variant="outlined" color = "secondary" fullWidth={true} margin="dense" startIcon={<CloudUploadIcon/>} component="label" >
                        Upload Profile Image
                        <input type="file" accept="image/*" hidden onChange={(e) => setFile(e.target.files[0])}/>
                    </Button>

                    </CardContent>
                {/* </CardActionArea> */}
                <CardActions>
                    <Button size="small" color="primary" fullWidth={true} variant="contained" disabled={loading} onClick={handleSubmit} >
                    Sign Up
                    </Button>
                </CardActions>
                <CardContent>
                <Typography className= {classes.text} variant="subtitle1" >
                     By signing up, you agree to our Terms, Data Policy and Cookies Policy
                 </Typography>

                </CardContent>

            </Card>
            <Card variant="outlined" className={classes.card2} >
                <CardContent>
                <Typography className= {classes.text} >
                    Having an account ? <Link to='/login' style={{textDecoration:'none'}}>Log in</Link>
                 </Typography>

                </CardContent>

            </Card>
        </div>
      </div>

    
  );
}