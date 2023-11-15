function place(rows, columns) {
	for (let i = 0; i < columns; i++) {
		for (let n = 0; n < rows; n++) {
			let grass = document.createElement("img");
			grass.src = "./images/grassTiles.png";
			document.getElementById("container").append(grass);
			grass.style.gridRow = n + 1;
			grass.style.gridColumn = i + 1;

			grass.classList.add("grass");

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

			if (i == 1 || i == 2) {
				if (n == 1 || n == 2) {
					// console.log(columns);
					let floorBlock = document.createElement("img");
					floorBlock.src = "./images/floor.png";
					floorBlock.classList.add("floor");
					document.getElementById("container").append(floorBlock);

					floorBlock.style =
						"width: 128px; height: 128px; object-fit: cover";
					floorBlock.style.gridRow = n + 1;
					floorBlock.style.gridColumn = i + 1;

					// put the roof on the floor,
					// get grid-row of lowest square then loop through each one again
				}
			}
		}
	}
}

// function placeEx(rows, columns) {
// 	for (let i = 0; i < columns; i++) {
// 		for (let n = 0; n < rows; n++) {}
// 	}
// }

let dirtRow = 0;
let keyPair = {};
let currentBar = 1;
// let dirtPositions = [];

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

// placeEx(
// 	window
// 		.getComputedStyle(document.getElementById("container"))
// 		.getPropertyValue("grid-template-rows")
// 		.split(" ").length,
// 	window
// 		.getComputedStyle(document.getElementById("container"))
// 		.getPropertyValue("grid-template-columns")
// 		.split(" ").length
// );

function plantTrees(rows, columns) {
	let storage = [];

	let imgs = Array.from(document.getElementsByTagName("img"));

	for (let i = 0; i < imgs.length; i++) {
		if (imgs[i].classList[0] == "grass") continue;
		// imgs.splice(i, 1)
		storage.push(
			window.getComputedStyle(imgs[i]).getPropertyValue("grid-area")
		);
	}

	for (let i = 0; i < 15; i++) {
		let randCol = Math.floor(getRandom(1, columns));
		let randRow = Math.floor(getRandom(1, rows));
		let springlock = false;

		for (let j = 0; j < storage.length; j++) {
			if (`${randRow} / ${randCol} / auto / auto` === storage[j]) {
				springlock = true;
				// console.log(storage[j], 7777, `${randRow} / ${randCol}`);
				break;
			}
			if (
				`${randRow} / ${randCol}` == "2 / 14" ||
				`${randRow} / ${randCol}` == "3 / 15" ||
				`${randRow} / ${randCol}` == "2 / 15" ||
				`${randRow} / ${randCol}` == "3 / 14"
			) {
				console.log(`${randRow} / ${randCol}`);
				springlock = true;
				break;
			}
			if (
				`${randRow} / ${randCol}` == "5 / 3" ||
				`${randRow} / ${randCol}` == "5 / 4" ||
				`${randRow} / ${randCol}` == "6 / 4" ||
				`${randRow} / ${randCol}` == "6 / 3"
			) {
				springlock = true;
				break;
			}
		}
		if (springlock) continue;

		let img = document.createElement("img");
		img.src = "./images/trees.png";
		document.getElementById("container").append(img);
		img.style = "width: 128px; top: -50px; position: absolute; z-index: 11";
		img.style.gridArea = randRow + "/" + randCol;
	}
}

plantTrees(
	window
		.getComputedStyle(document.getElementById("container"))
		.getPropertyValue("grid-template-rows")
		.split(" ").length,
	window
		.getComputedStyle(document.getElementById("container"))
		.getPropertyValue("grid-template-columns")
		.split(" ").length
);

document.addEventListener("keydown", function (event) {
	// let cursor = window.getComputedStyle(document.getElementById("cursor"));
	let id = document.getElementById("cursor");

	let row = parseInt(
		window
			.getComputedStyle(document.getElementById("cursor"))
			.getPropertyValue("grid-row-start")
	);
	let column = parseInt(
		window
			.getComputedStyle(document.getElementById("cursor"))
			.getPropertyValue("grid-column-start")
	);

	if (event.key == "w") {
		// console.log(event.key);
		id.style.gridRowStart = row -= 1;
		check(row, column);
	} else if (event.key == "s") {
		// console.log(event.key);
		id.style.gridRowStart = row += 1;
		check(row, column);
	} else if (event.key == "d") {
		// console.log(event.key);
		id.style.gridColumnStart = column += 1;
		check(row, column);
	} else if (event.key == "a") {
		// console.log(event.key);
		id.style.gridColumnStart = column -= 1;
		check(row, column);
	}

	if (event.code == "Space") {
		let storage = [];

		let imgs = Array.from(document.getElementsByTagName("img"));

		for (let i = 0; i < imgs.length; i++) {
			if (imgs[i].classList[0] == "grass") continue;
			if (imgs[i].id == "cursor") continue;
			// imgs.splice(i, 1)
			storage.push(
				window.getComputedStyle(imgs[i]).getPropertyValue("grid-area")
			);
		}
		let springlock = false;
		for (let j = 0; j < storage.length; j++) {
			if (`${row} / ${column} / auto / auto` === storage[j]) {
				springlock = true;
				break;
			}
		}
		if (!springlock) {
			if (currentBar == 2) return placeDirt(row, column);

			let fn = document.getElementById("slot" + currentBar).children[0]
				.dataset.imga;

			let element = document.createElement("img");
			element.src = "./images/" + fn + ".png";
			document.getElementById("container").append(element);
			element.style = "width: 128px; height: 128px; position: absolute;";
			element.style.gridArea = `${row} / ${column}`;
			if ((element.src = "./images/sprout.png"))
				planted(element, row, column);
		}
	}

	if (!isNaN(parseInt(event.key))) {
		let hotBar = document.querySelectorAll("#hotbar div");
		for (let i = 0; i < hotBar.length; i++) {
			document.querySelectorAll("#hotbar div")[i].style.backgroundColor =
				"#685262";
		}

		document.getElementById("slot" + event.key).style.backgroundColor =
			"#E9CB8F";
		if (event.key <= 7) currentBar = parseInt(event.key);
	}
});

function check(row, column) {
	let roofs = document.getElementsByClassName("roof");
	let inn = false;
	for (let i = 0; i < roofs.length; i++) {
		if (
			window.getComputedStyle(roofs[i]).getPropertyValue("grid-area") ==
			`${row} / ${column} / auto / auto`
		) {
			inn = true;
			document.querySelectorAll(".roof").forEach((element) => {
				element.style.opacity = "0.1";
			});
		}
	}
	if (!inn) {
		document.querySelectorAll(".roof").forEach((element) => {
			element.style.opacity = "1";
		});
	}
}

function planted(element, row, column) {
	setTimeout(() => {
		element.src = "./images/trees.png";
		element.style =
			" width: 128px; top: -50px; position: absolute; z-index: 11;";
		element.style.gridArea = `${row} / ${column}`;
	}, 1000);
}
