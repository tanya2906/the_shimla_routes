import React,{useEffect, useState} from 'react'
import './Main.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

import {db} from '../firebase';
import { collection,getDocs } from 'firebase/firestore';
const Main = ({ setShowList,setLeavingFrom,setGoingTo}) => {
  useEffect(()=>{
    Aos.init({duration:2000})
  },[])
  
 const [today,setToday]=useState();
 useEffect(()=>{
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

    let DATE=`${year}-${month}-${day}`;
    let final = new Date(DATE);
    let Day = final.toLocaleString('en-US', { weekday: 'long' });
    setToday(Day);
 },[]);
 const [routeBTN,setRouteBTN]=useState([]);
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
        setRouteBTN(routesLists);
       
      }
      catch(error){
        console.log(error);
      }
    }
    getRoutes();
  },[]);
 const routeButton=(e)=>{
  setLeavingFrom(e.origin); 
  setGoingTo(e.destination); 
  
  setShowList(
    {display:'none'}
  )
 }
  return (
    <section className='main container section'>
      <div data-aos='fade-right' className="secTitle">
        <h1 className="title">Most Popular Routes</h1>
      </div>
      <div className="secContent flex">
        {
          routeBTN.filter(i=>(
            i.type.toLowerCase().includes('popular') && 
            i.day.toLowerCase().includes(today.toLowerCase())
           )).map((e) =>{
            return(
              <div data-aos='fade-left' key={e.id} className="btn flex"/*" cardInfo flex"*/>
                <p><a href="#" className='routeLink' onClick={()=>{routeButton(e)}}>{e.origin} - {e.destination}</a></p>
              </div>
            );
          })
        }
      </div>
    </section>
  )
}

export default Main
