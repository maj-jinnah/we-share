import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext/AuthProvider';

const About = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className='h-screen'>
            <h1 className='text-3xl font-semibold text-center mt-5 mb-10'>This is about page!</h1>
            <div className='flex justify-center items-center '>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className='flex justify-end'>
                            <button className='btn btn-primary'>
                                <label htmlFor="my-modal-6" className="">Edit Details</label>
                            </button>
                        </div>
                        <h2 className="card-title">Name: {user?.displayName}</h2>
                        <p>Email: {user?.email}</p>
                        <p>University: </p>
                        <p>Address: </p>
                    </div>
                </div>
                <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h1 className='text-center text-xl font-medium mb-5'>To edit your info, fill up this form and save it.</h1>
                        <input type="text" placeholder="Enter Your Name" className="input input-bordered w-full mb-4" />
                        <input type="text" placeholder="Enter Your Email " className="input input-bordered w-full mb-4" />
                        <input type="text" placeholder="Enter Your University Name" className="input input-bordered w-full mb-4" />
                        <input type="text" placeholder="Enter Your Address" className="input input-bordered w-full mb-4" />
                        <div className="modal-action">
                            <label htmlFor="my-modal-6" className="btn">Save</label>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default About;