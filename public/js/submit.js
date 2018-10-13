var submitButton = document.getElementById("submitButton");
var audioFile = document.getElementById("audioFile");
var originalText = document.getElementById("originalText");
var translatedText = document.getElementById("translatedText");

submitButton.addEventListener("click", function() {
	var fileNum = getNextFileNumber();
	download(audioFile.files[0], "audio/" + fileNum + ".wav");
	download(originalText.value, "text/" + fileNum + ".txt");
	download(translatedText.value, "translated/" + fileNum + ".txt");
});

function getNextFileNumber() {
	return 6; // @TODO
}

function download(data, filename) {
    var file = new Blob([data]);
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"), url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
