import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import {Link} from 'react-router-dom'

import './Signup.css'
import insta from '../Assets/Insta-logo.png'

export default function Signup() {
    const useStyles = makeStyles({
        text : {
            color:'grey',
            textAlign:'center'
        },
        card2: {
            height: '6vh',
            marginTop: '2%'
        }
    })
    const classes = useStyles();
  return (
      <div className="signupWrapper">
          <div className="signupCard">
              
                <Card variant="outlined">
                <div className="insta-logo">
                    <img src={insta}/>
                </div>
                  {/* <CardActionArea> */}
                    <CardContent>
                    <Typography className={classes.text} variant="subtitle1" >
                        Sign up to see photos and videos from your friends
                    </Typography>
                    <Alert severity="error">This is an error alert — check it out!</Alert>
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense' size='small'/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' size='small'/>
                    <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin='dense' size='small' />
                    <Button fullWidth={true} color='secondary' variant='outlined' margin='dense' startIcon={<CloudUploadIcon/>} component="label">
                    Upload Profile Image
                    <input type="file" accept="image/*" hidden   />
                    </Button>

                    </CardContent>
                {/* </CardActionArea> */}
                <CardActions>
                    <Button  color="primary" fullWidth={true} variant="contained">
                        Sign Up
                    </Button>
                </CardActions>
                <CardContent>
                    <Typography className={classes.text} variant="subtitle1" >
                        By signing up, you agree to our Terms, Data Policy and Cookies Policy
                    </Typography>
                </CardContent>
            </Card>
            <Card variant="outlined" className= {classes.card2}>
            <CardContent  >
                    <Typography className={classes.text} variant="subtitle1" >
                        Having an account ? <Link to='/login'>Login</Link>
                    </Typography>
                </CardContent>
            </Card>
          </div>
      </div>
   
  );
}