import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useInstructor = () => {
  const { user , loading} = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const {
    data: isInstructor,
    isLoading: isInstructorLoading,
    refetch,
  } = useQuery({
    queryKey: ["isInstructor", user?.email],
    enabled:
      !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/instructor/${user.email}`);
      return response.data.instructor;
    },
  });
  return [isInstructor, isInstructorLoading, refetch];
};

export default useInstructor;
