import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Button } from "primereact/button";
// import "react-widgets/styles.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "max-content",
    height: "90vh",
    boxShadow: "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)",
  },
  overlay: { zIndex: 1000, boxShadow: "5px 5px 15px 5px #000000" },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

Modal.setAppElement("#root");

function ModalMantenimiento(props) {
  const { veryfyItems = false } = props;

  const [modalIsOpen, setIsOpen] = useState(props.isOpen ?? false);
  // console.log(props.isOpen)
  function openModal() {
    if (veryfyItems) {
      if (veryfyItems()) {
        setIsOpen(true);
      }
    } else {
      setIsOpen(true);
    }
  }

  function closeModal() {
    setIsOpen(false);
  }
  // Efecto abrir modal
  useEffect(() => {
    if (props.isOpen) {
      openModal();
    }
  }, [props.isOpen]);

  useEffect(() => {
    if (props.closeModal) {
      setIsOpen(false);
    }
  }, [props.closeModal]);

  useEffect(() => {
    if (props.setExternalOpen && modalIsOpen === false) {
      props.setExternalOpen(false);
    }
  }, [modalIsOpen]);

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  // }

  let BodyHeaderStateChange = null;
  if (props.icon) {
    BodyHeaderStateChange = (
      <Button
        className={
          props.classButton
            ? props.classButton
            : ""
        }
        onClick={openModal}
        tooltipOptions={props.buttonTooltipOptions}
        tooltip={props.tooltik}
        icon={props.icon}
        disabled={props.disabled}
        loading={props.loading}
        label={props.title}
      />
    );
  } else {
    BodyHeaderStateChange = (
      <button
        className={props.buttonClass}
        onClick={openModal}
        tooltip={props.tooltik}
        disabled={props.disabled}
      >
        {props.title}
      </button>
    );
  }
  if (props.btnDisplayed == false) {
    BodyHeaderStateChange = null;
  }
  return (
    <>
      {BodyHeaderStateChange}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={props.afterOpenModal}
        onAfterClose={props.afterCloseModal}
        onRequestClose={closeModal}
        style={props.customStyles ?? customStyles}
        contentLabel={`${props.label} Modal`}
      >
        <div className="text-center bg-indigo-700 text-white absolute top-0 left-0 w-full px-0 mx-0">
          <h1 className="title pt-4 pb-3 text-white">{props.label?.toUpperCase()}</h1>

          {/* <div className="absolute w-full h-full text-black top-0">
            <div className="absolute w-1/2 h-full d-flex justify-center items-center right-0">
              {props.headerBadges}
            </div>
          </div> */}

          <div className="absolute right-0 text-white top-0 mr-1 mt-1">
            <button
              title="Cerrar ventana"
              className="hover:bg-red-500 font-bold py-2 px-3 rounded-full inline-flex items-center"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <hr />
        </div>
        <div className="mt-20"></div>
        {props.children}
      </Modal>
    </>
  );
}

export default ModalMantenimiento;
