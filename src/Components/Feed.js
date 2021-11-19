import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import UploadFiles from './UploadFiles'

function Feed() {
    const {user,logout} = useContext(AuthContext)
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>   
            <div className="comp" style={{width:'50%'}}>
                <h1> hello feed </h1>
                <button onClick={logout}>Logout</button>

            </div>
            <UploadFiles user = {user}/>
            
        </div>
    )
}

export default Feed
 