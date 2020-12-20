import React, { useState } from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css'

const PvcModal = ({
    title = 'Modal Window', 
    subtitle ='Confirm Data', 
    openBtn: OpenBtn,
    children,
    onConfirm,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            { !OpenBtn &&
                <button className='btn btn-pvc-main btn-block' onClick={() => setIsOpen(true)}>Open modal</button>
            }
            { OpenBtn && 
                <div onClick={() => setIsOpen(true)}>{OpenBtn}</div>
            }
            <Modal 
                open={isOpen} 
                onClose={() => setIsOpen(false)} 
                center classNames={{ modal: 'pvc-modal'}} 
                focusTrapped={false}
            >
                <h4 className='modal-title title'>{title}</h4>
                <p className='modal-subtitle'>{subtitle}</p>
                <div className='modal-body'>
                    {children}
                </div>
                <div className='modal-footer'>
                    <button
                        onClick={() => onConfirm(() => setIsOpen(false))}
                        type='button'
                        className='btn btn-pvc-main'>Confirm</button>
                    <button
                        onClick={() => setIsOpen(false)}
                        type='button'
                        className='btn btn-alert'>Cancel</button>
                </div>
            </Modal>
        </>
    )
}

export default PvcModal;