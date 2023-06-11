import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loader from "../components/Shared/Loader";

const useCarts = (email) => {
  const { user, loading } = useContext(AuthContext);
//   const {isLoading, refetch ,data: cart = [] } = useQueryClient();
  const {isLoading, refetch ,data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () =>{
        const res = await fetch(`https://medlife-server-navy.vercel.app/carts?email=${user.email}`)
        return res.json()
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
