
import React, { memo, useState ,useEffect} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import  "./Home.css";
import BottomNavigationScreen from '../BottomNavigationScreen/BottomNavigationScreen';
import { useNavigate } from "react-router-dom";

const Home = memo((props) => {

  var ServerAPILink = "https://user-info-server.vercel.app"
  const yourAddedSectors = [];







  const [sectorsData, setSectorsData] = useState([]);
  const [getErrorMessage, setErrorMessage] = useState("")







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
    localStorage.removeItem("yourAddedSectors")
    // SingleUserDatafetch();
    allSectorsDatafetch();
    
  }, [])
  







  


    const [userInfo, setUserInfo] = useState({
        userName:"",
        userSelection:[],
        userTermsChecked:""
    });



    const getInputValue = (e)=>{

        var value = e.target.value;
        var name = e.target.name;

        setUserInfo({...userInfo, [name]:value});
        console.log(userInfo);

    }







    var uploadUserInformation = async()=>{


      let retString = localStorage.getItem("yourAddedSectors")
  let retArray = JSON.parse(retString)


  // console.log(addedData);

  const lastInformation = {

    userName:userInfo.userName,
    userSelection:retArray,
    userTermsChecked:userInfo.userTermsChecked
  
  
  }


  console.log(lastInformation);


      await fetch(`${ServerAPILink}/add-user-info`, {
        method: "POST", 
        
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
          
        },
       
        body: JSON.stringify(lastInformation), 
      }).then((res)=>res.json()).then((data)=>{

        console.log(data);
        localStorage.removeItem("yourAddedSectors")

      
        if (data?.message === "error") {
          setErrorMessage(data?.message);
          
        } else {

           routeChange(`/single-user-data/${data?.message?._id}`)
          
        }
        

      
       
          
        





      });




    }





    // Agree with terms Checkbox Function

    const [checkedValue, setCheckedValue] = useState("unchecked");

    const handleSendSelection = (event) => {

      if (event.target.value === "unchecked") {
        setCheckedValue("checked");
        var userTermsChecked = "userTermsChecked";
        setUserInfo({...userInfo, [userTermsChecked]:"checked"});
        console.log(userInfo);
        console.log("value - ", event.target.value);
      }
      else{
        setCheckedValue("unchecked");
        var userTermsChecked = "userTermsChecked";
        setUserInfo({...userInfo, [userTermsChecked]:"unchecked"});
        console.log("value - ", event.target.value);
      }
      
    }




   


    //Route Change Function -> Give Path as a Parameter

    let navigate = useNavigate();
    const routeChange = (path) =>{ 
      
        navigate(path)
    }



    // Your Selected Sectors-> your checked or unchecked Sectors Function

    const AddedSectorsArray = (value) => {


      yourAddedSectors.push(value);
    
      let string = JSON.stringify(yourAddedSectors)
      localStorage.setItem("yourAddedSectors", string)
    
    };




    

  





  return (
    <div id="section">





<div className="log-in-box">

       


<div className='log-in-container'>
 
    <div className="login-aside-image">
        <img src="https://img.freepik.com/free-vector/profile-interface-concept-illustration_114360-2850.jpg?w=740&t=st=1691591435~exp=1691592035~hmac=26e2222571b760bf14e05edf408cf781bad72cc2c0c71bf887a5d617acfa6bc1"  alt="" />
    </div>




    <div className="log-in-input-section">
    {getErrorMessage ==="error"?<h1>Please Fill Up the Full Form</h1>:<h1></h1>}
     <p className='create-here'>Please enter your name and pick the Sectors you are currently involved in.</p>


    
   <div className='input-field'>

      <div className='textfield'>
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


   


    <div >
  

    <p className='create-here'>Select Sectors</p>
    

      <Grid item xs={12} md={12} >
      <div  id='sectors'>
  
        
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


    <div >



    <Grid item xs={12} md={12} >


    <div className='terms'>


    <Checkbox value={checkedValue} onClick={(event) => handleSendSelection(event)} />

<p>Agree to terms</p>




    </div>



    </Grid>



    <div className='log-in-button'>

    {userInfo?.userName?.length<2 ?<Button


disabled


style={{
    backgroundColor:'#2a9df4',
    width:'100%',
    height:'50px',
    fontSize:'17px'
}} variant="contained">Save</Button>:<Button


onClick={()=>uploadUserInformation()}


style={{
    backgroundColor:'#2a9df4',
    width:'100%',
    height:'50px',
    fontSize:'17px'
}} variant="contained">Save</Button>}
          
          </div>




    </div>
      
   </div>













    </div>

    
















</div>

</div>
































          <BottomNavigationScreen></BottomNavigationScreen>
    
      </div>
  )
})


export default Home