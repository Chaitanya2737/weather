import React, { useEffect, useState } from 'react'
import axios from "axios"
const Weather = () => {
    const [data , setdata] = useState({})
useEffect(()=>{
    async function  Apidata(){

        try {
            const res =   await axios.get("http://api.weatherapi.com/v1/current.json?key=ccebf3db3c7245a7b2e81525240506 &q=pune&aqi=no");
            setdata(res)
        } catch (error) {
            console.log(error)
        }
    }
    Apidata()
},[])

    console.log(data)
  return (
    <div>

    </div>
  )
}

export default Weather