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
  
    return <div className="login-container">
        <form>
            <label htmlFor="selectUser">Select Username:</label>
            <select name="selectUser" id="selectUser"onChange={handleSelectUser}>
                {users.map((item)=>{
                   return  <option key={item.username} value={item.username} >{item.username}</option>
                })}
            </select>
            <Button variant="secondary" type="submit"onClick={handleSubmitUser} >submit</Button>
        </form>
        <p className={loginMsg}>You are logged in as: {user}</p>
    </div>
}