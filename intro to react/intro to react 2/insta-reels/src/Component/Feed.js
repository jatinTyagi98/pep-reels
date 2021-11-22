import React from 'react'
import UploadFile from './UploadFile'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { database } from '../firebase'

import {useState, useEffect} from 'react'

function Feed() {
    const {user,logout} = useContext(AuthContext)
    const [userData, setUserData] = useState('')
    useEffect(() => {
        const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
            console.log(snapshot.data())
            setUserData(snapshot.data())
        })
        return () => { unsub() }
    }, [user])


    return (
        
        <div style={{display:'flex', justifyContent: 'center', alignItems:'center',flexDirection:'column'}}>
            <div className="comp" style={{width:'50%'}}>
            <h1> Welcome to Feed </h1>
            <button onClick={logout}>Log out</button>
           
            </div>

            <UploadFile user = {userData} />
        </div>
    )
}

export default Feed
