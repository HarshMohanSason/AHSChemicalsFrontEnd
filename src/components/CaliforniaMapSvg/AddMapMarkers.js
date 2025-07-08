import { toTitleCase } from "../../utils/StringUtils";

/**
 *  Global map of counties with their customers 
 *  @type {Map<string, Array<Object>>}
*/
let globalCustomerCountyMap = new Map();

/**
 * Adds the total number of customers per county with a black circle
 * and white number to the SVG. Clicking on the county displays the customers.
 *
 * @param {SVGElement} svg - The SVG element to add the map markers to.
 * @param {Array<Object>} customers - An array of customer objects.
 * @returns {Promise<Object>} An object containing:
 *   - totalCounties: number of counties with customers
 *   - totalCustomers: total number of customers
 */
async function addMapMarkers(svg, customers) {
    const svgWidth =
        svg.viewBox.baseVal.width || svg.getBoundingClientRect().width;

    //Load the tax rate json which contains all the california cities with their counties
    const response = await fetch("../../assets/ca_city_tax_rates.json");
    const data = await response.json();
    const customersCountyMap = new Map();

    //Map the counties for each customer
    customers.forEach((customer) => {
        const customerCity = customer?.BillAddr?.City?.toUpperCase();
        const customerCounty = data[customerCity]?.County?.toLowerCase();
        if (!customerCounty) return;

        if (customersCountyMap.has(customerCounty)) {
            customersCountyMap.get(customerCounty).push(customer);
        } else {
            customersCountyMap.set(customerCounty, [customer]);
        }
    });

    globalCustomerCountyMap = customersCountyMap;

    customersCountyMap.forEach((customers, county) => {
        //get the county path element
        const pathElement = document.getElementById(county);
        if (!pathElement) return;

        //Get the center of the path
        const bbox = pathElement.getBBox();
        const centerX = bbox.x + bbox.width / 2;
        const centerY = bbox.y + bbox.height / 2;

        //Determine where to draw the text (left or right of the svg)
        const isLeft = centerX < svgWidth / 2;

        const offsetX = isLeft ? centerX - 85 : 75;
        const labelOffsetX = isLeft ? centerX - 110 : centerX + 100;

        //Create the line
        const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line",
        );
        line.setAttribute("x1", offsetX);
        line.setAttribute("y1", centerY);
        line.setAttribute("x2", centerX);
        line.setAttribute("y2", centerY);
        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", "0.2");

        // Create the black circle
        const circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle",
        );
        circle.setAttribute("cx", labelOffsetX); // Adjust to center the circle
        circle.setAttribute("cy", centerY);
        circle.setAttribute("r", "12");
        circle.setAttribute("fill", "black");

        // Create the white number text
        const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text",
        );
        text.setAttribute("x", labelOffsetX);
        text.setAttribute("y", centerY + 4);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", "white");
        text.setAttribute("font-size", "12px");
        text.setAttribute("font-weight", "600");
        text.textContent = `${customers.length}`;

        svg.appendChild(line);
        svg.appendChild(circle);
        svg.appendChild(text);

        pathElement.style.cursor = "pointer";
        pathElement.addEventListener("click", () => {
            createCustomersDisplayRow(county);
        });
    });

    return {
        totalCounties: customersCountyMap.size,
        totalCustomers: [...customersCountyMap.values()].reduce(
            (total, arr) => total + arr.length,
            0,
        ),
    };
}

/** 
 * Creates the display row for cutomers per county from the globalCustomerCountyMap
 * @param {string} county - The name of the county
 * @returns {void}
*/ 
function createCustomersDisplayRow(county) {
    const propertyListTextDiv = document.getElementById("property-list-text");
    //Clear the previous row before displaying new customers for the county
    propertyListTextDiv.innerHTML = "";

    const customers = globalCustomerCountyMap.get(county);
    if (!customers) return;

    //County Name
    const h2 = document.createElement("h2");
    h2.classList.add("county-name");
    h2.textContent = `${toTitleCase(county)} County`;
    propertyListTextDiv.appendChild(h2);

    //Create the div for displaying the properties
    const propertyRowDiv = document.createElement("div");
    propertyRowDiv.classList.add("item-row");
    propertyRowDiv.style.display = "flex";

    //Appending each customer to the row
    customers.forEach(function (customer) {
        //Create a div to add the customer details to it
        const propertyNameDiv = document.createElement("div");
        propertyNameDiv.classList.add("property-details");

        //Customer name
        const heading = document.createElement("h4");
        heading.textContent = customer?.DisplayName;
        //Customer address
        const address = document.createElement("p");
        address.textContent = `${customer?.BillAddr?.Line1}, ${customer?.BillAddr?.City}, ${
            customer?.BillAddr?.CountrySubDivisionCode
        } ${customer?.BillAddr?.PostalCode}`;

        propertyNameDiv.appendChild(heading);
        propertyNameDiv.appendChild(address);
        propertyRowDiv.appendChild(propertyNameDiv);
    });
    propertyListTextDiv.appendChild(propertyRowDiv);
}
export { addMapMarkers };
