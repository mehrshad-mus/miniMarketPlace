import { users } from "@/lib/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useUsers = () =>{
    const queryClient = useQueryClient();

    const [currentPage, setCurrentPage] = useState(1)
    
    const [pageFilter , setPageFilter] = useState<{status : undefined | string , role : undefined | string}>({
        status : undefined,
        role : undefined
    })

    const [searchPhone , setSearchPhone] = useState('')

    const filterString = JSON.stringify(pageFilter)

    const { data, isLoading, error } = useQuery({
        queryKey: ["users", currentPage , pageFilter , searchPhone],
        queryFn: () => users.getAllUsers(currentPage , filterString , searchPhone)
    })


    const {mutate :changeRole , isPending : changeRoleState} = useMutation({
        mutationKey: ["users", "changeRole"],
        mutationFn: users.changeUserRole,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["users"] }); }
    })

    const {mutate : changeStatus , isPending : changeStatusState} = useMutation({
        mutationKey: ["users", "changeStatus"],
        mutationFn: users.changeUserStatus,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["users"] }) }
    })


    return {
        currentPage,
        setCurrentPage,
        data,
        isLoading,
        changeRole,
        changeRoleState,
        changeStatus,
        changeStatusState,
        setPageFilter,
        setSearchPhone,
    }
}