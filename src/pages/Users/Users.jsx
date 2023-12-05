import React, { useEffect, useState } from 'react'
import '../Users/Users.css';
import axios from 'axios';
import prev from '../Users/prev.png';
import next from '../Users/next.png';
import edit from '../Users/edit.png';
import Delete from '../Users/delete.png';
import profile from '../Users/profile.png';

export default function Users() {
    const [userData, setUserData]= useState([]);
    
    const fetchUser= async ()=>{
        try{
            const res = await axios.get("http://localhost:5173/api/users/user");
            console.log(res.data);
            setUserData(res.data);
            // console.log(res);
        }
        catch(err){
            console.log('wrong');
        }
    }
    useEffect(()=>{
        fetchUser();
    },[])

  return (
    <div className='user-container'>
    <div className="User">
        <span className='user-title'>Users</span>
        <button type='submit' className="User-Add-button">Add New User</button>
    <div className="User-form">
        <div>&nbsp;</div>
    <table className='user-table'>
        <thead>
            <tr className='title'>
                <th></th>
                <th>Name</th>
                <th>Role</th>
                <th>&nbsp;&nbsp;</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
               
                <tr>
                <td><img className='user-img' src={profile} alt="" /></td>
                <td>jana</td>
                <td>admin</td>
                <td><img className='user-img' src={Delete} alt="" /></td>
                <td><img className='user-img' src={edit} alt="" /></td>
                </tr> 
            
            </tbody>
        </table>
      </div>
      <div className='user-skip'>
      <img id='prev' className='user-img' src={prev} alt="" /> &nbsp;1 of 5 &nbsp;<img className='user-img' src={next} alt="" />
        
      </div>
      </div>
      </div>
  );
};
