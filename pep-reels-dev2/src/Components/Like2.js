import React from 'react'
import {useEffect, useState} from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { database } from '../firebase';

function Like({userData, postData}) {
    const [like, setLike] = useState(null)
    useEffect(() => {
        let Check = postData.likes.includes(userData.userId)?true:false;
        setLike(Check) 
        
    }, [postData])
    const handleLike =  () => {
        console.log('hi')
       if(like == true){
            let narr = postData.likes.filter((el) => el!=userData.userId )
            database.posts.doc(postData.postId).update({
                likes:narr
            })
        }else{
            let narr = [...postData.likes,userData.userId]
            database.posts.doc(postData.postId).update({
                likes: narr
            })
        }
    
    }



        return (
        <div>
            {
                like != null ? 
                <>
                {
                    like == true ? <FavoriteIcon className={`like`} onClick={handleLike} style={{padding:'1rem',paddingTop:'0.5rem'}}/>: <FavoriteIcon className={` unlike2`} onClick={handleLike}  style={{padding:'1rem'}} />
                }
                </>:
                <></>
            }
            
        </div>
    )
}

export default Like
