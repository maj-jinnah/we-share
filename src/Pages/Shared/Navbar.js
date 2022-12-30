import React, { useContext } from "react";
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";

const Navbar = () => {

    const { user, LogOut } = useContext(AuthContext)

    const HandelLouOut = () => {
        LogOut()
            .then(() => { })
            .catch((error) => {
                console.error(error)
            })
    }

    const menuItems = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to='/media'>Media</Link></li>
            <li><Link to='/message'>Message</Link></li>
            <li><Link to='/about'>About </Link></li>
            {/* <li><Link to='/login'>Login</Link></li> */}
            {
            user?.uid ?
                <>

                </> :
                <li><Link to='/login'>Log In</Link></li>
        }
        </>
    );

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {menuItems}
                        </ul>
                    </div>
                    <Link className="ml-3 normal-case text-xl" to='/'>
                        <img className=' w-10' src={logo} alt="" />
                        {/* <span>WeShare</span> */}
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{menuItems}</ul>
                </div>
                <div className="navbar-end mr-3">
                    <div className="dropdown dropdown-end">
                        {
                            user?.uid ?
                            <>
                                <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL} alt="" />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <Link className="justify-between">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link>Settings</Link>
                            </li>
                            {/* <li><Link>Logout</Link></li> */}
                            <li><button onClick={HandelLouOut} >Sign Out</button></li>
                        </ul>
                            </> : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
