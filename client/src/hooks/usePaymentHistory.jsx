import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePaymentHistory = () => {
    const {loading, user} = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const {isLoading, refetch, data: payments = []} = useQuery({
        queryKey: ['payments'],
        enabled: !loading && !!user?.email && !!localStorage.getItem("access-token"),
        queryFn: async() =>{
            const res = await axiosSecure(`/paymentHistory?email=${user?.email}`)
            return res.data
        }
    })
    return [payments, refetch, isLoading]
};

export default usePaymentHistory;