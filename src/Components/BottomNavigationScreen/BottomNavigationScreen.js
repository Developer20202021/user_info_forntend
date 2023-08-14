import React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import GroupIcon from '@mui/icons-material/Group';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useNavigate } from "react-router-dom";

function BottomNavigationScreen(props) {
  const [value, setValue] = React.useState(0);


  let navigate = useNavigate();
  const routeChange = (path) =>{ 
    
 
      navigate(path)
  }






  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
    <BottomNavigation
    showLabels
    value={value}
    onChange={(event, newValue) => {


      if (newValue === 0) {

        routeChange("/all-user-information");
        
      } else {

        routeChange("/");
        
      }

      console.log(newValue);



      setValue(newValue);
    }}
  >
    <BottomNavigationAction label="All Users" icon={<GroupIcon />} />
    <BottomNavigationAction label="Give Information" icon={<AppRegistrationIcon />} />
    
  </BottomNavigation>
  </Paper>
  )
}


export default BottomNavigationScreen
