import React, { Component } from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import bg_modal from './images/sign-road-sunlight-hd-2K-wallpaper.jpg'

export default class ModalApp extends Component {
  render() {
    const {data, ModalVisible, toggleModal, second, minute, count} = this.props
    return (
        <Modal id='modal' style={{backgroundImage:{bg_modal}, height: '100vh', width: '100vw'}} isOpen={ModalVisible} toggle={toggleModal}>
          <ModalHeader id='modalHeader'>
            <div className="card-body">
                <h3 className='text-center'>{minute}:{second}</h3>
                {data.forEach((item) => {
                    return <h1>{item.symbol_title}</h1>
                  })}
                <h3>Count: {count} </h3>
            </div>
          </ModalHeader>
          <ModalBody id='modalBody'>
              <ul style={{display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gridGap: "20px"}}>
                {
                data.map(item => {
                  return <li style={{padding: "20px" ,alignItems: "center"}}><img alt='IMG' width={100} src={item.symbol_img}/></li>
                })
                }
              </ul>
          </ModalBody>
          <ModalFooter id='modalFooter'>
            <button className='btn btn-danger mx-2' onClick={toggleModal}>Stop</button>
          </ModalFooter>
        </Modal>
    )
  }
}
