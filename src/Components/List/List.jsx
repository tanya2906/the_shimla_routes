import React from 'react'
import './List.css';
import { MainList } from '../MainList';
const List = () => {
  return (
    <section className='list'>
        <div className="titleDiv">
            <h1 className='title'>Source - Destination</h1>
            <span>
                <p>09-05-2024</p>
            </span>
        </div>
        <div className="secContent">
            <table>
                <tr>
                    <th>Service No.</th>
                    <th>Departure Time - Arrival Time</th>
                    <th>Origin - Destination</th>
                </tr>
                
                {
                    MainList.map((e,i)=>{
                        return(
                            <tr key={i}>
                                <td>{e.serviceNo}</td>
                                <td>{e.departureTime} - {e.arrivalTime}</td>
                                <td>{e.origin} - {e.destination}<br/><p>{e.via}</p></td>
                            </tr>
                        );
                    })
                }
            </table>
        </div>
    </section>
  )
}

export default List