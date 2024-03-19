import { useState } from 'react';
import './index.css';
import movie from 'C:/Users/Administrator/Desktop/projet ful/watch/src/assets/card.jpg';
import StripeContainer from './StripeContainer';
import PaymentForm from "./PaymentForm"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

function Pay() {
	const [showItem, setShowItem] = useState(false);
	const PUBLIC_KEY = "pk_test_51Kj2puGInNuzAevcg4jMVAYDKl80p8rNW7JUR3ViLmKnnxjDSQrJzHGvv15zHBCB0LvDVWEjPSNC8GSKQSeF3HHP00GROcWlsw" ;
 
const stripeTestPromise = loadStripe(PUBLIC_KEY)
	return (
		<div className='App'>
			<h1>watch me</h1>
			{showItem ? (
				<StripeContainer/>
			) : (
				<>
					<h3>$20.00</h3>
					<img className='img' style={{ width: '500px', height: 'auto' , marginLeft: '100px'}} src={movie} alt='movie' />
	
				</>
			)}
			<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
		</div>
		
	);
}

export default Pay;