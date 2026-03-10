import HomePage from './Pages/HomePage'
import ChartsPage from './Pages/Charts'
import AboutUs from './Pages/AboutUs'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import './App.css'
import { Routes, Route } from 'react-router-dom'

function AirQualityDashboard() {
    return (
    <>
    {/*Navbar*/}
      <NavBar></NavBar>
      <main>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/charts" element={<ChartsPage></ChartsPage>}></Route>
          <Route path="/aboutUs" element={<AboutUs></AboutUs>}></Route>
        </Routes>
      </main>
     <Footer/>
    </>
  )
}




export default AirQualityDashboard
