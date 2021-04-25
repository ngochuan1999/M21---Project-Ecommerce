import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';
function ModalAdd(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onClick={props.toggleModal}>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.toggleModal}>Close</Button>
            </Modal.Footer> */}
        </Modal>
    )

}

export default ModalAdd