export const addCityMarkers = (svg) => {
    const countyPositions = [
        {
            name: "kern",
            x: 163.7050018310547,
            y: 429.6490020751953,
            properties: [
                {
                    name: "Homewood Suites – Bakersfield",
                    address: "1505 Mill Rock WayBakersfield, CA 93311",
                },
                {
                    name: "Motel 6 – Airport Olive",
                    address: "5241 Olive Tree Ct. Bakersfield, CA 93308",
                },
                {
                    name: "Motel 6 – Lebec",
                    address: "51541 Ralphs Ranch Rd. Lebec, CA 93243",
                },
                {
                    name: "Motel 6 – Lost Hills",
                    address: "14685 Warren StLost Hills, CA 93249",
                },
                {
                    name: "Studio 6 – Bakersfield",
                    address: "2514 White Ln. Bakersfield, CA 93304",
                },
                {
                    name: "Vagabond Inn - Bakersfield North",
                    address: "6100 Knudsen Dr. Bakersfield, CA 93308",
                },
                {
                    name: "Vagabond Inn Bakersfield South",
                    address: "6501 Colony St. Bakersfield, CA 93307",
                },
                {
                    name: "Vagabond Inn / Studio 6 Buttonwillow",
                    address: "20638 Tracy AveButtonwillow, CA 93206",
                },
                {
                    name: "Americas Best Value – Brundage",
                    address: "8230 East Brundage Ln.Bakersfield, CA 93307",
                },
                {
                    name: "Americas Best Value – Wible",
                    address: "830 Wible RoadBakersfield, CA 93304",
                },
                {
                    name: "Best Western - Lebec",
                    address: "5521 Dennis McCarthy Dr. Lebec, CA 93243",
                },
                {
                    name: "Days Inn – Lebec",
                    address: "9000 Countryside Ct.Lebec, CA 93243",
                },
                {
                    name: "Erth Inn - Mojave",
                    address: "15620 Sierra Highway Mojave, CA 93501",
                },
                {
                    name: "Hampton Inn - Tejon",
                    address: "5601 Outlets At Tejon ParkwayArvin, CA 93203",
                },
                {
                    name: "Microtel Inn & Suites",
                    address: "5620 Laval RdWheeler Ridge, CA 93203",
                },
                {
                    name: "Motel 6 – Mojave",
                    address: "16958 CA-58 Mojave, CA 93501",
                },
                {
                    name: "Motel 6 Delano",
                    address: "405 Cecil Ave. Delano, CA 93215",
                },
            ],
        },
        {
            name: "ventura",
            x: 138.6235008239746,
            y: 472.8294982910156,
            properties: [
                {
                    name: "Motel 6 – Camarillo",
                    address: "1641 East Daily Dr.Camarillo, CA 93010",
                },
            ],
        },
        {
            name: "santa-barbara",
            x: 100.48694610595703,
            y: 445.47950744628906,
            properties: [
                {
                    name: "Motel 6 – Carpinteria North",
                    address: "4200 Via Real Carpinteria, CA 93013",
                },
                {
                    name: "Motel 6 – Carpinteria South",
                    address: "5500 Carpinteria Ave Carpinteria, CA 93013",
                },
                {
                    name: "Motel 6 – Santa Barbara",
                    address: "3505 State St. Santa Barbara, CA 93105",
                },
            ],
        },
        {
            name: "monterey",
            x: 64.34289932250977,
            y: 349.79949951171875,
            properties: [
                {
                    name: "Motel 6 – Monterey",
                    address: "2124 N. Freemont St. Monterey, CA 93940",
                },
            ],
        },
        {
            name: "los-angeles",
            x: 173.67000579833984,
            y: 478.3119964599609,
            properties: [
                {
                    name: "Vagabond Inn – Sylmar",
                    address: "12775 Encinitas Ave. Sylmar, CA 91342",
                },
                {
                    name: "Motel 6 – Monterey Park",
                    address: "1560 Monterey Pass Rd.Monterey Park, CA 91754",
                },
            ],
        },
        {
            name: "tulare",
            x: 172.5294952392578,
            y: 381.3085021972656,
            properties: [
                {
                    name: "Americas Best Value – Visalia",
                    address: "623 West Main Street Visalia, CA 93291",
                },
            ],
        },
        {
            name: "san-luis-obispo",
            x: 93.80530166625977,
            y: 410.54750061035156,
            properties: [
                {
                    name: "Hotel Calle Joaquin - SLO",
                    address: "1585 Calle Joaquin San Luis Obispo, CA 93405",
                },
                {
                    name: "Rockview Inn – Morro Bay",
                    address: "1080 Market AveMorro Bay, CA 93442",
                },
                {
                    name: "Sea Garden Inn – Morro Bay",
                    address: "340 Stimson Ave. Pismo Beach, CA 93449",
                },
            ],
        },
        {
            name: "san-bernardino",
            x: 276.02349853515625,
            y: 479.52049255371094,
            properties: [
                {
                    name: "Colton Inn – Colton",
                    address: "1651 E Washington St Colton, CA 92324",
                },
            ],
        },
        {
            name: "riverside",
            x: 270.31500244140625,
            y: 545.95751953125,
            properties: [
                {
                    name: "Ramona Inn – Hemet",
                    address: "1120 E Florida Ave Hemet, CA 92543",
                },
                {
                    name: "Studio 6 Hemet",
                    address: "2780 W Florida Ave Hemet, CA 92545",
                },
                {
                    name: "Vagabond Inn Hemet",
                    address: "2688 E Florida Ave Hemet, CA 92544",
                },
            ],
        },
        {
            name: "santa-clara",
            x: 64.08140182495117,
            y: 293.10400390625,
            properties: [
                {
                    name: "Marco Polo Laundry",
                    address: "918 Bascom Ave. San Jose, CA 95128",
                },
                {
                    name: "Vagabond Inn Sunnyvale",
                    address: "816 W Ahwanee Ave Sunnyvale, CA 94085",
                },
            ],
        },
    ];

    countyPositions.forEach(function (county) {
        //Outer black circle
        const circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle",
        );
        circle.setAttribute("cx", county.x);
        circle.setAttribute("cy", county.y);
        circle.setAttribute("r", "13");
        circle.setAttribute("fill", "black");

        //Number of properties text 
        const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text",
        );
        text.setAttribute("x", county.x);
        text.setAttribute("y", county.y + 3); //move a little down in the circle
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", "white");
        text.setAttribute("font-size", "11px");
        text.textContent = String(county.properties.length);

        svg.appendChild(circle);
        svg.appendChild(text);

        //When this particular county is clicked on the map, display the properties associated with that 
        document
            .getElementById(`${county.name}`)
            .addEventListener("click", () => {
                const propertyDiv =
                    document.getElementById("property-list-text");
                propertyDiv.innerHTML = "";
                showPropertyNames(county);
            });
    });

    function showPropertyNames(county) {
        
        const propertyListTextDiv = document.getElementById("property-list-text");
        
        //County Name
        const h2 = document.createElement("h2");
        h2.classList.add("county-name");
        h2.textContent = String(county.name).toUpperCase();
        propertyListTextDiv.appendChild(h2);

        //Row for displaying the properties
        const propertyRowDiv = document.createElement("div");
        propertyRowDiv.classList.add("item-row");
        propertyRowDiv.style.display = "flex";

        county.properties.forEach(function (property) {
            const propertyNameDiv = document.createElement("div");
            propertyNameDiv.classList.add("property-details");
            const heading = document.createElement("h4");
            heading.textContent = property.name;
            const address = document.createElement("p");
            address.textContent = property.address;

            propertyNameDiv.appendChild(heading);
            propertyNameDiv.appendChild(address);
            propertyRowDiv.appendChild(propertyNameDiv);
        });
        propertyListTextDiv.appendChild(propertyRowDiv);
    }
};
