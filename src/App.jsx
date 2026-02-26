import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Components/Footer'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { motivation, motivationSource } from './text/homePage'
import 'leaflet/dist/leaflet.css'
import './App.css'

function convertToHtml(text) {
  return text
    .split('\n\n')
    .map(paragraph => `<p>${paragraph}</p>`)
    .join('')
}

function AirQualityDashboard() {
    return (
    <>
      {/*Navbar*/}
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
            to="/aboutUs" 
            className="!text-blue-100 hover:bg-gray-800 px-4 py-2 transition-colors rounded-md"
            >
            About
          </Link>
        </nav>
        <main className="flex-1 min-w-full max-w-screen">
          <p className="flex pt-4 pb-2 font-semibold text-4xl">Glen-Hazel: Air Quality Monitoring</p>
          {/*Leaflet Map*/}
          <MapContainer
            center={[40.40666, -79.94271]}
            zoom={13}
            className="max-w-full rounded-md"
            style={{ height: '400px'}}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[40.40666, -79.94271]}>
              <Popup>
                Arts Excusion Unlimited <br/>Base Station!
              </Popup>
            </Marker>
          </MapContainer>
          <p className="flex pt-6 font-medium text-2xl">Data-Driven Community-Informed Clean Air</p>
          <p className="flex pt-2 font-normal pb-3 text-lg">Empowering everyone to gain control and understanding of their built environment.</p>
          <p className="flex text-justify">{motivation}</p>
          <p className="pt-2 italic">{motivationSource}</p>
        </main>
      <Footer/>
    </>
  )
}




export default AirQualityDashboard
