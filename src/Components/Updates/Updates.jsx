import React,{useEffect} from 'react'
import './Updates.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { UpdatesList } from './UpdatesList';
const Updates = () => {
    
    useEffect(()=>{
            Aos.init({duration:2000})
          },[])
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
    <section data-aos='fade-up' className='updates'>
        <div data-aos='fade-up' className="titleDiv">
            <h3 className="title">News & Events</h3>
        </div>
        <div className="secContent"  >
            <marquee onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} behavior="scroll" direction="up" scrollamount="2" scrollDelay="100" loop='infinite'>
              { UpdatesList.map((e,i)=>{
                return(
                  <p key={i}>{e.content}</p>
                );
               })
              }
            </marquee>
            
        </div>
    </section>
  )
}

export default Updates;