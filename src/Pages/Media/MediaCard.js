import React from 'react';

const MediaCard = ({ media }) => {

    const { userName, userEmail, userPhoto, feeling, photoURL } = media

    return (
        <div>
            <div className="card w-[350px] bg-base-100 shadow-xl">
                <div className="">
                    <div className='flex items-center gap-3 p-5'>
                        <div className="avatar">
                            <div className="w-16 rounded-full">
                                <img src={userPhoto} alt=''/>
                            </div>
                        </div>
                        <div>
                            <h3 className='font-medium'>{userName}</h3>
                            <p>{userEmail}</p>
                        </div>
                    </div>
                    <p className='ml-3 pb-2'>{feeling}</p>
                </div>
                <figure className='h-80'><img src={photoURL} alt="Shoes" /></figure>
            </div>
            <div>
                <p>hi</p>
            </div>
        </div>
    );
};

export default MediaCard;