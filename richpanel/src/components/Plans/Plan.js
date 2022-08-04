import React, {useEffect, useState} from 'react'
import './plan.css'
import { db } from '../../firebase'
import { get, ref , child } from 'firebase/database'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Plan({change}) {

    const [plans,setPlans] = useState(null)
    const [togggle,setToggle] = useState("month")
    const [selectedPlan,setPlan] = useState("Basic")
    const navigate = useNavigate()


    useEffect(()=> {
        get(child(ref(db),'mydb/monthlyPlans')).then(snapshot => {
            if (snapshot.exists()) {
                setPlans(snapshot.val())
    
            } 
            else {
                console.log("No data available");
            }
        })
    },[])

    const subscribePlan = () =>{
        const period = togggle
        const planName = selectedPlan.toLowerCase()
        const plan = plans[selectedPlan.toLowerCase()]
        navigate('/payment',{state: {period: period,plan:planName,planInfo:plan}})
   
    }

    const setPlanName = (e) =>{
        if(e.target.innerText == "Standard")
        {
            setPlan("Standarad")
            return
        }
        setPlan(e.target.innerText)
    }
    const active = {
    
        margin: "2px 10px",
        border: "none",
        backgroundColor: "white",
        color: "var(--primary)",
        fontWeight: "bold",
        borderRadius: "10px",
        

    
    }

  return (
    
        plans 
        ? 
        <div className="plans__card">
             <Link  to='/dashboard/' onClick={change} className='btn btn__secondary' style={{backgroundColor:"transparent",border:"1px solid #1e4d90",color:"#1e4d90",width:"inherit"}}>View Dashboard</Link>
        <h3>Choose the right plan for you</h3>
       
        <table>
            
            <tr>
                <th>
                    <div id='toggle' >

                        <button 
                        onClick={()=>setToggle("month")}
                        style={togggle === "month" ? active : {}}>Monthly
                        </button>

                        <button
                        onClick={()=>setToggle("year")}
                        style={togggle === "year" ? active : {}}>Yearly

                        </button>
                    </div>
                </th>
               
                <th className='box__head'>
                    <div onClick={setPlanName} style={selectedPlan==="Basic" ?{backgroundColor: "#1e4d90",opacity: 1} : {}}>
                        Basic
                    </div>
                </th>
                <th className='box__head'>
                    <div onClick={setPlanName} style={selectedPlan==="Standard" ?{backgroundColor: "#1e4d90",opacity: 1} : {}}>
                    Standard
                    </div>
                </th>
                <th className='box__head'>
                    <div onClick={setPlanName} style={selectedPlan==="Premium" ?{backgroundColor: "#1e4d90",opacity: 1} : {}}>
                        Premium
                    </div>
                </th>
                <th className='box__head'>
                    <div onClick={setPlanName} style={selectedPlan==="Regular" ?{backgroundColor: "#1e4d90",opacity: 1} : {}}>
                        Regular
                    </div>
                </th>
                 
            </tr>

          {
            togggle === "month" ? 
            <tr>
                <td> 
                   Monthly Price
                </td>
                <td style={selectedPlan==="Basic" ?{color: "#1e4d90",fontWeight: "bold"} : {}}>
                &#8377; {(plans.basic)["Monthly-Price"]}
                </td>
                <td style={selectedPlan==="Standarad" ?{color: "#1e4d90",fontWeight: "bold"} : {}}>
                &#8377; {(plans.standarad)["Monthly-Price"]}
                </td>
                <td style={selectedPlan==="Premium" ?{color: "#1e4d90",fontWeight: "bold"} : {}}>
                &#8377; {(plans.premium)["Monthly-Price"]}
                </td>
                <td style={selectedPlan==="Regular" ?{color: "#1e4d90",fontWeight: "bold"} : {}}>
                &#8377; {(plans.regular)["Monthly-Price"]}
                </td>
            </tr> :
            <tr>
            <td> 
               Monthly Price
            </td>
            <td style={selectedPlan==="Basic" ?{color: "#1e4d90",fontWeight: "bold"} : {}}>
            &#8377; {(plans.basic)["Yearly-Price"]}
            </td>
            <td style={selectedPlan==="Standarad" ?{color: "#1e4d90",fontWeight: "bold"} : {}}>
            &#8377; {(plans.standarad)["Yearly-Price"]}
            </td>
            <td style={selectedPlan==="Premium" ?{color: "#1e4d90",fontWeight: "bold"} : {}}>
            &#8377; {(plans.premium)["Yearly-Price"]}
            </td>
            <td style={selectedPlan==="Regular" ?{color: "#1e4d90",fontWeight: "bold"} : {}}>
            &#8377; {(plans.regular)["Yearly-Price"]}
            </td>
        </tr>
          }
            

            <tr>
                <td> 
                   Vidoe Qulaity
                </td>
                <td style={selectedPlan==="Basic" ?{color: "#1e4d90",fontWeight: "bold"} : {}}>
                {(plans.basic)["Video-Quality"]}
                </td>
                <td style={selectedPlan==="Standarad" ?{color: "#1e4d90",fontWeight: "bold"} : {}}>
                {(plans.standarad)["Video-Quality"]}
                </td>
                <td style={selectedPlan==="Premium" ?{color: "#1e4d90",fontWeight: "bold"} : {}}>
                {(plans.premium)["Video-Quality"]}
                </td>
                <td style={selectedPlan==="Regular" ?{color: "#1e4d90",fontWeight: "bold"} : {}}>
                {(plans.regular)["Video-Quality"]}
                </td>
            </tr>
            <tr>
                <td> 
                   Resolution
                </td>
                <td style={selectedPlan==="Basic" ?{color: "#1e4d90",fontWeight: "bold"} : {}}>
                {(plans.basic)["Resolution"]}
                </td>
                <td style={selectedPlan==="Standarad" ?{color: "#1e4d90",fontWeight: "bold"} : {}}>
                {(plans.standarad)["Resolution"]}
                </td>
                <td style={selectedPlan==="Premium" ?{color: "#1e4d90",fontWeight: "bold"} : {}}>
                {(plans.premium)["Resolution"]}
                </td>
                <td style={selectedPlan==="Regular" ?{color: "#1e4d90",fontWeight: "bold"} : {}}>
                {(plans.regular)["Resolution"]}
                </td>
            </tr>
            <tr>
                <td> 
                   Number of Active Screens at one Time
                </td>
               
                <td style={selectedPlan==="Basic" ?{color: "#1e4d90",fontWeight: "bold"} : {}}>
                {(plans.basic)["Number-of-active-screens-at-one-time"]}
                </td>
                <td style={selectedPlan==="Standarad" ?{color: "#1e4d90",fontWeight: "bold"} : {}}>
                {(plans.standarad)["Number-of-active-screens-at-one-time"]}
                </td>
                <td style={selectedPlan==="Premium" ?{color: "#1e4d90",fontWeight: "bold"} : {}}>
                {(plans.premium)["Number-of-active-screens-at-one-time"]}
                </td>
                <td style={selectedPlan==="Regular" ?{color: "#1e4d90",fontWeight: "bold"} : {}}>
                {(plans.regular)["Number-of-active-screens-at-one-time"]}
                </td>
            </tr>

           <tr>
                <td id='watch'>
                    <p >Device you can use to watch
                    </p>
                    <p >Device you can use to watch
                    </p>
                    <p>
                    Device you can use to watch
                    </p>
                    <p>Device you can use to watch
                    </p>
                </td>
                <td id='two' >  
               
                    <p style={{visibility:"visible"}}>Phone</p>
                    <p >Tablet</p>
                    <p>tab</p>
                    <p>tab</p>
             
                   
                </td>
                <td>  
                      
                        <p>Phone</p>
                        <p>Tablet</p>
                        <p style={{visibility: "hidden"}}>Computer</p>
                        <p style={{visibility:"hidden"}}>TV</p>
                
                        
                </td>
                <td>  
                  
                        <p>Phone</p>
                        <p>Tablet</p>
                        <p>Computer</p>
                        <p style={{visibility:"hidden"}}>TV</p>

                  
                </td>
                <td>  
                     
                        <p>Phone</p>
                        <p>Tablet</p>
                        <p>TV</p>
                        <p style={{visibility:"hidden"}}>TV</p>
                  
                </td>
           </tr>

        </table>

        <button onClick={subscribePlan}  className='btn' id='next'>Next</button>

    </div>

        :
        <h1 style={{color:"white"}}>Please Wait, Loading Plans...</h1>
 
   
      

  )
}
