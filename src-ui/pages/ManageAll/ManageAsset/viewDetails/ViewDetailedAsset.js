import './ViewDetailedAsset.css'

import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import axios from "axios";

const ViewDetailedAsset = props => {
  const rootAPI = process.env.REACT_APP_SERVER_URL;
  let {id} = props;
  const [asset, setAsset] = useState({
    id: "",
    asset_code: "",
    asset_name: "",
    specification: "",
    installed_date: "",
    state: "",
    location: "",
    user_id: "",
    category_id: ""
   
   
  });
  
  useEffect(() => {
    loadAsset();
  }, []);
  const loadAsset = async () => {
    const res = await axios.get(rootAPI+`/assets/${id}`);
    setAsset(res.data);
  };
  return (
   <div >
      
    <div><h3 className="title-detail-asset">
         Detailed information of asset
        
         </h3></div> 
      
     <div>
     <table> 
       <tbody>
       
       <tr>
         <td className="fields-name">ID</td>
         <td>: {asset.id}</td>
       </tr>
       <tr>
         <td className="fields-name">Asset Code </td>
         <td>: {asset.assetCode}</td>
       </tr>
       <tr>
         <td className="fields-name">Asset name </td>
         <td>: {asset.assetname}</td>
       </tr>
       <tr>
         <td className="fields-name">specification</td>
         <td>: {asset.specification}</td>
       </tr>
       <tr>
         <td className="fields-name">Installed date </td>
         <td>: {asset.installedDate}</td>
       </tr>
       <tr>
         <td className="fields-name">State </td>
         <td>: {asset.state}</td>
       </tr>
       <tr>
         <td className="fields-name">Location </td>
         <td>: {asset.location}</td>
       </tr>
       <tr>
         <td className="fields-name">Category_id</td>
         <td>: {asset.categoryId}</td>
       </tr>
      
       <tr>
         <td className="fields-name">User id </td>
         <td>: {asset.userId}</td>
       </tr>
       </tbody>
     </table>
     </div>
    </div>
    
  );
};

export default ViewDetailedAsset;