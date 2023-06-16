import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import moment from "moment";

const Checkoutform = ({ price, target }) => {
  const [cardLoading, setCardLoading] = useState(false);
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((response) => {
      console.log(response.data.clientSecret);
      setClientSecret(response.data.clientSecret);
    });
  }, [price]);

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
      toast.error(error.message);
      console.log("error", error.message);
    } else {
      setCardLoading(false);
      setCardError("");
      console.log("Payment method", paymentMethod);
    }
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });
    setProcessing(false);
    if (confirmError) {
      console.log(confirmError);
    }
    console.log("Payment intent", paymentIntent);

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const transactionId = paymentIntent.id;
      //TODO NEXT STEPS

      const date = new Date();
      const payment_date = moment(date).format("dddd MMMM YYYY hA");
      console.log(payment_date);
      // save payment information to the server
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        name: user?.displayName,
        course: target.course,
        picture: target.picture,
        instructor: target.istructor,
        paymentDate: payment_date,
        courseId: target._id,
        orderStatus: "paid",
      };

      axiosSecure.post("/payments", payment).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire("Procced!", "Successfull done Payment!", "success");
        }
      });
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
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="btn btn-primary mt-5"
        >
          Pay
        </button>
      </form>
      {transactionId && (
        <p className="text-green-400 font-semibold my-16">
          transactionId: {transactionId}
        </p>
      )}
    </>
  );
};

export default Checkoutform;
