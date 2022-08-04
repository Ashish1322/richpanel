const express = require("express")
const app = express()
require("dotenv").config()
const stripe = require("stripe")("SECRECT KEY STRIPE HERE")

const bodyParser = require("body-parser")
const cors = require("cors")

const port = process.env.PORT || 3000


// parse application/json
app.use(express.json())

app.use(cors())

app.get('/',(req,res)=>res.send("Working Fine"))
app.post('/sub', async (req, res) => {
	const {email, payment_method} = req.body;
  
	const customer = await stripe.customers.create({
	  payment_method: payment_method,
	  email: email,
	  invoice_settings: {
		default_payment_method: payment_method,
	  },
	});
  
	const subscription = await stripe.subscriptions.create({
	  customer: customer.id,
	  items: [{ plan: 'price_1LSyirSDr67aca5VWLnBfysq' }],
	  expand: ['latest_invoice.payment_intent']
	});
	
	const status = subscription['latest_invoice']['payment_intent']['status'] 
	const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']
  
	res.json({'client_secret': client_secret, 'status': status});
  })
  
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
