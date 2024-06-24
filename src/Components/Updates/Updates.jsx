import React,{useEffect, useState} from 'react'
import './Updates.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { db } from '../firebase';
import { collection,getDocs } from 'firebase/firestore';

import { UpdatesList } from './UpdatesList';
const Updates = () => {
    
    useEffect(()=>{
            Aos.init({duration:2000})
          },[])
    const [updates,setUpdates]=useState([]);
    useEffect(()=>{
      const getUpdates=async()=>{
      try{
        const updatesRef=collection(db,'news');
        const updatesSnapshot=await getDocs(updatesRef);
        const updatesLists=updatesSnapshot.docs.map((doc)=>{
          return{
            id:doc.id,
            ...doc.data(),
          }
        });
        setUpdates(updatesLists);
      }
      catch(error){
        console.log(error);
      }
      }
      getUpdates();
    },[]);
    const handleMouseOver = () => {
        const marquee = document.querySelector('.marquee');
        if (marquee) {
          marquee.stop();//problemm.... not working
        }
      };
    
      const handleMouseOut = () => {
        const marquee = document.querySelector('.marquee');
        if (marquee) {
          marquee.start();//problemm.... not working
        }
      };
  return (
    <section data-aos='fade-up' className='updates' id='updates'>
        <div data-aos='fade-up' className="titleDiv">
            <h3 className="title">News & Events</h3>
        </div>
        <div className="secContent"  >
            <marquee onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} behavior="scroll" direction="up" scrollamount="2" scrolldelay="100" loop='infinite'>
              { updates.map((e)=>{
                return(
                  <p key={e.id}>{e.content}</p>
                );
               })
              }
            </marquee>
            
        </div>
    </section>
  )
}

export default Updates;