import HomePage from './Pages/HomePage'
import ChartsPage from './Pages/Charts'
import AboutUs from './Pages/AboutUs'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function AirQualityDashboard() {
    return (
    <>
    {/*Navbar*/}
      <NavBar></NavBar>
      <main className="w-full">
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
