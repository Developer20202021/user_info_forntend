import React, { useEffect, useState } from 'react'
import "./AllUserInfo.css"
import SingleUserInfo from './SingleUserInfo/SingleUserInfo'
import BottomNavigationScreen from '../BottomNavigationScreen/BottomNavigationScreen';


function AllUserInfo(props) {

  var ServerAPILink = "https://user-info-server.vercel.app"



    const [allUserInfo, setAllUserInfo] = useState([]);




    var getAllUserInformation = async()=>{


        await fetch(`${ServerAPILink}/get-all-user-info`, {
          method: "GET", 
          
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
            
          },
         
        
        }).then((res) => res.json()).then((jsonData)=>{


            console.log(jsonData.data);


            setAllUserInfo(jsonData.data);




        })
  
  
  
  
      }


      useEffect(()=>{

        getAllUserInformation();

      }, []);





  








  return (
    <div>

   

    <div className="client-order-history-container">

    <div className="client-order-history-header">



        <div className="order-list-title">
            <span className='order-list-icon'><i class="fas fa-border-all"></i> </span> 
            <span className='order-list'>User Informations</span>
        </div>
    </div>



    <div className="manage-order-table-container">

        <div className="manage-order-table-box">



            <table className='manage-order-table'>

                <thead>
                    <th> <span><i class="fas fa-user-tie"></i></span> <span>Name</span> </th>


                    <th><span className='cancel'><i class="fas fa-trash-alt"></i></span> <span >Selected Sectors</span> </th>
                    
                    
                   
                    <th><span><i class="fas fa-map-marker-alt"></i></span> <span>Agree to terms</span> </th>

                    <th><span><i class="fas fa-map-marker-alt"></i></span> <span>Edit</span> </th>

                    
                    <th><span><i class="fas fa-map-marker-alt"></i></span> <span>Delete</span> </th>
                  
                    
                </thead>

                <tbody>

               


                    {allUserInfo?.map(data =><SingleUserInfo getSingleUserInfo={data}></SingleUserInfo>)}
                    
                 















                </tbody>


                






            </table>


        </div>



    </div>
    
















    </div>


    <BottomNavigationScreen></BottomNavigationScreen>
</div>
  )
}



export default AllUserInfo
