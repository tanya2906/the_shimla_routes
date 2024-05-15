import React,{useState,useEffect} from 'react'
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
     {/*
    {filteredServices.length > 0 && (
          <section data-aos='fade-up' style={showList} className='list'>
        <div className="titleDiv">
            <h1 className='title'>{title}</h1>
            <span>
                <p>{formattedDate}</p>
            </span>
        </div>
        <div className="secContent">
            <table>
                <tr>
                    <th>Service No.</th>
                    <th>Departure Time - Arrival Time</th>
                    <th>Origin - Destination</th>
                    <th>Type</th>
                </tr>
                
                {
                    filteredServices.map((e,i)=>{
                        return(
                            <tr key={i}>
                                <td>{e.serviceNo}</td>
                                <td>{e.departureTime} - {e.arrivalTime}</td>
                                <td>{e.origin} - {e.destination}<br/><p>{e.via}</p></td>
                                <td>{e.busType}</td>
                            </tr>
                        );
                    })
                }
            </table>
        </div>
    </section>
    )}*/}
    <Main  setShowList={setShowList}  setLeavingFrom={setLeavingFrom} setGoingTo={setGoingTo}/>
    <Updates/>
    <Gallery/>
    <Footer/>
   {/* <div>
      {
        contacts.map((contact=>(
          <div key={contact.id}>
            
            {contact.serviceNo}
            {contact.departureTime}
            {contact.arrivalTime}
            {
              contact.origin
            }
            {contact.destination}
            {
              contact.via
            }
            {
              contact.type
            }
            {
              contact.busType
            }
            {contact.day}
          </div>
        )))
      }
    </div> */}
    </>
  )
}

export default App