import React, { useState } from 'react';
import ReplyComment from './ReplyComment';

function ButtonComment(props) {

    console.log(props)
    const [reply, setReply] = useState(false)
    return (
        <>
            <button onClick={() => {setReply(!reply)
            }}>Trả lời</button>
        {reply == true ? <ReplyComment review={props.review} index={props.index}  id={props.id} reply={reply} /> : ""}
         </>
        
    );
}

export default ButtonComment;