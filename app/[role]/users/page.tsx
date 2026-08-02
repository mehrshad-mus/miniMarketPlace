"use client"
import ChangeResultButtons from "@/components/myComponent/Change-Results-Button";
import MyTable from "@/components/myComponent/MyTable";
import NavButton from "@/components/myComponent/NavButton";
import Spinner from "@/components/myComponent/Spinner ";
import { useUsers } from "@/hooks/users";
import { useUserFilters } from "@/hooks/userFilters";

import SearchBox from "@/components/myComponent/SearchBox";
import { UserColumn } from "@/components/myComponent/columns/UserColumn";


export const Users = () => {

    const { data,
        isLoading,
        currentPage,
        setCurrentPage,
        changeRole,
        changeRoleState,
        changeStatus,
        changeStatusState,
        setPageFilter,
        setSearchPhone
    } = useUsers()

    //creating coulumns
    const {columns} = UserColumn({changeRole , changeStatus , changeRoleState , changeStatusState})

    const { NavButtonOptions } = useUserFilters(setPageFilter, setCurrentPage)

    // console.log(data)
    
    return (
        <div className="bg-gray-100 p-6">

            <div className="font-bold text-2xl mb-6">تراکنش ها</div>

            <div className="bg-white rounded-xl p-4 mb-14">

                <SearchBox searchFn={setSearchPhone} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <NavButton options={NavButtonOptions} />

                {isLoading &&
                    <div className="flex justify-center items-center h-72">
                        <Spinner className="text-blue-600" />
                    </div>}

                {data && <MyTable
                    data={data.users}
                    columns={columns} />}

                <ChangeResultButtons
                    pageNumber={data?.totalCount}
                    loading={isLoading}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage} />


            </div>
        </div>
    );
};

export default Users;
