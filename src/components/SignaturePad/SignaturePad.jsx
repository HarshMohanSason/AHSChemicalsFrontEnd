import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { uploadSingleFileToStorage } from "../../utils/Firebase/FirebaseStorage";
import styles from "./SignaturePad.module.css";
import {deleteSignatureFromStorage, updateOrderSignatureURLInFirestore} from "../../utils/Firebase/Orders"
const SignaturePad = ({ orderID, onSave }) => {
  const sigCanvas = useRef();

  const clear = () => sigCanvas.current.clear();

  const save = async () => {
    const dataURL = sigCanvas.current.toDataURL("image/png");
    const blob = await (await fetch(dataURL)).blob();
   
    await deleteSignatureFromStorage(orderID)
    const signatureURL = await uploadSingleFileToStorage(
      blob,
      "orders",
      orderID,
      "signature.png",
    );
    await updateOrderSignatureURLInFirestore(orderID, signatureURL);
    clear();
    if (signatureURL !== "") {
      onSave(signatureURL);
    }
  };

  return (
    <div className={styles.signatureContainer}>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{
          width: 860,
          height: 400,
          className: styles.signatureCanvas,
        }}
      />
      <div className={styles.signatureButtons}>
        <button onClick={clear}>Clear</button>
        <button onClick={save}>Save Signature</button>
      </div>
    </div>
  );
};

export default SignaturePad;
