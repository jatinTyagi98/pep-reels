import * as React from 'react';
import { useContext , useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {makeStyles} from '@mui/styles';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import  CloudUploadIcon  from '@material-ui/icons/CloudUpload';
import {Link, useHistory} from 'react-router-dom'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext ,Image} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {AuthContext} from '../Context/AuthContext';

import logo from '../Assets/Insta-logo.png'
import insta from '../Assets/insta.png'

import img1 from '../Assets/img1.jpg'
import img2 from '../Assets/img2.jpg'
import img3 from '../Assets/img3.jpg'
import img4 from '../Assets/img4.jpg'
import img5 from '../Assets/img5.jpg' 


import './Login.css'

export default function Login() {
    const useStyle = makeStyles({
        text: {
            color:'grey',
            textAlign:'center'
            
        },
        card2: {
            height: '6vh',
            marginTop:'2%'
        },
        text1: {
            textAlign: 'center'
        }
    })
    const classes = useStyle();
    // const store = useContext(AuthContext)
    // console.log(store)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
    const history = useHistory();

    const {login} = useContext(AuthContext);

    const handleLogin = async () => {
        try{
            setError('')
            setLoading(true)

            let userObj = await login(email,password)

            setLoading(false)
            history.push('/')

        }catch(error){
            setError(error)
            setTimeout(() => {
                setError('')
                
            }, 2000)

            setLoading(false)
        }
    }


  return (
      <div className="loginWrapper">
           <div className = "imgCar" style={{backgroundImage:'url('+insta+')',backgroundSize:'cover'}}>
               <div className="car">
               <CarouselProvider
                 visibleSlides = {1}
                 totalSlides={5}
                 naturalSlideWidth={238}
                 naturalSlideHeight={423}
                 hasMasterSpinner
                 isPlaying={true}
                 infinite={true}
                 dragEnabled={false}
                 touchEnabled={false}
            >
                <Slider>
                <Slide index={0}><Image src={img1} /></Slide>
                <Slide index={1}><Image src={img2}/></Slide>
                <Slide index={2}><Image src={img3} /></Slide>
                <Slide index={3}><Image src={img4} /></Slide>
                <Slide index={4}><Image src={img5} /></Slide>

                </Slider>

             </CarouselProvider>
               </div>
            
        </div>
          <div className = "loginCard">
            <Card variant="outlined" >
                <div className="cardLogo" >
                       <img src={logo}/>
                    </div>
                {/* <CardActionArea> */}
                    <CardContent>
                    
                    
                   { error != '' &&  <Alert severity="error"> {error}</Alert>}
                    <TextField id="outlined-basic" label="Email" variant="outlined"  fullWidth= {true} margin="dense" size="small" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth = {true} margin="dense" size="small" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Typography color = 'primary' variant = 'subtitle1' className = {classes.text1} >
                        Forgot Password ?
                 </Typography>

                   

                    </CardContent>
                {/* </CardActionArea> */}
                <CardActions>
                    <Button size="small" color="primary" fullWidth={true} variant="contained" disabled={loading} onClick={handleLogin}>
                    lOG IN
                    </Button>
                </CardActions>
            </Card>
            <Card variant="outlined" className={classes.card2} >
                <CardContent>
                <Typography className= {classes.text} >
                    Don't have an account ? <Link to='/signup' style={{textDecoration:'none'}}>Sign Up</Link>
                 </Typography>

                </CardContent>

            </Card>
        </div>
      </div>
      
    
  );
}