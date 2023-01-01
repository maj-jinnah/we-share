import React, { useContext, useState } from 'react';
import { FaComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import './MediaCard.css'
import { AuthContext } from '../../Contexts/AuthContext/AuthProvider';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import CommentCard from './CommentCard';
import { Link } from 'react-router-dom';

const MediaCard = ({ media }) => {

    const { user } = useContext(AuthContext)
    const [isLike, setIsLike] = useState(false)
    const [isCommentOpen, setIsCommentOpen] = useState(false)
    const { _id, userName, userEmail, userPhoto, feeling, photoURL, totalLike } = media

    const handelOpenComment = () => {
        setIsCommentOpen(!isCommentOpen);

    }

    const { data: allComments = [], refetch } = useQuery({
        queryKey: ['allComments', _id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allComments?_id=${_id}`)
            const data = await res.json()
            return data;
        }
    })

    const handelLike = () => {
        
        // fetch(`http://localhost:5000/isLike?_id=${_id}`, {
        //     method: 'PUT'
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         if (data.acknowledged) {
        //             refetch();
        //         }
        //     })
    }

    const handelSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const comment = form.comment.value;
        // form.reset()

        const sendComment = {
            post_id: _id,
            post_comment: comment,
            post_userName: user.displayName,
            post_userEmail: user.email,
            post_userPhoto: user.photoURL
        }
        // console.log(sendComment)
        fetch('http://localhost:5000/comment', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(sendComment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success("Your comment is successfully posted!")
                    form.reset();
                    refetch()
                }
            })
            .catch(error => console.log(error))
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
                <div className='flex items-center justify-evenly py-2 gap-5'>
                    <button onClick={handelLike} className='flex items-center gap-2 btn-ghost rounded-xl py-1 px-2'>
                        <BiLike className='text-2xl'></BiLike>{totalLike?.length} {totalLike?.length > 1 ? 'Likes' : 'Like'}
                    </button>
                    <button onClick={handelOpenComment} className='flex items-center gap-2 btn-ghost rounded-xl py-1 px-2'>
                        <FaComment className='text-2xl'></FaComment>{allComments?.length} {allComments?.length > 1 ? 'Comments' : 'Comment'}
                    </button>
                    <Link to={`/media/${_id}`}><button className='btn-ghost rounded-xl py-1 px-2'>Details</button></Link>
                </div>
                <div className='pt-2'>
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
                <div>
                    {
                        isCommentOpen === true &&
                        <>
                                {allComments.length > 0 ? <div className="divider"></div> : 
                                <div className='pb-4'></div>}
                            <div>
                                {
                                    allComments.map(com => <CommentCard
                                        key={com._id}
                                        com={com}
                                    ></CommentCard>)
                                }
                            </div>
                        </>
                    }
                </div>

            </div>
        </div>
    );
};

export default MediaCard;