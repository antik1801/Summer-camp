import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Loader from "./Loader";
import { toast } from "react-toastify";

const Checkoutform = () => {
  const [cardLoading, setCardLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCardLoading(true);
    if (!stripe || !elements) {
      setCardLoading(false);
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      setCardLoading(false);
      return;
    }
    // console.log("Card", card);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCardLoading(false);
      setCardError(error.message);
      toast.error(error.message)
      console.log("error", error.message);
    } else {
      setCardLoading(false);
      setCardError("");
      console.log("Payment method", paymentMethod);
    }
  };
  // if (cardLoading) {
  //     return <Loader></Loader>
  // }
  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="w-2/3 mx-auto my-10 border-2 p-5 border-blue-400 shadow-xl rounded-xl"
    >
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe} className="btn btn-primary mt-5">
        Pay
      </button>
    </form>

    </>
  );
};

export default Checkoutform;
