import React, { useContext, useState } from 'react';
import { FaComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import './MediaCard.css'
import { AuthContext } from '../../Contexts/AuthContext/AuthProvider';

const MediaCard = ({ media }) => {

    const { user } = useContext(AuthContext)
    const [isLike, setIsLike] = useState(false)
    const [isCommentOpen, setIsCommentOpen] = useState(false)
    const { userName, userEmail, userPhoto, feeling, photoURL } = media

    const handelLike = () => {

    }

    const handelOpenComment = () => {
        setIsCommentOpen(!isCommentOpen);
    }

    const handelSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const comment = form.comment.value;
        form.reset()

        console.log(comment)
    }

    return (
        <div>
            <div className="w-[360px] bg-base-100 shadow-xl rounded-xl">
                <div className="">
                    <div className='flex items-center gap-3 p-3'>
                        <div className="avatar">
                            <div className="w-16 rounded-full">
                                <img src={userPhoto} alt='' />
                            </div>
                        </div>
                        <div>
                            <h3 className='font-medium'>{userName}</h3>
                            <p>{userEmail}</p>
                        </div>
                    </div>
                    <p className='ml-3 pb-2'>{feeling}</p>
                </div>
                <div className='h-80'>
                    <img src={photoURL} alt="Shoes" className='fill mx-auto' />
                </div>
                <div className='flex items-center px-5 py-2 gap-10'>
                    <button onClick={handelLike}>
                        <BiLike className='text-2xl'></BiLike>
                    </button>
                    <button onClick={handelOpenComment} className='flex items-center gap-2 btn-ghost rounded-xl py-1 px-4'>
                        <FaComment className='text-2xl'></FaComment>Comment
                    </button>
                </div>
                <div>
                    {
                        isCommentOpen === true &&
                        <>
                            <div className="divider"></div>
                            <p>hi</p>
                        </>
                    }
                </div>
                <div className='py-2'>
                    {
                        isCommentOpen === true &&
                        <div className='flex justify-center gap-1 items-center '>
                            <div className="avatar">
                                <div className="w-8 rounded-full">
                                    <img src={user?.photoURL} alt='' />
                                </div>
                            </div>
                            <form onSubmit={handelSubmit} className="flex items-center justify-center gap-3">
                                <input type="text" name='comment' placeholder="Write a comment" className="border-2 rounded-2xl px-1 py-1 w-52" />
                                <input className='px-2 py-1 bg-violet-500 rounded-full text-white hover:bg-primary' type="submit" value="Submit" />
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default MediaCard;