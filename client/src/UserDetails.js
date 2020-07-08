import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const UserDetails = () => {
    const [userDetails, setUserDetails] = useState([])
    const params = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${params.id}/posts`)
            .then(res => {
                console.log(res)
                setUserDetails(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [params.id])

    return (
        <div className='details'>
            {userDetails.map(details => {
                return (
                    <div className='postCard'>
                        <div>"{details.text}"</div>
                       <div> -- {details.postedBy} </div>
                    </div>
                )
            })}
        </div>
    )
}

export default UserDetails