import { loadStripe } from "@stripe/stripe-js";
import Perallax from "../../../../components/Shared/Perallax";
import { Elements } from "@stripe/react-stripe-js";
import Checkoutform from "../../../../components/Shared/Checkoutform";
import useCarts from "../../../../hooks/useCarts";
import { useParams } from "react-router-dom";
import Loader from "../../../../components/Shared/Loader";

// TODO: provide publishable key
const stripePromise=loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY)
const Payment = () => {
    const [cart,isLoading] = useCarts()
    const {id} = useParams()
    // console.log(id)
    // console.log(cart.map(item=>item._id))
    if (isLoading) {
        return <Loader></Loader>
    }
    const target = cart.find(item=>item._id === id)
    // const price = parseFloat((target.price).toFixed(2))
    console.log('target-price', target.price)
    return (
        <div className="w-full">
            <div className="object-cover">
            <Perallax heading={"Payment"} img="ashneer.webp"></Perallax>
            </div>
        <div className=" justify-center items-center text-center">
            <p className="text-xl font-semibold">Course:{target.course}</p>
            <p className="text-xl">Instructor: {target.istructor}</p>
            <p className="text-3xl font-extrabold">Payment: $ {target.price}</p>
            <Elements stripe={stripePromise}>
                <Checkoutform price={target.price} target={target}></Checkoutform>
            </Elements>
        </div>
        </div>
    );
};

export default Payment;