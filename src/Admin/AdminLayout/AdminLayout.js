import React, { Component } from 'react';


function AdminLayout(props) {
    return (
        <div>
            <div>
                {props.children}
            </div>
        </div>
    )
};

export default AdminLayout;