import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";



const useCarts = (email) => {
    const queryClient = useQueryClient()
    const query = useQuery({
        queryKey: ['usercart']
        
    })

};

export default useCarts;
