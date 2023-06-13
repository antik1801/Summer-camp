import { loadStripe } from "@stripe/stripe-js";
import Perallax from "../../../../components/Shared/Perallax";
import { Elements } from "@stripe/react-stripe-js";
import Checkoutform from "../../../../components/Shared/Checkoutform";

// TODO: provide publishable key
const stripePromise=loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY)
const Payment = () => {
    return (
        <div className="w-full">
            <div className="object-cover">
            <Perallax heading={"Payment"} img="ashneer.webp"></Perallax>
            </div>
        <div className=" justify-center items-center text-center">
            <p className="text-3xl font-extrabold">Payment</p>
            <Elements stripe={stripePromise}>
                <Checkoutform></Checkoutform>
            </Elements>
        </div>
        </div>
    );
};

export default Payment;