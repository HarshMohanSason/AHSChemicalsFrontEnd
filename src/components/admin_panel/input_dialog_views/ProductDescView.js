import React, { useRef, useState, useEffect } from "react";
import "../../../styles/components/admin_panel/input_dialog_views/ProductDescView.css";

export default function ProductDescView({ productData, setProductData }) {
	const editorRef = useRef(null);
	const [activeFormats, setActiveFormats] = useState([]);

	//Load the div with initial values
	useEffect(() => {
		if (editorRef.current && productData.description) {
			editorRef.current.innerHTML = productData.description;
		}
	}, [productData.description]);

	const applyFormat = (command) => {
		editorRef.current.focus();
		document.execCommand(command, false, null);

		// Toggle active state for the button
		setActiveFormats((prev) => {
			if (prev.includes(command)) {
				return prev.filter((c) => c !== command);
			} else {
				return [...prev, command];
			}
		});
	};

	const applyHeading = (level) => {
		editorRef.current.focus();
		document.execCommand("formatBlock", false, `<h${level}>`);
	};

	return (
		<section className="product-desc-section">
			<div className="toolbar">
				<select onChange={(e) => applyHeading(e.target.value)}>
					<option value="">Normal</option>
					<option value="1">Heading 1</option>
					<option value="2">Heading 2</option>
					<option value="3">Heading 3</option>
					<option value="4">Heading 4</option>
					<option value="5">Heading 5</option>
					<option value="6">Heading 6</option>
				</select>
				<button
					type="button"
					onClick={() => applyFormat("bold")}
					className={activeFormats.includes("bold") ? "active" : ""}
				>
					Bold
				</button>
				<button
					type="button"
					onClick={() => applyFormat("underline")}
					className={
						activeFormats.includes("underline") ? "active" : ""
					}
				>
					Underline
				</button>
				<button
					type="button"
					onClick={() => applyFormat("insertUnorderedList")}
					className={
						activeFormats.includes("insertUnorderedList")
							? "active"
							: ""
					}
				>
					Dotted List
				</button>
				<button
					type="button"
					onClick={() => applyFormat("insertOrderedList")}
					className={
						activeFormats.includes("insertOrderedList")
							? "active"
							: ""
					}
				>
					Ordered List
				</button>
			</div>
			<div
				ref={editorRef}
				contentEditable
				className="editor"
				placeholder="Enter the product description"
				onBlur={() => {
					setProductData({
						...productData,
						description: editorRef.current.innerHTML,
					});
				}}
				style={{
					minHeight: "300px",
					border: "1px solid #ccc",
					outline: "none",
					borderRadius: "6px",
					padding: "20px",
					marginTop: "10px",
				}}
			/>
		</section>
	);
}
