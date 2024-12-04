import React, { useEffect, useState } from 'react'
import { UsersList, EditUser,DeleteUser } from '../handle APIs/APIs';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const EditUsers = () => {
  const navigation = useNavigate();
  const [UserList, setUserList] = useState([]);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [CurrentId, setCurrentId] = useState(0);
  const [Loading, setLoading] = useState(true);
  const [Table, setTable] = useState(true);
  const [modal, setModal] = useState(false);
  const [DelModal, setDelModal] = useState(false);
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
      } else {
        console.log("User is a guest")
        toast.error(`User Login required!`, { theme: "colored", position: "top-center" });
        setTimeout(() => {
          navigation("/")
        }, 5000);

      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    UsersData();
  }, [CurrentPage])

  const page = () => {
    if (CurrentPage === 1) {
      setCurrentPage(2);
    } else {
      setCurrentPage(1);
    }
  }

  const ToggleEditModal = (index) => {
    setCurrentId(index);
    setEmail(`${UserList[index]?.email}`)
    setFirstName(`${UserList[index]?.first_name}`)
    setLastName(`${UserList[index]?.last_name}`)
    setModal(!modal);
  }
  const ToggleDeleteModal = (index) => {
    setCurrentId(index);
    setDelModal(!DelModal);
  }

  const Delete = async () => {
    try {
      const response = await DeleteUser(CurrentId);
      toast.success(`Deleted Successfully!`, { theme: "colored", position: "top-center" });
      ToggleDeleteModal();
    } catch (error) {
      console.log("Edituaser PAge errror : ", error);
      toast.error(`Error Occured : ${error}!`, { theme: "colored", position: "top-center" });
      ToggleDeleteModal();
    }
  }

  const Edit = async (Email, LastName, FirstName, id) => {
    try {
      const response = await EditUser(id, FirstName, LastName, Email);
      const res = response.data;
      toast.success(`First Name: ${res.FirstName}, Last Name: ${res.LastName} and Email: ${res.Email}, is updated Successfully! `, { theme: "colored", position: "top-center" });
      ToggleEditModal();
    } catch (error) {
      console.log("Edituaser PAge errror : ", error);
      toast.error(`Error Occured : ${error}!`, { theme: "colored", position: "top-center" });
      ToggleEditModal();
    }
  }

  return (
    <div className='text-white transition-all'>
      <ToastContainer />
      {Loading ?
        <>
          <div className='h-screen flex justify-center items-center '>
            <div> Loading...</div>
          </div>
        </>
        :
        <>
          <div className='flex justify-end p-4 bg-slate-600'>
            <p onClick={() => { navigation("/profile") }} className='bg-green-500 w-fit px-2 py-1 rounded-lg cursor-pointer'>User Profile</p>
          </div>
          <div className='flex justify-center pt-12 transition-all'>
            <h1 onClick={() => { setTable(true) }} className={`${Table ? "bg-blue-700" : ""} text-xl px-2 py-1 cursor-pointer rounded-l-lg transition-all border`}>Table Format</h1>
            <h1 onClick={() => { setTable(false) }} className={`${!Table ? "bg-blue-700" : ""} text-xl px-2 py-1 cursor-pointer rounded-r-lg transition-all border`}>Card Format</h1>
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
                      <th className='border-sky-100 border px-2'>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {UserList.map((user, index) => (
                      <>
                        <tr key={index}>
                          <td className='border-sky-100 border px-2'>{user.id}</td>
                          <td className='border-sky-100 border px-2'>{user.first_name}</td>
                          <td className='border-sky-100 border px-2'>{user.last_name}</td>
                          <td className='border-sky-100 border px-2'>{user.email}</td>
                          <td className='border-sky-100 border px-2'>
                            <img src={`${user.avatar}`} alt="" /></td>
                          <td className='border-sky-100 border px-2 text-center'>
                            <p onClick={() => { ToggleEditModal(index) }} className='bg-green-500 px-1 rounded mt-2 cursor-pointer'>Edit</p>
                            <p onClick={() => { ToggleDeleteModal(index) }} className='bg-red-500 px-1 rounded mt-2 cursor-pointer'>Delete</p>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </div>
              </>
              :
              <>
                <div className='flex flex-wrap justify-center w-[700px] max-md:w-full'>
                  {UserList.map((user, index) => (
                    <div className='flex flex-col w-5/12 bg-slate-800 rounded-lg justify-center items-center p-2 m-3'>
                      <img src={`${user.avatar}`} alt="" className='bg-white rounded-full w-20 h-20 mb-2' />
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
      <p onClick={() => { page() }} className='text-center text-sm mb-5 cursor-pointer'>page {CurrentPage} of {TotalPage}</p>

      <div className={`${!modal ? "hidden" : ""} bg-[#000000a6] w-full h-screen fixed top-0 right-0`}>
        <div className='flex h-[80vh] '>
          <div className='flex flex-col bg-slate-800 m-auto w-[600px] max-md:w-10/12 justify-center items-center p-5 pt-0 rounded-lg'>
            <div className='flex w-full mt-5 justify-end '>
              <button onClick={() => { ToggleEditModal() }} className='px-2 text-center rounded-full bg-red-500 text-black mb-1 text-md'>X</button>
            </div>
            <div className='py-2'>
              <div>
                <p className='text-sm pt-4 px-1 pb-1'>First Name</p>
                <input className='rounded px-2 text-black' value={FirstName} onChange={(e) => { setFirstName(e.target.value) }} type="text" />
              </div>
              <div>
                <p className='text-sm pt-4 px-1 pb-1'>Last Name</p>
                <input className='rounded px-2 text-black' value={LastName} onChange={(e) => { setLastName(e.target.value) }} type="text" />
              </div>
              <div>
                <p className='text-sm pt-4 px-1 pb-1'>Email</p>
                <input className='rounded px-2 text-black' value={Email} onChange={(e) => { setEmail(e.target.value) }} type="text" />
              </div>
            </div>
            <div className='flex w-full mt-5 justify-end '>
              <button onClick={() => { ToggleEditModal() }} className='px-2 rounded-md bg-red-400 text-black m-1'>Cancel</button>
              <button onClick={() => { Edit(CurrentId, FirstName, LastName, Email) }} className='px-2 rounded-md bg-green-500 text-black m-1'>Save</button>
            </div>
          </div>
        </div>

      </div>



      <div className={`${!DelModal ? "hidden" : ""} bg-[#000000a6] w-full h-screen fixed top-0 right-0`}>
        <div className='flex h-[80vh] '>
          <div className='flex flex-col bg-slate-800 m-auto w-[600px] max-md:w-10/12 justify-center items-center p-5 pt-0 rounded-lg'>
            <p className='m-10 text-xl'>Do You Really want to delete the user ?</p>
            <div className='flex w-full justify-end'>
              <p onClick={() => {Delete()}} className='px-4 bg-red-500 rounded-md m-1 cursor-pointer' >Yes</p>
              <p onClick={() => {ToggleDeleteModal()}} className='px-4 bg-green-500 rounded-md m-1 cursor-pointer' >No</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default EditUsers
