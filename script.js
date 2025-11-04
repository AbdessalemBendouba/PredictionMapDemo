function generateGridAndLegend(data) {

    const gridContainer = document.getElementById('the-map');
    const legendContainer = document.getElementById('legend');
    
	const colorMap = {};
    const predefinedColors = ['#FF6347', '#FFD700', '#ADFF2F', '#4682B4', '#DA70D6', '#20B2AA', '#FFA07A'];
    let colorIndex = 0;

    function getColorForString(str) {
        if (!colorMap[str]) {
            if (colorIndex < predefinedColors.length) {
                colorMap[str] = predefinedColors[colorIndex];
                colorIndex++;
            } else {
                // Fallback to a random color if we run out of predefined colors
                colorMap[str] = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
            }
        }
        return colorMap[str];
    }

    let maxX = 0;
    let maxY = 0;
    for (const item of data) {
        if (item.x > maxX) {
            maxX = item.x;
        }
        if (item.y > maxY) {
            maxY = item.y;
        }
        // Ensure all unique data strings have a color assigned
        getColorForString(item.data);
    }

    gridContainer.style.gridTemplateColumns = `repeat(${maxX + 1}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${maxY + 1}, 1fr)`;

    data.forEach(item => {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.style.backgroundColor = getColorForString(item.data);
        cell.title = item.data; // Add a tooltip to show the data value on hover

        cell.style.gridColumnStart = item.x + 1;
        cell.style.gridRowStart = item.y + 1;

        gridContainer.appendChild(cell);
    });

    // Create the legend
    for (const [key, value] of Object.entries(colorMap)) {
        const legendItem = document.createElement('div');
        legendItem.classList.add('legend-item');

        const legendColor = document.createElement('div');
        legendColor.classList.add('legend-color');
        legendColor.style.backgroundColor = value;

        const legendText = document.createElement('span');
        legendText.textContent = key;

        legendItem.appendChild(legendColor);
        legendItem.appendChild(legendText);
        legendContainer.appendChild(legendItem);
	}
}
/* 
async function fetchDataAndRender(){
	try{
		const response = await fetch('data.json');
		const data = await response.json();
		generateGridAndLegend(data);
	} catch (error) {
		console.error('error!!', error);
		document.getElementById('the-map').textContent="error!!!";
	}
} */

if (typeof gridData !== 'undefined') {
	generateGridAndLegend(gridData);
} else {
	console.error('The gridData variable was not found. Did data.js load correctly?');
	document.getElementById('the-map').textContent = 'Error: Could not load data file.';
}