import React, { useState, useEffect } from 'react';
import { galleryIMG } from './galleryIMG';
import './Gallery.css';
import { IoMdCloseCircle } from "react-icons/io";

import Aos from 'aos';
import 'aos/dist/aos.css';
//import {db} from '../firebase';
//import { collection,getDocs } from 'firebase/firestore';
const Gallery = () => {
    useEffect(()=>{
        Aos.init({duration:2000})
      },[])
    /*const [imgGallery,setImgGallery]=useState([]);
      useEffect(()=>{
        const imageGallery=async()=>{
          try{
            const imageGalleryRef=collection(db,'gallery');
            const imageGallerySnapshot=await getDocs(imageGalleryRef);
            const imageGalleryLists=imageGallerySnapshot.docs.map((doc)=>{
              return{
                id: doc.id,
                ...doc.data(),
              }
            });
            setImgGallery(imageGalleryLists);
           
          }
          catch(error){
            console.log(error);
          }
        }
        imageGallery();
      },[]);
    */
    const [model,setModel]=useState(false);
    const [currentImg, setCurrentImg]=useState('');
    const [imgCount,setImgCount]=useState(6);
    const [text,setText]=useState('more');
    const getImg=(src)=>{
        setCurrentImg(src);
        setModel(true);
    }
    const changeCount=()=>{
        if(imgCount===6)
            {
                setImgCount(galleryIMG.length);
                setText('less');
            }
        else{
            setImgCount(6);
            setText('more');
        }
    }
    return (
    <section id='gallery'>
       { /*{
            imgGallery.map((e)=>{
                return(
                    <img key={e.id} src={e.src} alt="" />
                );
            })
        }*/}
        <div data-aos='fade-up' className="secTitle">
            <h1 className='title'>Gallery</h1>
        </div>
        <div className={model?'model open':'model'}>
            <img src={currentImg} alt=""/>
            <IoMdCloseCircle className='icon' onClick={()=>setModel(false)}/>
        </div>
        <div  className='secContent '>
            {
                galleryIMG.filter(e=>e.id<=imgCount).map((e,i)=>{
                    
                    return(
                        <div key={i} className='imgDiv' onClick={()=>getImg(e.src)}>
                            <img data-aos='fade-up'src={e.src} alt="" />
                        </div>
                    );
                })
                    
            }
        </div>
        <span className='toggleBtn' onClick={() => changeCount()}>{text}</span>
        
    </section>
  )
}

export default Gallery