import React from 'react'
import DrugSearch from '../components/DrugSearch'

const Home = () => {
  return (
    <div>
        <div className="navbar">
            <p className="title">
                Xogene Logo
            </p>
            <p>Search Details</p>
        </div>
        <DrugSearch/>

    </div>
  )
}

export default Home