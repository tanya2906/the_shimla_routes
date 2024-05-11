import React ,{useState,useEffect}from 'react'
import './Home.css';
import { FaLocationDot } from "react-icons/fa6";
import Aos from 'aos';
import 'aos/dist/aos.css';
import img from '../../Assets/ridge1.jpg';
import { MainList } from '../MainList';
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
        setRoutes(routesLists);
       
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
  
  
  /*
  const applyFilters = () => {
    if (!leavingFrom || !goingTo || !selectedDate) {
      alert("Please fill in all fields.");
      return;
    }
    //const filtered = filterServices();
    //setFilteredServices(filtered);
    const routesRef=collection(db,"routes");
    onSnapshot(routesRef,(snapshot)=>{
      const routesLists=snapshot.docs.map((doc)=>({
        
          id:doc.id,
          ...doc.data(),
          
        }));
        
      
      //console.log(routesLists);
      const filteredRoutes=routesLists.filter(
        (service) => {

          if (leavingFrom && !service.origin.toLowerCase().includes(leavingFrom.toLowerCase())) {
            return false;
          }
          if (goingTo && (!service.destination.toLowerCase().includes(goingTo.toLowerCase()) && !service.via.toLowerCase().includes(goingTo.toLowerCase()))) {
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
        }
      );
      //setRoutes(filteredRoutes);
      //console.log(routes);
      //console.log(filteredRoutes);
      //return filteredRoutes;

    
    if (filteredRoutes.length === 0) {
      alert("No matching data found.");
    }
    else {
      // Update the title when data is found
      setTitle(`${leavingFrom} - ${goingTo}`);
    }
    setShowList(
      { display: 'block' }
    );
    setRoutes(filteredRoutes);
  });
  };*/
  //console.log(routes);
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
           if( i.origin.toLowerCase().includes(leavingFrom.toLowerCase()) &&
            (i.destination.toLowerCase().includes(goingTo.toLowerCase()) || i.via.toLowerCase().includes(goingTo.toLowerCase())) &&
              i.day.toLowerCase().includes(day.toLowerCase()))
              {
                c++;
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
                <input type='date' name="" id="" value={selectedDate} onChange={(e) => (setSelectedDate(e.target.value),setShowList({ display: 'none' }))} />

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
                    <th>Service No.</th>
                    <th>Departure Time - Arrival Time</th>
                    <th>Origin - Destination</th>
                    <th>Type</th>
                  </tr>
                  </thead>
                  <tbody>
                  {routes.filter(
                    i=>(
                      i.origin.toLowerCase().includes(leavingFrom.toLowerCase()) &&
                      (i.destination.toLowerCase().includes(goingTo.toLowerCase()) || i.via.toLowerCase().includes(goingTo.toLowerCase())) &&
                      i.day.toLowerCase().includes(day.toLowerCase())

                    )
                  ).map((e) => {
                    return (
                      <tr key={e.id}>
                        <td>{e.serviceNo}</td>
                        <td>{e.departureTime} - {e.arrivalTime}</td>
                        <td>{e.origin} - {e.destination}<br /><p>{e.via}</p></td>
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
