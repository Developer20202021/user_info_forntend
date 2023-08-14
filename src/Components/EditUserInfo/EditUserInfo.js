import React, { memo, useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from 'react-router';
import Checkbox from '@mui/material/Checkbox';
import "./EditUserInfo.css"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from "react-router-dom";
import BottomNavigationScreen from '../BottomNavigationScreen/BottomNavigationScreen';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';








const EditUserInfo = memo((props) => {


  const {id} = useParams();


  var ServerAPILink = "https://user-info-server.vercel.app"



//  route change function 
  let navigate = useNavigate();
  const routeChange = (path) =>{ 
    
 
      navigate(path)
  }


  // user Sectors  Array 
  const yourAddedSectors = [];
  const addedData = [];
  

  const [checkedValue, setCheckedValue] = useState("unchecked");
  const [userOldSelectedSectors, setUserOldSelectedSectors]=useState([]);




  // user Information add to useState 

  const [userInfo, setUserInfo] = useState({
    userName:"",
    userSelection:[],
    userTermsChecked:""
});



  // Single Editable User Data Load from Database -> Function 

  var SingleUserDatafetch = async()=>{


    await fetch(`${ServerAPILink}/single-user-info/${id}`, {
      method: "GET", 
      
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
        
      },
     
      
    }).then((res)=>res.json()).then((data)=>{


      // console.log(data);

      setUserInfo({userName:data.UserName,
      userSelection:data.userSelection,
      userTermsChecked:data.userTermsChecked})

      setUserOldSelectedSectors(data.userSelection);

    });
  
  
  
  
  }







    const [sectorsData, setSectorsData] = useState([]);






  //  get  All sectors from Database  API -> Function 

  var allSectorsDatafetch = async()=>{


    await fetch(`${ServerAPILink}/get-all-sectors`, {
      method: "GET", 
      
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
        
      },
     
      
    }).then((res)=>res.json()).then((data)=>{



      // console.log(data.data[0].Sectors);

      setSectorsData(data.data[0].Sectors);


      



    });
  
  
  
  
  }



  useEffect(() => {
 // initially remove user selected local storage save  Data because when you will select a new sector it will go to the the array as a last value  
    localStorage.removeItem("yourAddedSectors")
    SingleUserDatafetch();
    allSectorsDatafetch();
    
  }, [])
  















  //  get Text field Value -> Function 


const getInputValue = (e)=>{

    var value = e.target.value;
    var name = e.target.name;

    setUserInfo({...userInfo, [name]:value});
    // console.log(userInfo);

}














  // user Information Edit and save to database  -> Function 

var EditUserInformation = async()=>{

  // user added sector retrive 
  let retString = localStorage.getItem("yourAddedSectors")
  let retArray = JSON.parse(retString)


  console.log(addedData);

  const lastInformation = {

    userName:userInfo.userName,
    userSelection:retArray,
    userTermsChecked:checkedValue
  
  
  }


  console.log(lastInformation);





  // Editable user data load by id 

  await fetch(`${ServerAPILink}/edit-user-info/${id}`, {
    method: "PUT", 
    
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
      
    },
   
    body: JSON.stringify(lastInformation), 
  }).then((res)=> res.json()).then((data)=>{

    // initially remove user selected local storage save  Data because when you will select a new sector it will go to the the array as a last value   
    localStorage.removeItem("yourAddedSectors")

    // after edit user data change the route to user profile page 
    routeChange(`/single-user-data/${id}`)



  });




}











  // Agree with terms 
const handleSendSelection = (event) => {

  if (event.target.value === "unchecked") {
    setCheckedValue("checked");
    console.log(userInfo); 
  }
  else{
    setCheckedValue("unchecked");
    console.log(userInfo);
  }
  
}




// user selected Sectors add to yourAddedSectors Array -> Function 

const AddedSectorsArray = (value) => {


  yourAddedSectors.push(value);

  let string = JSON.stringify(yourAddedSectors)
  localStorage.setItem("yourAddedSectors", string)


};























  return (
    <div id="section">





<div className="log-in-box">

       


<div className='log-in-container'>
 





    <div className="log-in-input-section">

      <h1>Hello {userInfo.userName} Edit Your Information</h1>
 
     <p className='create-here'>Please Edit your name and pick the Sectors you are currently involved in.</p>


     <div className='input-field'>

     </div>
   <div className='input-field'>

      <div className='userNameTextField'>
      <Grid item xs={12} md={12} >
    
      <TextField
     
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

        

















        <div class="SectorConatiner">
		<div class="inner">
			
			<p class="title">Your Selected Sectors</p>
			<p class="info">You Selected {userOldSelectedSectors?.length} Sector{userOldSelectedSectors?.length > 1?<em>s</em>:<em></em>} </p>
			<ul class="features">
		
	

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


  <p className='create-here'>Select Sectors</p>

  <div className='textfield' id='sectors'>
  
        
        { sectorsData?.map((sector) => (
        <div className="sector">

          <ul className='sectorNameUl'>

            <li className='sectorNameli'><ListItemButton onClick={()=>AddedSectorsArray(sector.sectorName)}>
       
        <ListItemText primary={sector.sectorName} />
        <Checkbox  />
  
            
       </ListItemButton>

 

            <ul className='subsector'>{sector.options.map((option)=><li>




              <ListItemButton onClick={()=>AddedSectorsArray(option.subsector)}>
              <Checkbox  />
                    <ListItemText primary={option.subsector} />
         
                  
            </ListItemButton>
              
            

           
            
            <ul className='subsector2'>
            {option.suboptions.subsector2.map((subsectorData2)=><li>
              
              {/* <span className='subsectorData2'>{subsectorData2}</span> */}
            
            <ListItemButton onClick={()=>AddedSectorsArray(subsectorData2)}>
              <Checkbox  />
                    <ListItemText primary={subsectorData2} />
        
                  
            </ListItemButton>


            <ul className='subsector3'>

              {option.suboptions.subsector3.map((subsectorData3)=><li>
                
                <ListItemButton onClick={()=>AddedSectorsArray(subsectorData3)}>
              <Checkbox  />
                    <ListItemText primary={subsectorData3} />
        
                  
            </ListItemButton>
                
                </li>)}


            </ul>



            
            </li>)}
            </ul>
            
            </li>)}


            </ul>





            
            
            
            </li>


          </ul>




        </div>
      ))}

      

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


    <Checkbox value={checkedValue} onClick={(event) => handleSendSelection(event)}/>

<p>Agree to terms</p>




    </div>



    </Grid>



    <div className='log-in-button'>
          <Button
          onClick={()=>{

            // removeDuplicateData();
            EditUserInformation();
          } 
            
            
            
          }
         
          style={{
              backgroundColor:'#2a9df4',
              width:'100%',
              height:'50px',
              fontSize:'17px'
          }} variant="contained">Save</Button>
          </div>



          {/* EditUserInformation() */}
    </div>
      
   </div>













    </div>

    
















</div>

</div>

































    <BottomNavigationScreen></BottomNavigationScreen>
      </div>
  )
})


export default EditUserInfo