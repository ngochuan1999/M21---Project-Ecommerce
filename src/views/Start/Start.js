import React, { useEffect } from 'react';



function Start(props) {
    console.log(props.product)

    const producStart = () => {
        let numArr = []
        let numberStart;

        if (props.product?.review === undefined || !props.product?.review) {
            return ("Không có đánh giá")
        }

        if (props.product.review.length > 0) {
            props.product.review?.map((e) => {
                numArr.push(parseInt(e.start));
            })
            numberStart = (numArr.reduce((a, b) => a + b))
            let numCount = parseFloat(numberStart / (numArr.length)).toFixed(2)
            return (
                <>
                    <h2>{(numCount >= 1 && numCount < 2) ?
                        <>
                            <i class="fa fa-star starShow" aria-hidden="true"></i>
                        </>
                        : (numCount >= 2 && numCount < 3) ?
                            <>
                                <i class="fa fa-star starShow" aria-hidden="true"></i>
                                <i class="fa fa-star starShow" aria-hidden="true"></i>
                            </>
                            : (numCount >= 3 && numCount < 4) ?
                                <>
                                    <i class="fa fa-star starShow" aria-hidden="true"></i>
                                    <i class="fa fa-star starShow" aria-hidden="true"></i>
                                    <i class="fa fa-star starShow" aria-hidden="true"></i>
                                </>
                                : (numCount >= 4 && numCount < 5) ?
                                    <>
                                        <i class="fa fa-star starShow" aria-hidden="true"></i>
                                        <i class="fa fa-star starShow" aria-hidden="true"></i>
                                        <i class="fa fa-star starShow" aria-hidden="true"></i>
                                        <i class="fa fa-star starShow" aria-hidden="true"></i>
                                    </> :
                                    <>
                                        <i class="fa fa-star starShow" aria-hidden="true"></i>
                                        <i class="fa fa-star starShow" aria-hidden="true"></i>
                                        <i class="fa fa-star starShow" aria-hidden="true"></i>
                                        <i class="fa fa-star starShow" aria-hidden="true"></i>
                                        <i class="fa fa-star starShow" aria-hidden="true"></i>
                                    </>
                    }


                    </h2>
                </>
            );
        }

    }


    return (
        <>

            { producStart()}
        </>
    )
}

export default Start;