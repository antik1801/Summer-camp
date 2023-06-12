import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePendingClasses = () => {
    const [axiosSecure] = useAxiosSecure()
    const {isLoading, refetch, data: pendingClasses = []} = useQuery({
        queryKey: ["pendingClasses"],
        enabled: !!localStorage.getItem("access-token"),
        queryFn: async ()=>{
            const res = await axiosSecure.get("/pendingClasses?status=pending")
            return res.data;
        }
    })
    return [pendingClasses, refetch, isLoading];
};

export default usePendingClasses;