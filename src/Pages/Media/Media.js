import React from 'react';
import { useLoaderData } from 'react-router-dom';
import MediaCard from './MediaCard';

const Media = () => {

    const medias = useLoaderData()

    return (
        <div>
            <h1 className='text-4xl font-semibold text-center my-5'>Enjoy your rest of the day!</h1>
            <div className='grid grid-cols-1 gap-5'>
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