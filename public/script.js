function place(rows, columns) {
	for (let i = 0; i < columns; i++) {
		for (let n = 0; n < rows; n++) {
			let image = document.createElement("img");
			image.src = "./images/grasstiles.png";
			document.getElementById("container").append(image);
			image.style.gridRow = n + 1;
			image.style.gridColumn = i + 1;
		}
	}
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
