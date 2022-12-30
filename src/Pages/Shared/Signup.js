import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";

const Signup = () => {
    const [error, setError] = useState("");
    const { createUser, updateUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handelSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const image = form.image.files[0];
        const email = form.email.value;
        const password = form.password.value;
        const imageHostKey = process.env.REACT_APP_imgbb_key

        const formData = new FormData()
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                const photoURL = imageData.data.display_url;
                if (imageData.success) {
                    createUser(email, password)
                        .then(result => {
                            const user = result.user;
                            console.log(user);
                            form.reset();
                            setError('');
                            handelUpdateUser(name, photoURL)
                            toast.success('Registered successfully!')
                        })
                        .catch(error => {
                            console.error(error);
                            setError(error.message);
                        })
                    const handelUpdateUser = (name, photoURL) => {
                        const profile = {
                            displayName: name,
                            photoURL
                        }
                        updateUser(profile)
                            .then(() => {
                                navigate(from, { replace: true })
                            })
                            .catch((error) => console.error(error))
                    }
                }
            })
            .catch(error => console.error(error))
    };

    return (
        <>
            <div className="hero bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card flex-shrink-0  w-[350px] shadow-2xl bg-base-100">
                        <form onSubmit={handelSubmit} className="card-body">
                            <h1 className="text-center text-4xl font-bold">
                                Signup
                            </h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Your Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="your name"
                                    name="name"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Chose Your Photo
                                    </span>
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    className="file-input file-input-bordered w-full max-w-xs"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    className="input input-bordered"
                                    required
                                />
                                <label className="label">
                                    <p className="text-red-600">{error}</p>
                                </label>
                            </div>
                            <div className="form-control mt-6 mb-5">
                                <button className="btn btn-primary">
                                    SIGNUP
                                </button>
                                <p className="text-center mt-3">
                                    Already have an account?{" "}
                                    <Link to="/login">
                                        {" "}
                                        <span className="text-violet-800">
                                            LogIn Now
                                        </span>
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
