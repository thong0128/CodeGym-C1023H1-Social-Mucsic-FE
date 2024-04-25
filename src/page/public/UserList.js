import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function UserList() {
    const [listUser, setListUser] = useState([])
    const [list, setList] = useState([]);
    const [check, setCheck] = useState(false);
    const [idUser, setIdUser] = useState(localStorage.getItem("idUser"))
    const [roles, setRoles] = useState(localStorage.getItem("role"))
    const navigate = useNavigate()

    // useEffect(() => {
    //     axios.get('http://localhost:8080/users').then(res => {
    //         for (let i = 0; i < res.data.length; i++) {
    //             if (res.data[i].roles.id != "ROLE_ADMIN"){
    //                 listUser.push(res.data[i])
    //             }
    //         }
    //         setList(listUser)
    //         console.log("list ne:", list)
    //     })
    // }, [])

    const users1 = {}
    useEffect(() => {
        for (let i = 0; i < users1.data.length; i++) {
        }
        setList(listUser)
        console.log("list ne:", list)
    }, []);

    function changeStatus(email) {
        axios.put('http://localhost:8080/users/account_lockout/'+ email).then(()=>{})
    }
    {
        console.log("check", localStorage.getItem("role"))}
       if (roles == "ROLE_ADMIN" && idUser != null){
           return (
               <>
                   <div style={{color: "white", marginTop: 20, marginBottom: 20, fontSize: 20, marginLeft: 10}}>
                       Danh sách người dùng
                   </div>

                   <table className="table table-striped" style={{color: "white"}}>
                       <thead>
                       <tr>
                           <th scope="col">#</th>
                           <th scope="col">Email</th>
                           <th scope="col">url_img</th>
                           <th scope="col">DayOfBirth</th>
                           <th scope="col">Phone</th>
                           <th scope="col">Status</th>
                           <th scope="col">User Name</th>
                       </tr>
                       </thead>
                       <tbody>
                       {list.map((i, key) => (
                               <tr>
                                   <th scope="row">{key + 1}</th>
                                   <td>{i.email}</td>
                                   <td><img src={i.url_img} style={{width:60, height: 60}} /></td>
                                   <td>{i.dayOfBirth}</td>
                                   <td>{i.phone}</td>
                                   <td>
                                       <select onChange={() =>{changeStatus(i.email)}}>
                                           {i.enabled === true ? <>
                                               <option>true</option>
                                               <option>false</option>
                                           </> : <>
                                               <option>false</option>
                                               <option>true</option>
                                           </>
                                           }
                                       </select>
                                   </td>
                                   <td>{i.userName}</td>
                               </tr>
                           )
                       )}
                       </tbody>
                   </table>
               </>
           )
       } else {
           navigate("/")
       }
    }
