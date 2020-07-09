import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, Route } from 'react-router-dom';
import UserDetails from './UserDetails';

import './App.css';

function App() {
const [users, setUsers] = useState([])

useEffect(() =>{
  axios.get("http://localhost:8000/api/users")
  .then(res=>{
    console.log(res)
    setUsers(res.data)
  })
  .catch(err=>{
    console.log(err)
  })
},[])

  return (
    <div className="App">

        <h2>User list:</h2>
        <h6>** Click on each name to see their posts **</h6>
      {users.map(user=>{
        return(
          <div className='userCard'>
            <Link to={`/user/${user.id}`}> {user.name} </Link>
          </div>
        )
      })}

      {/* Routes: */}
    <Route path='/user/:id' component={UserDetails} />

    </div>
  );
}

export default App;
