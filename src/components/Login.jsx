import { useContext, useEffect, useState } from "react";
import { getUsers } from "../api";
import UserContext from "../userContext";
import { Button } from "react-bootstrap";

export default function Login(){
    const context= useContext(UserContext);
    const {user,setUser} =context;
    const [users,setUsers]= useState([])
    const [loginMsg,setLoginMsg] = useState("hidden");
    
    useEffect(()=>{
        getUsers().then((data)=>{
           setUsers(data.users);
           setUser(data.users[0].username);
           
        }).catch((err)=>{
            alert(err.msg);
        })
    },[]);
    const handleSelectUser =(event)=>{
        setUser(event.target.value);
        setLoginMsg("hidden");
    }
    const handleSubmitUser =(event)=>{
            event.preventDefault();
            setLoginMsg("visible");
         
    }
  
    return <div className="w-full h-full flex justify-center">
        <form className="h-auto mt-28 justify-items-center">
            <label htmlFor="selectUser" className="py-2 ">Select Username Please</label>
            <select name="selectUser" id="selectUser"onChange={handleSelectUser}  className="py-2 px-4 w-96 mt-4 block border-gray-light border-2 rounded-lg text-sm ">
                {users.map((item)=>{
                   return  <option key={item.username} value={item.username} >{item.username}</option>
                })}
            </select>
            <button variant="secondary" type="submit"onClick={handleSubmitUser} className="bg-blue text-gray-light  rounded-md py-2 px-4 mt-4">submit</button>
             <p className={`${loginMsg} mt-4 text-dark_blue`}>You are logged in as: {user}</p>
        </form>
       
    </div>
}