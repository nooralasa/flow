console.log("Hello Hello");

var uploadForm = document.getElementById("uploadForm");
var formData = new FormData(uploadForm);
var uploadInput = document.createElement('input');
var uploadInput = document.createElement('input');
uploadInput.type='file';
// uploadInput.name='audio';
uploadInput.class="form-control-file";
formData.append('audio', uploadInput);