import Perallax from "../../../../components/Shared/Perallax";

const Payment = () => {
    return (
        <div className="w-full">
            <div className="object-cover xl:-mt-40">
            <Perallax heading={"Payment"} img="ashneer.webp"></Perallax>
            </div>
        <div className="flex flex-col justify-center items-center text-center">
            <p className="text-3xl font-extrabold">Payment</p>
        </div>
        </div>
    );
};

export default Payment;