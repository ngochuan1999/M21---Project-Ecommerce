import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header'
import Slide from '../Slide';


function MainLayout(props) {
    return (
        <div className="content">
            <Header {...props} />
            {/* <Slide /> */}
            <body className='body'>
                {props.children}
            </body>
            <Footer />
        </div>
    )

};

export default MainLayout;