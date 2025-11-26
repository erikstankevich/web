const button = document.getElementById("foo");

const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.style.display = "none";

document.body.appendChild(fileInput);

button.addEventListener("click", () => {
	fileInput.click();
});



