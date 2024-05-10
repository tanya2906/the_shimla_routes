import React ,{useEffect,useRef}from 'react'
import './Footer.css';
import { FiSend } from "react-icons/fi";
import { FaInstagram,FaFacebook, FaChevronRight} from "react-icons/fa";
import Image2 from '../../Assets/ridge.jpg';
import Aos from 'aos';
import 'aos/dist/aos.css';
import emailjs from '@emailjs/browser';
const Footer = () => {
  const form=useRef();
  useEffect(()=>{
    Aos.init({duration:2000})
  },[])
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_fqkk3um', 'template_apzf83a', form.current, {
        publicKey: 'rioU-KlpKvMCHN5Vz',
      })
      .then(
        () => {
          alert('SUCCESS!')
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
      e.target.reset();
  };
  return (
    <section id='footer'>
      <div className="imgDiv">
        <img src={Image2} alt="" />
      </div>
      <div className="secContent container">
        <div className="contactDiv flex">
          <div data-aos='fade-up'className='text'>
              <small>KEEP IN TOUCH</small>
              <h2>{/*Travel*/}Find with us</h2>
          </div>
          <form ref={form} onSubmit={sendEmail}>
          <div  data-aos='fade-up' className="inputDiv flex">
            
            <input  type="email" name="email" id="" placeholder='Enter Email Address'/>
            <input type="text" name="message" id="" placeholder='Message'/>
            <button type="submit" className='btn flex'>
             SEND<FiSend className='icon'/>
            </button>
          </div>
          </form>
        </div>
        <div data-aos='fade-up' className="footerCard flex">
          <div className="footerIntro flex">
            <div data-aos='fade-right' data-aos-duration="5000" className="logoDiv">
              <a href="#" className="logo flex">
                The Shimla Routes
              </a>
            </div>
            <div data-aos='fade-right' data-aos-duration="5000" className="footerSocials flex">
            <a href="https://www.instagram.com/the_shimla_routes/" target='__blank'><FaInstagram className='icon'/></a>
            <a href="https://www.facebook.com/profile.php?id=61559316126648" target='__blank'><FaFacebook className='icon'/></a>
            </div>
          </div>
          {/* 
          <div className="footerLinks grid">
            <div data-aos='fade-right' data-aos-duration="5000" className="linkGroup">
              <span className="groupTitle">OUR AGENCY</span>
              <li className="footerList flex">
              <FaChevronRight className='icon'/>
              Services
              </li>
              <li className="footerList flex">
              <FaChevronRight className='icon'/>
              Services
              </li>
              <li className="footerList flex">
              <FaChevronRight className='icon'/>
              Services
              </li>
              <li className="footerList flex">
              <FaChevronRight className='icon'/>
              Services
              </li>
            </div>
            <div data-aos='fade-right' data-aos-duration="5000" className="linkGroup">
              <span className="groupTitle">OUR AGENCY</span>
              <li className="footerList flex">
              <FaChevronRight className='icon'/>
              Services
              </li>
              <li className="footerList flex">
              <FaChevronRight className='icon'/>
              Services
              </li>
              <li className="footerList flex">
              <FaChevronRight className='icon'/>
              Services
              </li>
              <li className="footerList flex">
              <FaChevronRight className='icon'/>
              Services
              </li>
            </div>
            <div data-aos='fade-right' data-aos-duration="5000" className="linkGroup">
              <span className="groupTitle">OUR AGENCY</span>
              <li className="footerList flex">
              <FaChevronRight className='icon'/>
              Services
              </li>
              <li className="footerList flex">
              <FaChevronRight className='icon'/>
              Services
              </li>
              <li className="footerList flex">
              <FaChevronRight className='icon'/>
              Services
              </li>
              <li className="footerList flex">
              <FaChevronRight className='icon'/>
              Services
              </li>
            </div>
          </div>
          */}
          <div className="footerDiv flex">
            <small>BEST ROUTE WEBSITE</small>
            <small>COPYRIGHTS RESERVED - TANYA2024</small>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
