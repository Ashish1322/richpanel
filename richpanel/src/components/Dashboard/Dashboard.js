import React, { useEffect, useState } from 'react'
import './dashboard.css'
import { signOut } from 'firebase/auth'
import PlanCard from '../PlanCard.js/PlanCard'
import { auth } from '../../firebase'
import {  toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { get,ref,child } from 'firebase/database'
import { db } from '../../firebase'
export default function Dashboard() {

  const [paymenst,setPayments] = useState(null)
  
  useEffect(()=> {
    get(child(ref(db),'payments')).then(snapshot => {
        if (snapshot.exists()) {
            const data = snapshot.val()
            const header = Object.keys(data)
            let ans = []
            for(var i = 0 ; i <header.length ; i++)
            {
              let a = data[header[i]].id
              let b= auth.currentUser.uid
              if(a===b)
              {
                
                ans.push(data[header[i]])
              }
              
            }
            setPayments(ans)
        } 
        else {
            console.log("No data available");
        }
    })
},[])

  const navigate = useNavigate()

  const logout = () => {
    signOut(auth).then(
        toast.success("Logged Out ", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    )
    navigate("/login")
  }

  return (
  <div style={{width:"100%"}}>
        <h1 style={{color:"white",textAlign:"center"}}> Welcome {auth.currentUser?.displayName}</h1>
        <div style={{display:"flex",justifyContent:"center"}}>   
        <button onClick={logout} className='btn' style={{backgroundColor:"white",color:"#1e4c91",width:"inherit",margin:'10px'}}>Log Out</button>
        <Link to="/plans" className='btn' style={{backgroundColor:"white",color:"#1e4c91",width:"inherit"}}>Browse Plans</Link>
        </div>  
        {
          paymenst ? 
          <div style={{display:"flex",justifyContent:"center",flexWrap: "wrap",gap:"20px"}}>
            {
              paymenst.map((item)=>   <PlanCard key={item.id} period={item.period} type="active" status={item.status} plan={item.planName} amount={item.amount}  data={item} />)
            }
     
      
        
        </div>:
          <h2 style={{textAlign:"center",color:"white",marginTop:"40px"}}> Please Wait, We are Fetching Data....</h2>
        }
    
        
    
    
       
</div>
  )
}
