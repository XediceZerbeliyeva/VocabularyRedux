import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { Store } from "./Store";
import {add} from "./Slice";
import  './App.css'
import {Provider, useDispatch, useSelector} from 'react-redux'
export default function App() {
  const [modal, setModal] = useState(false);

  return (
    <Provider store={Store}>
    <div
      className="container"
    >
      <Word />
      <Create modal={{ modal, setModal }} />
    </div>
    </Provider>
  );
}

const Word = () => {
  const [index,setIndex]=useState(0);
  const dictionary=useSelector((state)=>state.dictionary);

  const move=(where)=>{
          if(where=="next"){
            setIndex((prev)=>prev+1);
          }
          else{
            setIndex((prev)=>prev-1);
          }
  }
  //  useEffect(()=>{
  //   console.log(dictionary);
  //  })
  return (
    <>
      <p className="words">
        {index+1} <span className="heart">❤️</span>
        <span className="current"> {dictionary.length}</span>
      </p>

      <div className="word">
        <div className="wordSegment">
          <button onClick={() => {
            if(index===0){
              return;
            }
            move("previous")}} className="icon-button">
            <span className="icon">⬅️</span>
          </button>
        </div>
        <div className="wordSegment">
          <span className="en"> {dictionary[index].en}</span>
          <span className="tr">{dictionary[index].aze}</span>
        </div>
        <div className="wordSegment">
          <button  onClick={() => {
            if(index+1===dictionary.length){
             return;
            }
            move("next")}} className="icon-button">
            <span className="icon">➡️</span>
          </button>
        </div>
      </div>
    </>
  );
};

const Create = (props) => {
  const { setModal } = props.modal;
  return (
    <div className="createButton">
      <div className="circle">
        <button onClick={() => setModal(true)} className="icon-button">
          <span className="icon">➕</span>
        </button>
      </div>
      <ModalView {...props} />
    </div>
  );
};
const ModalView = (props) => {
  const [en, setEn] = useState("");
  const [aze, setAze] = useState("");
  const dispatch = useDispatch();
  const { modal, setModal } = props.modal;

  return (
    <Modal
      isOpen={modal}
      onRequestClose={() => setModal(false)}
      contentLabel="Example Modal"
    >
      <div className="modal">
        <button
          className="close"
          onClick={() => setModal(false)}
          aria-label="Close modal"
        >
          <span className="cross">x</span>
        </button>

        <input
          onChange={(e) => setEn(e.target.value)}
          value={en}
          placeholder="English"
          className="textBox"
        />
        <input
          onChange={(e) => setAze(e.target.value)}
          value={aze}
          placeholder="Azerbaijan"
          className="textBox"
        />

        <button
          onClick={() => {
            const obj = { en, aze };
            dispatch(add(obj));
            // Optional: clear inputs after dispatch
            setEn("");
            setAze("");
          }}
          className="button"
        >
          <span className="buttonText">Save</span>
        </button>
      </div>
    </Modal>
  );
};