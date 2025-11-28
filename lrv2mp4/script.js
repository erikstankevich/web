const button = document.getElementById("foo");

const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.style.display = "none";

document.body.appendChild(fileInput);

button.addEventListener("click", () => {
	fileInput.click();
});


fileInput.addEventListener("change", () => {
	const file = fileInput.files[0];
	const reader = new FileReader();
	reader.onload = function(e) {
		const content = e.target.result;

		const newBlob = new Blob([content], { type: file.type });

		const a = document.createElement("a");
		a.href = URL.createObjectURL(newBlob);

		let newName = file.name;
		if (file.name.toLowerCase().endsWith(".lrv")){
			newName = file.name.slice(0, -4) + ".mp4";
		} else {
			return;
		}






		a.download = newName;

		a.click();

		URL.revokeObjectURL(a.href);
	};

	reader.readAsArrayBuffer(file);
});


;
