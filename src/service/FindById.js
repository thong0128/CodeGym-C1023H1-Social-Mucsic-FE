import axios from "axios";
import {useState} from "react";

export default function findById(){
    const id = localStorage.getItem("idUser")
    const users1 = {}
    // axios.get('http://localhost:8080/users/' + id).then((res) => {
    //     return res.data
    // })

    return users1
}