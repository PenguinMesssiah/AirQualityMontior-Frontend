import HomePage from './Pages/HomePage'
import ChartsPage from './Pages/Charts'
import AboutUs from './Pages/AboutUs'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap-custom.css';  // Custom Bootstrap theme with indigo-900

function AirQualityDashboard() {
    return (
    <div className='flex flex-col min-h-screen w-full'>
    {/*Navbar*/}
      <NavBar></NavBar>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/charts" element={<ChartsPage></ChartsPage>}></Route>
          <Route path="/aboutUs" element={<AboutUs></AboutUs>}></Route>
        </Routes>
      </main>
     <Footer/>
    </div>
  )
}

export default AirQualityDashboard
