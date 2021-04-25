import React, { Component } from 'react';
import './style.css';

const GoogleMap = () => {
    return (
        <div className="google-map">
            <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.4594173098067!2d108.43277401476001!3d11.942661091536669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3171132ec0bde1f1%3A0xc5785eac2042773a!2zMjUgQmEgVGjDoW5nIEhhaSwgUGjGsOG7nW5nIDEsIFRow6BuaCBwaOG7kSDEkMOgIEzhuqF0LCBMw6JtIMSQ4buTbmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1618656727061!5m2!1svi!2s"
                width="100%"
                height="100%"
                frameBorder="0"
                aria-hidden="false"
                tabIndex="0" />
        </div>
    );
}


export default GoogleMap;