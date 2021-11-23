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
                    like == true ? <FavoriteIcon className={`icon-style like`} onClick={handleLike}/>: <FavoriteIcon className={`icon-style unlike`} onClick={handleLike}/>
                }
                </>:
                <></>
            }
            
        </div>
    )
}

export default Like
