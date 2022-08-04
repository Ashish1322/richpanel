import React from 'react'
import './plancard.css'
export default function PlanCard({type,status,amount,plan,period}) {
  return (
    <div className='card plan__card' >
        <div className="card__header">
            <div className='header__left'>
                 <h3>Current Plan Details </h3>
                 {
                    type==="active" ? <span className='active__badge'>Active</span>
                     : <span className='cancel__badge'>{status}</span>
                 }
                
            </div>
           
           {
            type==="active" ? <button> Cancel</button> : null
           }
            
        </div>

        <p>{plan}</p>
   
        <h1>&#8377; {amount}/<sub style={{fontWeight: 'normal'}}>{period}</sub></h1>
        <button className='btn btn__secondary' id='pbtn'>
            {type==="active" ? "Change Plan" : "Choose Plan" }</button>

        <p>
            
                Your subscription has started. Enjoy your plan. Thankyou for using our service. For any query feel free to contact us
            
            
        </p>


    </div>
  )
}
