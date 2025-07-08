import { ReactComponent as CaliforniaMapSvg } from "../../assets/california_map.svg";
import { useEffect } from "react";
import "./CaliforniaMap.css";
import { addMapMarkers } from "./AddMapMarkers";

/** 
 * This component renders the map of California with the customer locations.
 * It uses the CaliforniaMapSvg component to render the map.
 * It also uses the addMapMarkers function to add the customer locations to the map.
 * @param {Array} customers - An array of customer objects.
 * @param {Function} setMapStats - A function that sets the map stats.
 * @returns {JSX.Element} - The CaliforniaMap component.
 */
const CaliforniaMap = ({ customers, setMapStats }) => {
	useEffect(() => {
		const svg = document.getElementById("california-svg");
		const markers = async () => {
			if (svg && customers?.length > 0) {
				const stats = await addMapMarkers(svg, customers);
				setMapStats(stats);
			}
		};
		markers();
	}, [customers]);

	return <CaliforniaMapSvg />;
};

export default CaliforniaMap;
