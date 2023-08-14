import React, { memo, useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router';
import "./SingleUserLoad.css"
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from "react-router-dom";
import BottomNavigationScreen from '../BottomNavigationScreen/BottomNavigationScreen';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';







const SingleUserLoad = memo((props) => {

  
  var ServerAPILink = "https://user-info-server.vercel.app";

  // user id Load from Link 
  const {id} = useParams();



//  route change -> function 
  let navigate = useNavigate();
  const routeChange = (path) =>{ 
    
      navigate(path)
  }




  

  const [checkedValue, setCheckedValue] = useState("unchecked");
  const [userOldSelectedSectors, setUserOldSelectedSectors]=useState([]);
  
  
  //open snackbar 
  const [open, setOpen] = useState(true);

// close and open snacbar -> Function
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };




  const [userInfo, setUserInfo] = useState({
    userName:"",
    userSelection:[],
    userTermsChecked:""
});




  // Single user data fetch by id -> Function 
  var SingleUserDatafetch = async()=>{


    await fetch(`${ServerAPILink}/single-user-info/${id}`, {
      method: "GET", 
      
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
        
      },
     
      
    }).then((res)=>res.json()).then((data)=>{


      // console.log(data);

      // loaded Data set to userInfo variable 
      setUserInfo({userName:data.UserName,
      userSelection:data.userSelection,
      userTermsChecked:data.userTermsChecked})

      // set user selected Sectors 
      setUserOldSelectedSectors(data.userSelection);

    });
  
  
  
  
  }







// initially data Load
  useEffect(() => {

    // Single user data fetch by id -> Function Call
    SingleUserDatafetch();
    
    
  }, [])
  
















  //get textfield value -> Function

const getInputValue = (e)=>{

    var value = e.target.value;
    var name = e.target.name;

    setUserInfo({...userInfo, [name]:value});
    // console.log(userInfo);

}

















































  return (
    <div id="section">





<div className="log-in-box">

       


<div className='log-in-container'>
 
   




    <div className="log-in-input-section">

      <h1>Hello {userInfo.userName}! Here is Your Information</h1>
 



     <div className='input-field'>

     </div>
   <div className='input-field'>

      <div className='userNameTextField'>
      <Grid item xs={12} md={12} >
    
      <TextField
     disabled
      onChange={getInputValue} 
      name='userName'
      value = {userInfo?.userName}
      style={{
          width:'100%'
      }}
        id="standard-textarea"
        label="User Name"
        placeholder="User Name"
      
        multiline
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      
 
      </Grid>

      </div>


   


    <div className='textfield'>
  
    

      <Grid item xs={12} md={12} >

        

















        <div class="plan">
		<div class="inner">
			
			<p class="title">Your Selected Sectors</p>
			<p class="info">You Selected {userOldSelectedSectors?.length} Sector{userOldSelectedSectors?.length > 1?<em>s</em>:<em></em>} </p>
			<ul class="features">
		
	

      {/* user selected sectors map  */}
      {userOldSelectedSectors?.map((sector)=>(<li>
					<span class="icon">
						<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 0h24v24H0z" fill="none"></path>
							<path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
						</svg>
					</span>
					<span>{sector}</span>
				</li>))}

        


      
   




     
			</ul>
		
		</div>
	</div>






      
      </Grid>
      
    

   

    </div>





    <div className='textfield'>



    <Grid item xs={12} md={12} >


<div className='terms'>




{userInfo.userTermsChecked === "checked"?<p className='agree'><CheckCircleIcon color='success'/>You are Agreed to terms</p>:<p className='agree'><CancelIcon color='error'/>You are not Agreed to terms</p>}




</div>



</Grid>




    <Grid item xs={12} md={12} >


    <div className='terms'>


   




    </div>



    </Grid>


    <div className='log-in-button'>
          <Button

            endIcon={<EditIcon />}
          
         onClick={()=>routeChange(`/edit-user-information/${id}`)}
          
          style={{
              backgroundColor:'#2a9df4',
              width:'100%',
              height:'50px',
              fontSize:'17px'
          }} variant="contained">Edit</Button>
          </div>


    



    </div>
      
   </div>








    </div>

    





</div>

</div>











    {/* bottom navigation  */}
    <BottomNavigationScreen></BottomNavigationScreen>

    {/* snackbar */}
    <Snackbar anchorOrigin={{ vertical:"top", horizontal:"center" }} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Your Information Edited Successfully.
        </Alert>
      </Snackbar>
      </div>
  )
})


export default SingleUserLoad