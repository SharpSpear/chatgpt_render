import React from 'react';
import { createPopup } from '@typeform/embed';
import Modal from '../Modal';
import '@typeform/embed/build/css/popup.css';

const Popup = (props) => 
    <Modal create={createPopup} {...props} />;

export default Popup;

// import { createPopup } from "@typeform/embed";
// import "@typeform/embed/build/css/popup.css";

// const MyComponent = () => {
//   const openPopup = (event) => {
//    createPopup("<form id>", {
//     hidden: {
//      value: event.currentTarget.value
//     }
//    }).open()
//   }

//   return <input type="text" onChange={openPopup} />
// }