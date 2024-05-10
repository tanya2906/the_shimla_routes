import React ,{useState,useEffect}from 'react'
import './Home.css';
import { FaLocationDot } from "react-icons/fa6";
import Aos from 'aos';
import 'aos/dist/aos.css';
import img from '../../Assets/ridge1.jpg';
import { MainList } from '../MainList';

//import { useLocation } from 'react-router-dom';
const Home = ({setFormattedDate, filteredServices, setFilteredServices,title, setTitle,showList, setShowList,leavingFrom,setLeavingFrom,goingTo,setGoingTo}) => {
  useEffect(()=>{
    Aos.init({duration:2000})
  },[])
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  };
  /*const location = useLocation(); // Initialize useLocation hook
  const queryParams = new URLSearchParams(location.search); // Get query parameters from URL
  const leavingFromParam = queryParams.get('leavingFrom'); // Get leavingFrom query parameter
  const goingToParam = queryParams.get('goingTo'); // Get goingTo query parameter
*/
  /*const [leavingFrom, setLeavingFrom] = useState('');
  const [goingTo, setGoingTo] = useState('');
  */
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  {/*const [filteredServices, setFilteredServices] = useState([]);
  const [title, setTitle] = useState('Source - Destination');
  const [formattedDate, setFormattedDate] = useState('');
*/}
  useEffect(() => {
    const formatted = selectedDate.split('-').reverse().join('-');
    setFormattedDate(formatted);
  }, [selectedDate]);
  const filterServices = () => {
    return MainList.filter(service => {
      
      if (leavingFrom && !service.origin.toLowerCase().includes(leavingFrom.toLowerCase())) {
        return false;
      }
      if (goingTo && (!service.destination.toLowerCase().includes(goingTo.toLowerCase()) && !service.via.toLowerCase().includes(goingTo.toLowerCase())))  {
        return false;
      }
      if (selectedDate) {
        // Assuming service.day is in the format 'Monday', 'Tuesday', etc.
        const serviceDate = new Date(selectedDate);
        const serviceDay = serviceDate.toLocaleString('en-US', { weekday: 'long' });
        if (service.day !== serviceDay) {
          return false;
        }
      }
      return true;
    });
  };
  const applyFilters = () => {
    if (!leavingFrom || !goingTo || !selectedDate) {
      alert("Please fill in all fields.");
      return;
    }
    const filtered = filterServices();
    setFilteredServices(filtered);
    if (filtered.length === 0) {
      alert("No matching data found.");
    }
    else {
      // Update the title when data is found
      setTitle(`${leavingFrom} - ${goingTo}`);
    }
    setShowList(
      {display:'block'}
    )
  };
  return (
    <section id='home'>
      {/*<div className='overlay'></div>*/}
      <img src={img} alt="" />
      <div className="homeContent container">
        {/*<div className="textDiv">
          <h3 className="homeTitle">Search for vehicle</h3>
        </div>
       */}
        <div data-aos='fade-up' className="cardDiv grid">
        <h3 className="homeTitle">Search for vehicle</h3>
          <div  class="inputField">
          <div className="sourceInput">
            {/*<label htmlFor="city">Search your destination</label>*/}
            <div className="input flex">
              <input type="text" name="" id="" placeholder='Leaving from' onChange={(e) => setLeavingFrom(e.target.value)} value={leavingFrom}/>
              <FaLocationDot className='icon' />
            </div>
          </div>
          <div className="destinationInput">
           {/* <label htmlFor="city">Search your destination</label>*/}
            <div className="input flex">
              <input type="text" name="" id="" placeholder='Going to' onChange={(e) => setGoingTo(e.target.value)} value={goingTo}/>
              <FaLocationDot className='icon' />
            </div>
          </div>
          <div className="dateInput">
            {/*<label htmlFor="city">Search your destination</label>*/}
            <div className="input flex">
              <input type='date' name="" id="" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
              
            </div>
          </div>
          </div>
          <div className='search'>
            <div className='input flex search'>
              <input type="submit" value="Search" id='' placeholder='search' onClick={applyFilters}/>
            </div>
          </div>
          {/*{filteredServices.length > 0 && (
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
        </div>
        {/*<div>
        {
                    filteredServices.map((e,i)=>{
                        return(
                            <tr key={i}>
                                <td>{e.serviceNo}</td>
                                <td>{e.departureTime} - {e.arrivalTime}</td>
                                <td>{e.origin} - {e.destination}<br/><p>{e.via}</p></td>
                            </tr>
                        );
                    })
                }
        </div>*/}
      </div>
      
    </section>
  )
}

export default Home
