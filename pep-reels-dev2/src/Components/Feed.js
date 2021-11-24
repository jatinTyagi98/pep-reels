import React from 'react'
import { useContext, useState, useEffect} from 'react'
import { AuthContext } from '../Context/AuthContext'
import { database } from '../firebase'
import UploadFiles from './UploadFiles'
import Post from './Post'
import Navbar from './Navbar'

function Feed() {
    const {user,logout} = useContext(AuthContext)
    
    const [userData, setUserData] = useState('')
    // console.log('prv',UserData);

    useEffect(() => {
        const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
            setUserData(snapshot.data())
            console.log(snapshot.data());
            // console.log(UserData);
        }) 
        // console.log(database.users.doc(user.uid))
        return () => {
            unsub()
        }
    }, [user])
    // console.log('nxt',UserData);

    return (
        <>
        <Navbar userData = {userData}/>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>   
            {/* <div className="comp" style={{width:'50%'}}>
                <h1> hello feed </h1>
                <button onClick={logout}>Logout</button>

            </div> */}
            
            <UploadFiles user = {userData}/>
            <Post userData = {userData}/>
            
        </div>
        </>
    )
}

export default Feed
 