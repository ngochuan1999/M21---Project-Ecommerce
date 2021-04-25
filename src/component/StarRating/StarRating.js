import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import Review from '../../views/Review/Review';
import './style.css'
const StarRating = (props) => {

    const [hover, setHover] = useState(null);
    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <>
                        <label>
                            <input type="radio"
                                name='rating'
                                value={ratingValue}
                                onClick={() => props.setRating(ratingValue)}

                            ></input>
                            <FaStar className='start' color={ratingValue <= (props.rating || hover) ? '#ffc107' : '#e4e5e9'} size={50}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)} />
                        </label>
                    </>
                )
            })}

        </div>
    )
}
export default StarRating