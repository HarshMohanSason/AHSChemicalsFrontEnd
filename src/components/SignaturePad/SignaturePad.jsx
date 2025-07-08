import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { uploadSingleFileToStorage } from "../../utils/Firebase/FirebaseStorage";
import styles from "./SignaturePad.module.css";
import {
  deleteSignatureFromStorage,
  updateOrderSignatureURLInFirestore,
} from "../../utils/Firebase/Orders";

const SignaturePad = ({ orderID, onSave }) => {
  const sigCanvas = useRef();

  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth * 0.88,
    height: window.innerHeight - 130,
  });

  useEffect(() => {
    const ratio = window.devicePixelRatio || 1;

    const scaleCanvas = () => {
      const canvas = sigCanvas.current?.getCanvas();
      if (!canvas) return;

      const { width, height } = canvasSize;

      canvas.width = width * ratio;
      canvas.height = height * ratio;

      const ctx = canvas.getContext("2d");
      ctx.scale(ratio, ratio);
    };

    // Wait for React to fully render the canvas before scaling
    requestAnimationFrame(scaleCanvas);
  }, [canvasSize]);

  const clear = () => sigCanvas.current.clear();

  const save = async () => {
    try {
      const dataURL = sigCanvas.current.toDataURL("image/png");
      const blob = await (await fetch(dataURL)).blob();
      await deleteSignatureFromStorage(orderID);
      const storagePath = `orders/${orderID}/signature.png`;
      const signatureURL = await uploadSingleFileToStorage(blob, storagePath);
      await updateOrderSignatureURLInFirestore(orderID, signatureURL);
      if (signatureURL !== "") {
        onSave(signatureURL);
        clear();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.signatureContainer}>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{
          width: canvasSize.width,
          height: canvasSize.height,
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
