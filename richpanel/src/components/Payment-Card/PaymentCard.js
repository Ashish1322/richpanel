import React from 'react'
import './payment.css'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import  { useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import {  toast } from 'react-toastify';
import { db } from '../../firebase'
import { ref , serverTimestamp,  update, push, child} from 'firebase/database'

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "grey",
			color: "black",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "grey" },
			"::placeholder": { color: "grey" }
		},
		invalid: {
			iconColor: "red",
			color: "red"
		}
	}
}


export default function PaymentCard() {


    const [loading, setLoading ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate();

    const { state } = useLocation();
    const {period,plan,planInfo}= state
   

    function writeUserData(id) {
        const data = {
          username: auth.currentUser.displayName,
          status: "active",
          planName: plan.toUpperCase(),
          amount: period==="year" ? planInfo["Yearly-Price"]:planInfo["Monthly-Price"],
          period: period==="year" ?"yr":"mo",
          planId: id,
          id: auth.currentUser.uid
        }
        const newPostKey = push(child(ref(db), 'payments')).key;
        const updates = {};
        updates['/payments/' + newPostKey] = data;;
      
        update(ref(db),updates)
      }

    const handleSubmitSub = async (event) => {
        setLoading(true)
        event.preventDefault();
        if (!stripe || !elements) {
        
          return;
        }
    
        const result = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
          billing_details: {
            email: auth.currentUser.email,
            address:"India",
            name:auth.currentUser.displayName
          },
        });
    
        if (result.error) {
          console.log(result.error.message);
        } else {
          const res = await axios.post('https://richpanelak.herokuapp.com/sub', {'payment_method': result.paymentMethod.id, 'email': auth.currentUser.email});
          // eslint-disable-next-line camelcase

          const {client_secret, status,id} = res.data;
          if (status === 'requires_action') {
            stripe.confirmCardPayment(client_secret).then(function(result) {
              if (result.error) {
             
                //Errr
                toast.error("Something Went Wrong ! Please Try again", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
               
              } else {
                console.log(result)
                writeUserData(result.paymentIntent.id)
                toast.success("Subscription Seccuessfull!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });

                navigate("/dashboard")
              }
            });
          } else {
            console.log('You got the money!');
            toast.success("Subscription Seccuessfull!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            navigate("/dashboard")

          }
        }
        setLoading(false)
      };
    

  return (

        <div className='payment__card'>
        <div className="payment__info">
            <h2>Complete Payment</h2>
            <small>Enter your credit or debit card details below</small>
            <form onSubmit={handleSubmitSub} >
            
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>

            <input className='btn' id='payment'  value={loading ? "Processing Payment...." : "Confirm Payment"} type="submit" />
             
            </form>
        </div>

        <div className="order__info">
            <h3>Order Summary</h3>
            <ul>
                <li>
                    Plan Name 
                    <span>
                        {plan}
                    </span>
                </li>
                <hr />
                <li>
                    Billing Cycle
                    <span>
                        {period==="year" ? "Yearly" : "Monthly"}
                    </span>
                </li>
                <hr />
                <li>
                    Plan Price
                    <span>
                    &#8377;  {period==="year" ? planInfo["Yearly-Price"]:planInfo["Monthly-Price"]}
                    </span>
                </li>
                <hr></hr>
            </ul>
        </div>
    </div> 

    
  
   
  )
}
