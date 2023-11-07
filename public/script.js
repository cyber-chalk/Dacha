function place(rows, columns) {
	for (let i = 0; i < columns; i++) {
		for (let n = 0; n < rows; n++) {
			let image = document.createElement("img");
			image.src = "./images/grasstiles.png";
			document.getElementById("container").append(image);
			image.style.gridRow = n + 1;
			image.style.gridColumn = i + 1;
			image.style = "width: 128px; height: 128px;";
			image.style.objectFit = "cover";
			// image.style.objectPosition = "-200px 0";
			image.style.objectPosition = `${
				Math.floor(getRandom(0, 6)) * -128 - 256
			}px 0`;
		}
	}
}

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

// repositon
place(
	window
		.getComputedStyle(document.getElementById("container"))
		.getPropertyValue("grid-template-rows")
		.split(" ").length,
	window
		.getComputedStyle(document.getElementById("container"))
		.getPropertyValue("grid-template-columns")
		.split(" ").length
);

// looping system
//coords sytem / normal
// other loop O(n)
