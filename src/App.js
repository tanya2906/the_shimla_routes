import React,{useState} from 'react'
import './App.css';

import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';
import Gallery from './Components/Gallery/Gallery';
import Updates from './Components/Updates/Updates';


const App = () => {
  
  const [leavingFrom, setLeavingFrom] = useState('');
  const [goingTo, setGoingTo] = useState('');
  const [showList, setShowList]=useState(
    {
      display:'none'
    }
  );
  return (
    <>
    <Navbar/>
    <Home showList={showList}  setShowList={setShowList} leavingFrom={leavingFrom} setLeavingFrom={setLeavingFrom} goingTo={goingTo} setGoingTo={setGoingTo}/>
    <Main  setShowList={setShowList}  setLeavingFrom={setLeavingFrom} setGoingTo={setGoingTo}/>
    <Updates/>
    <Gallery/>
    <Footer/>
   
    </>
  )
}

export default App