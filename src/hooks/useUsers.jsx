import { useQuery } from '@tanstack/react-query';
import React from 'react';

const useUsers = () => {
    const {isLoading, refetch , data: users = []} = useQuery({
        queryKey:['users'],
        queryFn: async () =>{
            const res = await fetch(`https://medlife-server-navy.vercel.app/users`)
            return res.json()
        }
    })
    return [users, refetch, isLoading]
};

export default useUsers;