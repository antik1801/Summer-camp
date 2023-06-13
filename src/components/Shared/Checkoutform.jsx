import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";


const Checkoutform = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async event =>{
        event.preventDefault();

        if (!stripe || !elements) {
            return 
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }


    }
    return (
        <form onSubmit={handleSubmit} className="w-2/3 mx-auto my-10 border-2 p-5 border-blue-400 shadow-xl rounded-xl">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe} className="btn btn-primary mt-5">
        Pay
      </button>
    </form>
    );
};

export default Checkoutform;