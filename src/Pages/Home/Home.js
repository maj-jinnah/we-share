import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { FaVideo, FaGrinAlt, FaUserCircle } from "react-icons/fa";
import { MdPhotoLibrary } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";

const Home = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handelSubmit = (event) => {
        event.preventDefault();
        
        if(!user?.uid){
            toast.error('You must login first')
            return navigate('/login')
        }

        const form = event.target;
        const feeling = form.feeling.value;
        const image = form.image.files[0];
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

                const mediaInfo = {
                    userName : user?.displayName,
                    userEmail : user?.email,
                    userPhoto : user?.photoURL,
                    feeling,
                    photoURL

                }
                if (imageData.success) {
                    fetch(`http://localhost:5000/media`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(mediaInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.acknowledged) {
                            toast.success("Successfully Share Done!")
                            navigate('/media')
                        }
                        else {
                            toast.error(data.message)
                        }
                    })

                }
            })
            .catch(error => console.error(error))

    };

    return (
        <div>
            <form onSubmit={handelSubmit}>
                <div className="mx-auto card w-[350px] md:w-[500px] bg-base-100 shadow-xl mt-10">
                    <div className="p-3">
                        <div className="flex gap-3 justify-center my-5">
                            <div className="avatar">
                                <div className="w-11 rounded-full">
                                    <img
                                        src={
                                            user?.uid ? (
                                                user?.photoURL
                                            ) : (
                                                <FaUserCircle className="text-3xl"></FaUserCircle>
                                            )
                                        }
                                        alt=""
                                    />
                                </div>
                            </div>
                            <input
                                name="feeling"
                                type="text"
                                placeholder="What's on your mind?"
                                className="input input-bordered w-64 md:w-96"
                                required
                            />
                        </div>
                        <div className="mx-auto items-center px-[18px]">
                            <input
                                name="image"
                                type="file"
                                className="file-input file-input-bordered w-full"
                            // required
                            />
                        </div>
                        <div className="mx-auto items-center px-[18px]">
                            <button className="py-[10px] w-full btn-primary mt-3 rounded-xl">
                                Submit
                            </button>
                        </div>
                        <div className="divider "></div>
                        <div className="flex justify-evenly">
                            <button className="py-1 px-3 rounded-2xl btn-ghost">
                                <div className="flex items-center">
                                    <FaVideo className="text-orange-600 text-2xl mr-3"></FaVideo>
                                    <span>Live Video</span>
                                </div>
                            </button>
                            <button className="py-1 px-3 rounded-2xl btn-ghost">
                                <div className="flex items-center">
                                    <MdPhotoLibrary className="text-green-600 text-2xl mr-3"></MdPhotoLibrary>
                                    <span>Photo/video</span>
                                </div>
                            </button>
                            <button className="py-1 px-3 rounded-2xl btn-ghost hidden md:block">
                                <div className="flex">
                                    <FaGrinAlt className="text-yellow-500 text-2xl mr-3"></FaGrinAlt>
                                    <span>Feeling/activity</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default Home;
