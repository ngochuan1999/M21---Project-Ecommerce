import React, { useEffect } from "react";
import ContactBody from '../../component/ContactBody/ContactBody'
import ContactMess from '../../component/ContactMess/ContactMess';

function Contact() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="Contact mt-5 mb-5">
            <ContactBody />
            <ContactMess />
        </div>
    );
}
export default Contact;