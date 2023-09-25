import React, {useEffect, useState} from 'react';
import { Modal } from 'react-bootstrap';
import IconCloseModalImage from '../assets/images/icon-close-modal.png';
import ErrorImage from '../assets/images/node-trans-failed.png';
const ErrorModal = ({errorContent, status}) => {

    const [modalStatus, setModalStatus] = useState(false);
    const handleModalShow = () => {
        setModalStatus(false);
    }
    useEffect(()=>{
        setModalStatus(status);
    }, [status])
    return (

        <Modal show={modalStatus} onHide={handleModalShow} id="withdraw-modal">
            <Modal.Header>
                <h4 className="modal-title w-100">Warnning</h4>
                <button type="button" className="close" onClick={handleModalShow}>
                    <img src={IconCloseModalImage} />
                </button>
            </Modal.Header>
            <Modal.Body>
                <div className="withdrawsecond">
                    <div className="img"><img src={ErrorImage} /></div>
                    <div className="text1">Oh No! :(</div>
                    <p>{errorContent}</p>
                    <div className="btn-container">
                        <button type="button" className="btn btn-primary" onClick={handleModalShow} >OK Got it!</button>
                    </div>
                </div> 
            </Modal.Body>
        </Modal>
    )
}
export default ErrorModal;