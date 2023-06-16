import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";


const useInstructorClasses = () => {
    const {user, loading} = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    const {isLoading,refetch,data: courses = []} = useQuery({
        queryKey: ["courses", user?.email],
        enabled: !loading && !!user?.email && !!localStorage.getItem("access-token"),
        queryFn: async () =>{
            const res = await axiosSecure.get(`/instructorClasses?email=${user?.email}`)
            return res.data
        }
    })
    return [courses,refetch]
  
};

export default useInstructorClasses;