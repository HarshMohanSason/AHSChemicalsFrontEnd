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
      const sanitizedContent = DOMPurify.sanitize(content);
      setProduct((prev) => ({ ...prev, description: sanitizedContent }));
    }
  };

  const handleInput = () => {
    updateDescription();
  };

  const toolbarButtons = [
    { icon: faBold, command: "bold" },
    { icon: faItalic, command: "italic" },
    { icon: faUnderline, command: "underline" },
    { icon: faStrikethrough, command: "strikeThrough" },
    { icon: faListUl, command: "insertUnorderedList" },
    { icon: faListOl, command: "insertOrderedList" },
    { icon: faQuoteRight, command: "formatBlock", value: "blockquote" },
    { icon: faEraser, command: "removeFormat" },
  ];

  return (
    <section className={styles.productDescSection}>
      <div className={styles.toolbar}>
        {toolbarButtons.map((btn, index) => (
          <button
            key={index}
            type="button"
            onClick={() => exec(btn.command, btn.value)}
          >
            <FontAwesomeIcon icon={btn.icon} />
          </button>
        ))}

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
      </div>

      <div
        className={styles.descriptionTextArea}
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
      />

    </section>
  );
};
