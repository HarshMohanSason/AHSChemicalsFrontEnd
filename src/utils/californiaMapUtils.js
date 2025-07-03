import { toTitleCase } from "./StringUtils";

export const addCityMarkers = (svg, properties) => {
    properties.map((property) => {
        const x = property?.svg_circle_x_pos;
        const y = property?.svg_circle_y_pos;
        if (!x || !y) return;

        const circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle",
        );
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", "13");
        circle.setAttribute("fill", "black");

        const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text",
        );
        text.setAttribute("x", x);
        text.setAttribute("y", y + 3);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", "white");
        text.setAttribute("font-size", "11px");
        text.textContent = "1";

        svg.appendChild(circle);
        svg.appendChild(text);

        const target = document.getElementById(
            property?.Property?.Address?.County?.toLowerCase(),
        );
        if (target) {
            target.addEventListener("click", () => {
                const propertyDiv =
                    document.getElementById("property-list-text");
                if (propertyDiv) {
                    propertyDiv.innerHTML = showPropertyNames(
                        property?.Property,
                    );
                }
            });
        }
    });
};

function showPropertyNames(property) {
    const propertyListTextDiv = document.getElementById("property-list-text");

    //County Name
    const h2 = document.createElement("h2");
    h2.classList.add("county-name");
    h2.textContent = toTitleCase(String(property?.Address?.County)) + " County";
    propertyListTextDiv.appendChild(h2);

    //Row for displaying the properties
    const propertyRowDiv = document.createElement("div");
    propertyRowDiv.classList.add("item-row");
    propertyRowDiv.style.display = "flex";

    property.properties.forEach(function (property) {
        const propertyNameDiv = document.createElement("div");
        propertyNameDiv.classList.add("property-details");
        const heading = document.createElement("h4");
        heading.textContent = property?.Name;
        const address = document.createElement("p");
        address.textContent = `${property?.Address?.Line1}, ${property?.Address?.City}, ${
            property?.Address?.CountrySubDivisionCode
        } ${property?.Address?.PostalCode}`;

        propertyNameDiv.appendChild(heading);
        propertyNameDiv.appendChild(address);
        propertyRowDiv.appendChild(propertyNameDiv);
    });
    propertyListTextDiv.appendChild(propertyRowDiv);
}
