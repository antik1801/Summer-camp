import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const {
    data: isAdmin,
    isLoading: isAdminLoading,
    refetch,
  } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled:
      !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/admin/${user.email}`);
      console.log("is admin result", response);
      return response.data.admin;
    },
  });
  return [isAdmin, isAdminLoading, refetch];
};

export default useAdmin;
