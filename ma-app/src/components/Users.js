import React, { useEffect, useState } from 'react'
import { UsersList } from '../handle APIs/APIs';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const navigation = useNavigate();
    const [UserList, setUserList] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [Table, setTable] = useState(true);
    const [CurrentPage, setCurrentPage] = useState(1);
    const [TotalPage, setTotalPage] = useState(0);
    
    const UsersData = async () => {
        try {
            if (localStorage.getItem('token')) {
                const response = await UsersList(CurrentPage)
                console.log(response)
                setTotalPage(response.total_pages);
                setUserList(response.data);
                setLoading(false);
            }else{
                console.log("User is a guest")
                toast.error(`User Login required!`, { theme: "colored", position: "top-center" });

            }
        } catch (error) {
          console.log(error)
        }
    };

    useEffect(() => {
      UsersData();
    }, [CurrentPage])
    
    const page = () => {
        if(CurrentPage === 1){
            setCurrentPage(2);
        }else{
            setCurrentPage(1);
        }
    }

  return (
    <div className='text-white transition-all'>
        <ToastContainer/>
      {Loading ? 
      <>
      <div className='h-screen flex justify-center items-center '>
        <div> Loading...</div>
      </div>
      </> 
      :
      <>
      <div className='flex justify-end p-4 bg-slate-600'>
        <p onClick={() => {navigation("/profile")}} className='bg-green-500 w-fit px-2 py-1 rounded-lg cursor-pointer'>User Profile</p>
      </div>
            <div className='flex justify-center pt-12 transition-all'>
         <h1 onClick={() => {setTable(true)}}className={`${Table ? "bg-blue-700" : ""} text-xl px-2 py-1 cursor-pointer rounded-l-lg transition-all border`}>Table Format</h1>
         <h1 onClick={() => {setTable(false)}} className={`${!Table ? "bg-blue-700" : ""} text-xl px-2 py-1 cursor-pointer rounded-r-lg transition-all border`}>Card Format</h1>
            </div>
        <div className='flex flex-col items-center justify-end max-sm:text-xs max-sm:overflow-x-scroll mx-2 pb-3'>
       {Table ? 
       <>
        <div className='mt-5'>   
        <thead className='bg-slate-800'>
            <tr>
                <th className='border-sky-100 border px-2'>S.no</th>
                <th className='border-sky-100 border px-2'>First Name</th>
                <th className='border-sky-100 border px-2'>Last name</th>
                <th className='border-sky-100 border px-2'>Email</th>
                <th className='border-sky-100 border px-2'>Avatar</th>
            </tr>
        </thead>
        <tbody>
            {UserList.map((user,index) => (
                <>
            <tr>
                        <td className='border-sky-100 border px-2'>{user.id}</td>
                        <td className='border-sky-100 border px-2'>{user.first_name}</td>
                        <td className='border-sky-100 border px-2'>{user.last_name}</td>
                        <td className='border-sky-100 border px-2'>{user.email}</td>
                        <td className='border-sky-100 border px-2'>
                            <img src={`${user.avatar}`} alt="" /></td>
            </tr>
        </>
      ))}
        </tbody>
      </div>
       </> 
       : 
       <>
        <div className='flex flex-wrap justify-center w-[700px] max-md:w-full'>
        {UserList.map((user,index) => (
        <div className='flex flex-col w-5/12 bg-slate-800 rounded-lg justify-center items-center p-2 m-3'>
            <img src={`${user.avatar}`} alt="" className='bg-white rounded-full w-20 h-20 mb-2'/> 
            <p className=''>Name :</p>
            <p className='font-bold mb-2'>{user.first_name} {user.last_name}</p>
            {/* <p className='font-bold'>{user.last_name}</p> */}
            <p className=''>email : </p>
            <p className=''>{user.email}</p>
        </div>
        ))}
        </div>
       </> 
    }
    </div>
      </>
      }
      <p onClick={() => {page()}} className='text-center text-sm mb-5 cursor-pointer'>page {CurrentPage} of {TotalPage}</p>
    </div>
  )
}

export default Users
