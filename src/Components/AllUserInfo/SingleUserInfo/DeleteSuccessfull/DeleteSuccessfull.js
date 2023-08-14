import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import "./DeleteSuccessfull.css"

function DeleteSuccessfull(props) {


    



    let navigate = useNavigate(); 
    const routeChange = () =>{ 
     
      navigate("/all-user-information")
    }



  return (


    <div id="section">





<div className="delete-box">

       


<div className='delete-container'>
 
    <div className="delete-aside-image">

        <div className="delete-aside-inner-image">
        <img src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg?w=996&t=st=1691758456~exp=1691759056~hmac=e20714f64f473f4393d4eacd517efcde636ed8a276fd8e3236aad5b200c125d7" alt="" />
        </div>


        <div>


            <h2>User Information is deleted Successfully </h2>





        </div>


        <div>


        <Button color="success" endIcon={<ArrowForwardIcon />} variant='outlined' onClick={()=>routeChange()} >Back</Button>



        </div>


    </div>




 

    

</div>

</div>



      </div>









  )
}



export default DeleteSuccessfull





