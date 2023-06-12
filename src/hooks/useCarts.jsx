import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loader from "../components/Shared/Loader";
import useAxiosSecure from "./useAxiosSecure";

const useCarts = (email) => {
  const { user, loading } = useContext(AuthContext);
//   const {isLoading, refetch ,data: cart = [] } = useQueryClient();
  const token = localStorage.getItem('access-token')
  const [axiosSecure] = useAxiosSecure()
  const {isLoading, refetch ,data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () =>{
        const res = await axiosSecure(`/carts?email=${user.email}`)
        console.log("res from axios", res);
        // return res.json()
        return res.data
    }
  });
//   if (isLoading) {
//     return <Loader></Loader>;
//   }
//   if (isError) {
//     return <span>Error: {error.message}</span>
//   }
  return [cart, isLoading, refetch]
};

export default useCarts;
