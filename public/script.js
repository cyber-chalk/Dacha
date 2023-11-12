function place(rows, columns) {
	for (let i = 0; i < columns; i++) {
		for (let n = 0; n < rows; n++) {
			let grass = document.createElement("img");
			grass.src = "./images/grassTiles.png";
			document.getElementById("container").append(grass);
			grass.style.gridRow = n + 1;
			grass.style.gridColumn = i + 1;

			grass.style = "width: 128px; height: 128px;";
			grass.style.objectFit = "cover";

			let rand = Math.floor(getRandom(0, 16));
			let positioning = 0;

			if (rand < 12) positioning = 4;
			else if (rand < 13) positioning = 3;
			else if (rand < 14) positioning = 2;
			else if (rand < 15) positioning = 1;
			else if (rand < 16) positioning = 0;
			grass.style.objectPosition = `${
				positioning * -128
				// Math.floor(getRandom(0, 5)) * -128
			}px 0`;
			//
			//
		}
	}
}

function placeEx(rows, columns) {
	for (let i = 0; i < columns; i++) {
		for (let n = 0; n < rows; n++) {
			if (i == 2) {
				// console.log(columns);
				let floorBlock = document.createElement("img");
				floorBlock.src = "./images/floor.png";
				document.getElementById("container").append(floorBlock);

				floorBlock.style =
					"width: 128px; height: 128px; object-fit: cover";
				floorBlock.style.gridRow = n + 1;
				floorBlock.style.gridColumn = i + 1;
			}
		}
	}
}

let dirtRow = 0;
let keyPair = {};

function placeDirt(x, y) {
	let dirt = document.createElement("img");
	dirt.src = "./images/dirt.png";
	dirt.classList.add(`dirtBlock${dirtRow}`);

	document.getElementById("container").append(dirt);

	dirt.style = "width: 128px; height: 128px; position: absolute";
	dirt.style.objectFit = "cover";
	dirt.style.gridArea = x + "/" + y; // needs to be below object fit
	let list = document.getElementsByClassName(`dirtBlock${dirtRow}`);
	// order list in terms of grid column start from smallest to largest

	console.log(list, "list");
	for (let i = 0; i < list.length; i++) {
		keyPair[
			window
				.getComputedStyle(list[i])
				.getPropertyValue("grid-column-start") + +i.toString()
		] = list[i];
	}

	let final = Object.values(keyPair).sort();
	// for (let i = 0; i < final.length; i++) final[i] = final[i].slice(0, -1);

	console.log("KeyPair", keyPair, "final", final);

	let previouslevel;

	for (let i = 0; i < final.length; i++) {
		// console.log("class", final[i]);

		let yLevel = window
			.getComputedStyle(final[i])
			.getPropertyValue("grid-row-start");

		if (previouslevel == undefined) {
			// console.log(previouslevel, "prev");
			previouslevel = yLevel;
		}
		if (previouslevel != yLevel) {
			console.log(previouslevel, yLevel, "left Ylevel");
			final[i].classList.remove(`dirtBlock${dirtRow}`);
			final[i].classList.add(`dirtBlock${dirtRow++}`);
			//add another class or change the class
		}
		// console.log(final[i].style, "sorto");
		final[i].style.objectPosition = "-256px 0";

		final[0].style.objectPosition = "0px 0";
		final[final.length - 1].style.objectPosition = "-128px 0";

		// split up the array into same columns
	}
}
placeDirt(7, 11);

// just loop through every time a tile is placed to check proper tile

// make functions to edit the tiles when placed down

// cant you just make an array of every position of dirt then on the left most one make it an edge

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

placeEx(
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
