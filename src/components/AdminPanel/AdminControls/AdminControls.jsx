import sharedStyles from "../AdminPanel.module.css";
import {
	faChevronDown,
	faChevronUp,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./AdminControls.module.css";
import { useRef, useState } from "react";
import { useFiltersContext } from "../../../contexts/FiltersContext";
import { useAlertContext } from "../../../contexts/AlertBoxContext";
import InputDialogWizard from "../InputDialogWizard/InputDialogWizard";
import { AddBrand, AddType } from "./AddFilter";

const AdminControls = () => {
	const [isBrandsExpanded, setIsBrandsExpanded] = useState(false);
	const [isTypesExpanded, setIsTypesExpanded] = useState(false);
	const [currentDialogView, setDialogView] = useState(0);

	const filters = useFiltersContext();
	const { confirmationAlert } = useAlertContext();

	const dialogRef = useRef(null);

	const [stepsType, setStepsType] = useState("brand");

	const getSteps = () => {
		switch (stepsType) {
			case "brand":
				return [
					{
						step: "Add a Brand",
						view: <AddBrand />,
					},
				];
			case "type":
				return [
					{
						step: "Add a Type",
						view: <AddType />,
					},
				];
			default:
				return [];
		}
	};

	const getDialogSubmitFunc = () => {
		switch (stepsType) {
			case "brand":
				return () => filters.addBrand(filters.newBrandInput)
			case "type":
				return () => filters.addType(filters.newTypeInput);
			default:
				return null;
		}
	};

	return (
		<section className={styles.adminControlsSection}>
			<section className={styles.filterSection}>
				<section
					className={sharedStyles.addDataTile}
					onClick={() => setIsBrandsExpanded(!isBrandsExpanded)}
				>
					<p>Brands</p>
					<button className={styles.filterDeleteButton}>
						<FontAwesomeIcon
							icon={
								isBrandsExpanded ? faChevronUp : faChevronDown
							}
							className={styles.editAccountIcon}
						/>
					</button>
				</section>
				{isBrandsExpanded && filters.brands && (
					<section className={styles.filterDisplaySection}>
						{filters.brands.map((brand, index) => (
							<div className={styles.filterTile} key={brand.id}>
								<p key={index}>{brand.name}</p>
								<button
									className={styles.deleteButton}
									onClick={() => {
										confirmationAlert.showAlert(
											"Delete Brand?",
											`Are you sure you want to delete brand ${brand.name}?`,
											async () =>
												await filters.deleteBrand(
													brand.id,
												),
											"Delete",
										);
									}}
								>
									<FontAwesomeIcon
										icon={faTrash}
										className={styles.trashIcon}
									/>
								</button>
							</div>
						))}
						<button
							className={styles.addFilterButton}
							onClick={() => {
								setStepsType("brand");
								dialogRef?.current.showModal();
							}}
						>
							+
						</button>
					</section>
				)}
			</section>
			<section className={styles.filterSection}>
				<section
					className={sharedStyles.addDataTile}
					onClick={() => setIsTypesExpanded(!isTypesExpanded)}
				>
					<p>Types</p>
					<button>
						<FontAwesomeIcon
							icon={isTypesExpanded ? faChevronUp : faChevronDown}
							className={styles.editAccountIcon}
						/>
					</button>
				</section>
				{isTypesExpanded && filters.types && (
					<section className={styles.filterDisplaySection}>
						{filters.types.map((type, index) => (
							<div className={styles.filterTile} key={type.id}>
								<p key={index}>{type.name}</p>
								<button
									className={styles.deleteButton}
									onClick={() => {
										confirmationAlert.showAlert(
											"Delete Brand?",
											`Are you sure you want to delete brand ${type.name}?`,
											async () =>
												await filters.deleteType(
													type.id,
												),
											"Delete",
										);
									}}
								>
									<FontAwesomeIcon
										icon={faTrash}
										className={styles.trashIcon}
									/>
								</button>
							</div>
						))}
						<button
							className={styles.addFilterButton}
							onClick={() => {
								setStepsType("type");
								dialogRef?.current.showModal();
							}}
						>
							+
						</button>
					</section>
				)}
			</section>
			<InputDialogWizard
				dialogRef={dialogRef}
				steps={getSteps()}
				handleSubmit={getDialogSubmitFunc()}
				currentView={currentDialogView}
				setCurrentView={setDialogView}
			/>
		</section>
	);
};

export default AdminControls;
