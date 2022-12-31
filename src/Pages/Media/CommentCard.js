import React from 'react';

const CommentCard = ({ com }) => {

    const { post_comment, post_userName, post_userPhoto } = com

    return (
        <div className='flex justify-start items-start gap-3 pb-3 ml-3'>
            <div className="avatar">
                <div className="w-14 rounded-full">
                    <img src={post_userPhoto} alt=''/>
                </div>
            </div>
            <div className='shadow-lg py-2 px-3 rounded-lg bg-slate-200 w-[265px]'>
                <h3 className='font-semibold text-[17px]'>{post_userName}</h3>
                <p>{post_comment}</p>
            </div>
        </div>
    );
};

export default CommentCard;