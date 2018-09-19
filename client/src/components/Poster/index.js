import React from 'react';
import '../../compiled/components/Poster/Poster.css';
const Poster = ({title, url}) => (
    <div className='poster'>
        <img src={url} alt='poster' />
        <span>{title}</span>
    </div>
)

export default Poster;