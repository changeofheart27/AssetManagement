import './ViewDetailedUser.css'

import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import axios from "axios";

const ViewDetailedUser = props => {
  const rootAPI = process.env.REACT_APP_SERVER_URL;
  let {id} = props;
  const [user, setUser] = useState({
    id: "",
    staff_code: "",
    username: "",
    first_name: "",
    last_name: "",
    type: "",
    dob: "",
    joined_date: "",
    location: "",
    status:""
   
  });
  
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const res = await axios.get(rootAPI+`/users/${id}`);
    setUser(res.data);
  };
  return (
   <div >
      
    <div><h3 className="title-detail-user">
         Detailed information of user
        
         </h3></div> 
      
     <div>
     <table> 
       <tbody>
       
       <tr>
         <td className="fields-name">ID</td>
         <td>: {user.id}</td>
       </tr>
       <tr>
         <td className="fields-name">Staff Code </td>
         <td>: {user.staffCode}</td>
       </tr>
       <tr>
         <td className="fields-name">Username </td>
         <td>: {user.username}</td>
       </tr>
       <tr>
         <td className="fields-name">First name </td>
         <td>: {user.firstName}</td>
       </tr>
       <tr>
         <td className="fields-name">Last name </td>
         <td>: {user.lastName}</td>
       </tr>
       <tr>
         <td className="fields-name">Type </td>
         <td>: {user.type}</td>
       </tr>
       <tr>
         <td className="fields-name">Date of Birth </td>
         <td>: {user.dob}</td>
       </tr>
       <tr>
         <td className="fields-name">Joined Date </td>
         <td>: {user.joinedDate}</td>
       </tr>
       <tr>
         <td className="fields-name">Location </td>
         <td>: {user.location}</td>
       </tr>
       <tr>
         <td className="fields-name">Status </td>
         <td>: {user.status}</td>
       </tr>
       </tbody>
     </table>
     </div>
    </div>
    
  );
};

export default ViewDetailedUser;