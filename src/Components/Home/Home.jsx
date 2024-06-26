import React ,{useState,useEffect}from 'react'
import './Home.css';
import { FaLocationDot } from "react-icons/fa6";
import Aos from 'aos';
import 'aos/dist/aos.css';
import img from '../../Assets/ridge1.jpg';

import {db} from '../firebase';
import { collection,getDocs, onSnapshot } from 'firebase/firestore';
//import { useLocation } from 'react-router-dom';
function Home({  showList, setShowList, leavingFrom, setLeavingFrom, goingTo, setGoingTo }) {
  const [day,setDay]=useState('');
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
  const [title, setTitle] = useState('Source - Destination');
  const [routes,setRoutes]=useState([]);
  const [formattedDate, setFormattedDate] = useState('');
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  //const [filteredServices, setFilteredServices] = useState([]);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  useEffect(() => {
    const formatted = selectedDate.split('-').reverse().join('-');
    setFormattedDate(formatted);
    const DATE = new Date(selectedDate);
    const Day = DATE.toLocaleString('en-US', { weekday: 'long' });
    setDay(Day);
  }, [selectedDate,day]);
  useEffect(()=>{
    const getRoutes=async()=>{
      try{
        const routesRef=collection(db,'routes');
        const routesSnapshot=await getDocs(routesRef);
        const routesLists=routesSnapshot.docs.map((doc)=>{
          return{
            id: doc.id,
            ...doc.data(),
          }
        });
        setRoutes(sortRoutesByDepartureTime(routesLists));
       
      }
      catch(error){
        console.log(error);
      }
    }
    getRoutes();
  },[]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  
  
  const normalizeString = (str) => str.replace(/\s+/g, '').toLowerCase();
  const sortRoutesByDepartureTime = (routes) => {
    return routes.sort((a, b) => {
      const timeA = new Date(`1970/01/01 ${convertTo24HourFormat(a.departureTime)}`);
      const timeB = new Date(`1970/01/01 ${convertTo24HourFormat(b.departureTime)}`);
      return timeA - timeB;
    });
  };
  const convertTo24HourFormat = (time) => {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };
  const displayList=()=>{
    let c=0;
    if (!leavingFrom || !goingTo || !selectedDate) {
      alert("Please fill in all fields.");
      return;
    }
    const routesRef=collection(db,"routes");
    onSnapshot(routesRef,(snapshot)=>{
      const routesLists=snapshot.docs.map((doc)=>({
        
          id:doc.id,
          ...doc.data(),
          
        }));
        routesLists.filter(
          (i) => {
           if(
            (normalizeString(i.origin).includes(normalizeString(leavingFrom)) ||
            normalizeString(i.via).includes(normalizeString(leavingFrom))) &&
            (normalizeString(i.destination).includes(normalizeString(goingTo)) ||
             normalizeString(i.via).includes(normalizeString(goingTo))) &&
            normalizeString(i.day).includes(normalizeString(day))
          )
              {
                c++;
                setTitle(`${capitalizeFirstLetter(leavingFrom)} - ${capitalizeFirstLetter(goingTo)}`);
                setShowList(
                  { display: 'block' }
                );
                return true;
              }
              
            
          }
        );
        
        if(c===0)
          {
            setShowList({ display: 'none' });
            alert('No result found!');
          }
        
      })
    
  }
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
          <div className="inputField">
            <div className="sourceInput">
              {/*<label htmlFor="city">Search your destination</label>*/}
              <div className="input flex">
                <input type="text" name="" id="" placeholder='Leaving from' onChange={(e) => (setLeavingFrom(e.target.value),setShowList({ display: 'none' })  )} value={leavingFrom} />
                <FaLocationDot className='icon' />
              </div>
            </div>
            <div className="destinationInput">
              {/* <label htmlFor="city">Search your destination</label>*/}
              <div className="input flex">
                <input type="text" name="" id="" placeholder='Going to' onChange={(e) => (setGoingTo(e.target.value),setShowList({ display: 'none' }))} value={goingTo} />
                <FaLocationDot className='icon' />
              </div>
            </div>
            <div className="dateInput">
              {/*<label htmlFor="city">Search your destination</label>*/}
              <div className="input flex">
                <input style={{width:'100%'}} type='date' name="" id="" value={selectedDate} onChange={(e) => (setSelectedDate(e.target.value),setShowList({ display: 'none' }))} />

              </div>
            </div>
          </div>
          <div className='search'>
            <div className='input flex search'>
              <input type="submit" value="Search" id='' placeholder='search'onClick={displayList} /*onClick={applyFilters} *//>
            </div>
          </div>
          {routes.length > 0 && (
            <section data-aos='fade-up' style={showList} className='list'>
              <div className="titleDiv">
                <h1 className='title'>{title}</h1>
                <span>
                  <p>{formattedDate}</p>
                </span>
              </div>
              <div className="secContent">
                <table>
                  <thead>
                  <tr>
                    <th className='th1'>Service No.</th>
                    <th className='th2'>Departure Time - Arrival Time</th>
                    <th className='th3'>Origin - Destination</th>
                    <th className='th4'>Type</th>
                  </tr>
                  </thead>
                  <tbody>
                  {routes.filter(
                    i=>(
                      (normalizeString(i.origin).includes(normalizeString(leavingFrom))  || normalizeString(i.via).includes(normalizeString(leavingFrom)))&&
                      (normalizeString(i.destination).includes(normalizeString(goingTo)) || normalizeString(i.via).includes(normalizeString(goingTo))) &&
                      normalizeString(i.day).includes(normalizeString(day))
                    )
                  ).map((e) => {
                    return (
                      <tr key={e.id}>
                        <td>{e.serviceNo}</td>
                        <td>{e.departureTime} - {e.arrivalTime}</td>
                        <td>{e.origin} - {e.destination}<br />{e.via ? <p>[{e.via}]</p> :null}</td>
                        <td>{e.busType}</td>
                      </tr>
                    );
                  })}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
       
      </div>

    </section>
  );
}

export default Home
