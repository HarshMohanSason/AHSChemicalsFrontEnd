import { useState, useRef, useEffect } from "react";

export default function ProductTileButton({ onEdit, onDelete }) {
	const [showMenu, setShowMenu] = useState(false);
	const dropdownRef = useRef(null);

	// Click outside to close
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowMenu(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div ref={dropdownRef} style={{ position: "relative", display: "inline-block" }}>
			<button
				onClick={() => setShowMenu((prev) => !prev)}
				style={{
					padding: "4px 8px",
					background: "#A5C759",
					borderRadius: "4px",
					fontSize: "16px",
					cursor: "pointer",
				}}
			>
				⋯
			</button>

			{showMenu && (
				<select
					size="2"
					style={{
						position: "absolute",
						top: "100%",
						fontSize: "18px",
						right: 0,
						width: "100px",
						borderRadius: "4px",
						border: "1px solid #ccc",
						background: "white",
						boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
						cursor: "pointer",
					}}
					onChange={(e) => {
						const action = e.target.value;
						setShowMenu(false);
						if (action === "edit") onEdit();
						if (action === "delete") onDelete();
					}}
					onBlur={() => setShowMenu(false)}
				>
					<option value="edit">Edit</option>
					<option value="delete">Delete</option>
				</select>
			)}
		</div>
	);
}