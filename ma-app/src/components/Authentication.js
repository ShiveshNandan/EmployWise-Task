import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import React from "react";
import {Login} from "../handle APIs/APIs"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Authentication = () => {
  const navigate = useNavigate();
  const [loadingBtn, setloadingBtn] = useState(false);
  const [email, setEmail] = useState("");
  const [Erremail, setErrEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [Errpassword, setErrPassword] = useState(false);
  const [isDisabledLogin, setisDisabledLogin] = useState(true);

  let errors = null;

  const login = async (email, password) => {
    try {
        const response = await Login(email,password)
        localStorage.setItem('token',(response.data.token));
        setTimeout(() => {
            navigate("/Users")
        }, 2000);
    } catch (error) {
        errors = "Enter Right Credentials";
        setErrEmail(true);
        setErrPassword(true);
      toast.error(`${errors}`, { theme: "colored", position: "top-center" });
      setPassword("");
      console.log(error)
      setloadingBtn(false);
    }
  };

 const chech = () => {
     if(email !== "" && password !== ""){
         setisDisabledLogin(false)
        }
}

  return (
    <>
      <ToastContainer />

      
        <div className="flex">

          <div className="flex h-screen w-full ">
            <div className="flex flex-col w-full justify-center items-center bg-[#191817] h-screen overflow-hidden  max-sm:w-full">
              <div className="flex flex-col w-full h-screen items-center mt-40 max-sm:mt-[7rem] scroll">
                
                  <div className="flex flex-col w-[400px] max-sm:w-10/12">
                    <div className="flex flex-col">
                      <h1
                        className=" text-3xl font-[600] tracking-[0.4px] max-sm:text-center text-[#fff]"
                      >
                        Login
                      </h1>
                      <h1 className="text-sm pt-2 font-[100] text-[#f2f2f2] tracking-[0.5px] pb-1 ">Enter your email below to create your account</h1>
                    </div>
                    <form className="flex flex-col mt-10 z-[200]">
                      <h1 className="text-sm pt-2 font-[100] text-[#f2f2f2] tracking-[0.5px] pb-1 ">
                        Email Address{" "}
                      </h1>
                      <input
                        type="email"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          chech()
                          setErrEmail(false);
                        }}
                        className={`${
                          Erremail
                            ? "text-red-400 border-red-700"
                            : "outline-none"
                        } p-3 mb-2 rounded text-white bg-[#1e1c1a] border `}
                      />
                      <h1 className="text-sm pt-2 font-[100] text-[#f2f2f2] tracking-[0.5px] pb-1 ">
                        Password{" "}
                      </h1>
                      <input
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          chech()
                          setErrPassword(false);
                        }}
                        className={`${
                          Errpassword
                            ? "text-red-400 border-red-700"
                            : "outline-none"
                        } p-3 mb-2 rounded text-white bg-[#1e1c1a] border `}
                      />
                      <h1
                        className={`${
                          Errpassword ? "" : "hidden"
                        } text-xs py-1 flex justify-end underline underline-offset-4 dark:text-[#a5a5a5] text-[#333] z-[200]`}
                      >
                      </h1>

                      <button
                        type="button"
                        onClick={() => {
                          login(email, password);
                          setloadingBtn(true);
                          setisDisabledLogin(true);
                        }}
                        disabled={isDisabledLogin}
                        className={`${
                          isDisabledLogin
                            ? "cursor-not-allowed opacity-80 text-[#ffffff] bg-[#263238]"
                            : "text-[#ffffff] bg-[#263238] dark:bg-[#ffffff] dark:text-[#263238]"
                        } p-2 my-2 rounded text-[600] transition-all duration-500`}
                      >
                        {loadingBtn ? "Processing..." : "Login"}
                      </button>
                    </form>
                    <h1 className="text-xs py-1 flex justify-end underline underline-offset-4 dark:text-[#a5a5a5] text-[#333] z-[200]">
                    </h1>
                  </div>
                
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Authentication;

