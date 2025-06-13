import styles from "./InputDialogWizardShared.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faListUl,
  faListOl,
  faQuoteRight,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import { FormValidationResult } from "../../InputDialogWizard/FormValidationResult";
import DOMPurify from "dompurify";
import { useRef, useEffect } from "react";

export const InputProductDescription = ({ product, setProduct, error }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (
      editorRef.current &&
      product.description !== editorRef.current.innerHTML
    ) {
      editorRef.current.innerHTML = product.description || "";
    }
  }, [product.description]);

  const exec = (command, value = null) => {
    document.execCommand(command, false, value);
    updateDescription();
  };

  const updateDescription = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setProduct((prev) => ({ ...prev, description: content }));
    }
  };

  const handleInput = () => {
    updateDescription();
  };

  return (
    <section className={styles.productDescSection}>
      <div className={styles.toolbar}>
        <button type="button" onClick={() => exec("bold")}>
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button type="button" onClick={() => exec("italic")}>
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <select
          onChange={(e) => exec("formatBlock", e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Select a heading
          </option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
        </select>
        <button type="button" onClick={() => exec("underline")}>
          <FontAwesomeIcon icon={faUnderline} />
        </button>
        <button type="button" onClick={() => exec("strikeThrough")}>
          <FontAwesomeIcon icon={faStrikethrough} />
        </button>
        <button type="button" onClick={() => exec("insertUnorderedList")}>
          <FontAwesomeIcon icon={faListUl} />
        </button>
        <button type="button" onClick={() => exec("insertOrderedList")}>
          <FontAwesomeIcon icon={faListOl} />
        </button>
        <button type="button" onClick={() => exec("formatBlock", "blockquote")}>
          <FontAwesomeIcon icon={faQuoteRight} />
        </button>
        <button type="button" onClick={() => exec("removeFormat")}>
          <FontAwesomeIcon icon={faEraser} />
        </button>
      </div>

      <div
        className={styles.descriptionTextArea}
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        style={{ borderColor: error ? "red" : "" }}
      />

      <output className={styles.descError}>{error}</output>
    </section>
  );
};

export const validateDescription = (description) => {
  const clean = DOMPurify.sanitize(description);
  const stripped = clean
    .replace(/<br\s*\/?>/gi, "")
    .replace(/&nbsp;/g, "")
    .trim();
  let error = null;
  if (stripped === "") {
    error = "Description cannot be empty";
  }
  return new FormValidationResult(!error, error);
};
