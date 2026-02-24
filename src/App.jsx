import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom'
import Footer from './Components/Footer'

function AirQualityDashboard() {
  const [count, setCount] = useState(0)

    return (
    <>
      {/* Navbar using Tailwind classes */}
        <nav className="flex min-w-full justify-end max-w-screen gap-4 p-5 bg-gray-900 border-b bg-sky-950 rounded-md">
          <Link 
            to="/" 
            className="!text-blue-100 hover:bg-gray-800 px-4 py-2 transition-colors rounded-md"
            >
            Home
          </Link>
          <Link 
            to="/charts" 
            className="!text-blue-100 hover:bg-gray-800 px-4 py-2 transition-colors rounded-md"
            >
            Charts
          </Link>
          <Link 
            to="/about" 
            className="!text-blue-100 hover:bg-gray-800 px-4 py-2 transition-colors rounded-md"
            >
            About
          </Link>
        </nav>
        <main className="flex-1">
          <p className="flex p-6 text-4xl">Glen-Hazel: Air Quality Monitoring</p>
          {/*Leaflet Map Goes Here*/}
          <p className="flex p-6 text-lg">Empowering everyone to gain control and understanding of their built environment.</p>
        </main>
        {/*
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
        */}
      <Footer/>
    </>
  )
}


export default AirQualityDashboard
