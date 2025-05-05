'use client'
import React from "react"

export default function page(){
    
    const fetchData = async() => {
        const res = await fetch('/api/todo')
        const data = await res.json()
        console.log('data', data)
    }
    fetchData()
    return(
        <div>
            <h1>DashBoard</h1>
        </div>
    )
}