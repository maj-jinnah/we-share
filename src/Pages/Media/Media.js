import React from 'react';
import { useLoaderData } from 'react-router-dom';
import MediaCard from './MediaCard';

const Media = () => {

    const medias = useLoaderData()

    return (
        <div>
            <h1 className='text-4xl font-semibold text-center mt-5 mb-10'>Enjoy your rest of the day!</h1>
            <div className='flex flex-col justify-center items-center gap-10'>
                {
                    medias.map(media => <MediaCard
                        key={media._id}
                        media={media}
                    ></MediaCard>)
                }
            </div>
        </div>
    );
};

export default Media;