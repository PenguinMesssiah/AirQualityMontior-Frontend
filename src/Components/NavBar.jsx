import { Link } from 'react-router-dom'

function NavBar () {
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
        </>
    )

};

export default NavBar;