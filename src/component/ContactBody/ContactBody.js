import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons';
import './style.css'
const ContactBody = () => {
    return (
        <div className="ContactBody ">
            <div className="contact-info row ">
                <div className="font-weight-bold text-center col-lg-12 col-12">
                    <h4>ROUTINE | Your Skincare Friend</h4>
                </div>
                <div className="row">
                    <div className="contact-info-item col-lg-12">
                        <FontAwesomeIcon icon={faHome} className="contact-icon" />
                        <p className="contact-info-title2">ADDRESS</p>
                        <p>Số 25 đường Ba Tháng Hai, Phường 1, TP. Đà Lạt</p>
                    </div>
                    <div className="contact-info-item col-lg-12">
                        <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                        <p className="contact-info-title2">phone</p>
                        <p>(+84)392539253</p>
                    </div>
                    <div className="contact-info-item col-lg-12">
                        <FontAwesomeIcon icon={faMailBulk} className="contact-icon" />
                        <p className="contact-info-title2">email</p>
                        <p>ngochuan199@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ContactBody