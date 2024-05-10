import React,{useEffect} from 'react'
import './Main.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { MainList } from '../MainList';

const Main = ({ setShowList,setLeavingFrom,setGoingTo}) => {
  useEffect(()=>{
    Aos.init({duration:2000})
  },[])
  /*
  const Data=[
    { id:1, source:'Summer Hill', destination: 'Khalini', description:'via ' ,time:'3.30 PM',type:'private'},
    { id:2, source:'Shogi', destination: 'Chopal', description:'via ' ,time:'10.30 AM',type:'public popular'},
    { id:3, source:'Theog', destination: 'Kotkhai', description:'via ' ,time:'2.00 PM',type:'public popular'},
    { id:4, source:'Sanjauli', destination: 'Panthaghati', description:'via ' ,time:'10.30 AM',type:'private popular'},
    { id:5, source:'New Shimla', destination: 'Summer hill', description:'via ' ,time:'11.30 AM',type:'private'},
  ];
  */
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
          MainList.filter(i=>i.type.toLowerCase().includes('popular')).map((e,j) =>{
            return(
              <div data-aos='fade-left' key={j} className="btn flex"/*" cardInfo flex"*/>
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
