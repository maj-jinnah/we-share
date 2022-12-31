import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { BiLike } from 'react-icons/bi';
import { FaComment } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import CommentCard from './CommentCard';

const MediaDetails = () => {

    const media = useLoaderData();
    const { _id, userName, userEmail, userPhoto, feeling, photoURL } = media;

    const { data: allComments = [] } = useQuery({
        queryKey: ['allComments', _id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allComments?_id=${_id}`)
            const data = await res.json()
            return data;
        }
    })

    return (
        <div className='flex flex-col justify-center items-center my-14'>
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
                    <button className='flex items-center gap-2 btn-ghost rounded-xl py-1 px-2'>
                        <BiLike className='text-2xl'></BiLike> 0 Like
                    </button>
                    <button className='flex items-center gap-2 btn-ghost rounded-xl py-1 px-2'>
                        <FaComment className='text-2xl'></FaComment>{allComments.length} {allComments.length > 1 ? 'Comments' : 'Comment'}
                    </button>
                </div>
                
                <div className='pb-2'>
                    {allComments.length > 0 ? <div className="divider"></div> :
                        <div className='pb-4'></div>}
                    {
                        allComments.map(com => <CommentCard
                            key={com._id}
                            com={com}
                        ></CommentCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default MediaDetails;