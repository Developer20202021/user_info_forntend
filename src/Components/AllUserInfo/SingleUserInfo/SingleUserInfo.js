import React, { useState } from 'react'
import "./SingleUserInfo.css"
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";




function SingleUserInfo(props) {

  var ServerAPILink = "https://user-info-server.vercel.app";
  const {_id, UserName,userSelection, userTermsChecked} = props.getSingleUserInfo;



  // Route Change Function
  let navigate = useNavigate();
  const routeChange = (path) =>{ 
    
 
      navigate(path)
  }






  const [DeleteMessage, setDeleteMessage] = useState("");




    var DeleteSingleUserInformation = async(id)=>{


        await fetch(`${ServerAPILink}/single-user-info-delete/${id}`, {
          method: "DELETE", 
          
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
            
          },
         
        
        }).then((res) => res.json()).then((jsonData)=>{


            console.log(jsonData.message);


            setDeleteMessage(jsonData.message);

            routeChange("/deleted");






        })
  
  
  
  
      }





  


      // Route Change to Edit Page 
      const routeChangeToEditpage = (path, id) =>{ 
    
        navigate(`/edit-user-information/${id}`)
    }

      
   








  return (

    

    <tr className='userInfo-row'>
       
          
           
           <td>{UserName}</td>
        
           <td ><Checkbox disabled defaultChecked/></td>

           <td><Button onClick={()=>routeChangeToEditpage("",_id)} variant="outlined"  endIcon={<EditIcon />}>Edit</Button></td>
  
           <td><Button onClick={()=>DeleteSingleUserInformation(_id)} variant="outlined" color='error' endIcon={<DeleteIcon />}>Delete</Button></td>









        </tr>
    
  )
}



export default SingleUserInfo
