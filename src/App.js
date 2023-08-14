import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Components/Home/Home';
import EditUserInfo from './Components/EditUserInfo/EditUserInfo';
import AllUserInfo from './Components/AllUserInfo/AllUserInfo';
import DeleteSuccessfull from './Components/AllUserInfo/SingleUserInfo/DeleteSuccessfull/DeleteSuccessfull';
import SingleUserLoad from './Components/SingleUserLoad/SingleUserLoad';
import PageNotFound from './Components/PageNotFound/PageNotFound';

function App() {
  return (
    <div className="App">

      <Router>

      <Routes>
      <Route  path="/" element={<Home/>} />
      <Route  path="/edit-user-information/:id" element={<EditUserInfo/>} />
      <Route  path="/all-user-information" element={<AllUserInfo/>} />
  
      <Route  path="/deleted" element={<DeleteSuccessfull/>} />
      <Route  path="/single-user-data/:id" element={<SingleUserLoad/>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>

      </Router>



      
    </div>
  );
}

export default App;
