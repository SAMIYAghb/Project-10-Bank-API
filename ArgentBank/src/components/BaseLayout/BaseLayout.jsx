import { Outlet } from 'react-router-dom';
import Navbar from './../Navbar/Navbar';
import Footer from '../Footer/Footer';
import '../../css/main.css'

const BaseLayout = () => {
  return (
    <>
        <Navbar/>
        <main className="main">
          <Outlet/>
        </main>
        <Footer/>
    </>
  )
}

export default BaseLayout
