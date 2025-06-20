import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import styles from "./SignaturePad.module.css";

const SignaturePad = () => {
  const sigCanvas = useRef();

  const clear = () => sigCanvas.current.clear();

  const save = () => {
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    console.log(dataURL); // You can send this to backend or show preview
  };

  return (
    <div className={styles.signatureContainer}>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ width: 500, height: 200, className: styles.signatureCanvas }}
      />
      <div>
        <button onClick={clear}>Clear</button>
        <button onClick={save}>Save Signature</button>
      </div>
    </div>
  );
};

export default SignaturePad;