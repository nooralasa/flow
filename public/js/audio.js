var curIdx = -1;
var numberOfFiles = 5;

var playButton = document.getElementById("playButton");
var audio = document.getElementById("audioSrc");
var isPlaying = false;

var firstStanza = document.getElementById("firstStanza");
var secondStanza = document.getElementById("secondStanza");
var thirdStanza = document.getElementById("thirdStanza");

// start with audio playing, but muted, because we want continuous playback
audio.src = getNextAudioSrc();
audio.muted = true;

// mute/unmute audio
playButton.addEventListener("click", function() {
	if (isPlaying)
	{
		audio.muted = true;
		isPlaying = false;
		playButton.className = "fas fa-volume-off";
	}
	else
	{
		audio.muted = false;
		isPlaying = true;
		playButton.className = "fas fa-volume-up";
	}
});

// get next audio file to play
audio.onended = function() {
	audio.src = getNextAudioSrc();
}

function getNextAudioSrc() {
	curIdx = (curIdx + 1) % numberOfFiles;
	scrollText()
	return "data/audio/" + curIdx + ".wav";
}

function scrollText() {
	var firstIndex = (curIdx-1) % numberOfFiles;
	var secondIndex = curIdx;
	var thirdIndex = (curIdx+1) % numberOfFiles;
	if (secondIndex == 0) {
		firstIndex = numberOfFiles-1
	}
	firstStanza.innerHTML = readTextFile("data/text/"+firstIndex+".txt");
	secondStanza.innerHTML = readTextFile("data/text/"+secondIndex+".txt");
	thirdStanza.innerHTML = readTextFile("data/text/"+thirdIndex+".txt");
}

function readTextFile(file)
{
	var rawFile = new XMLHttpRequest();
	text = ""
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                text = rawFile.responseText;
            }
        }
    }
	rawFile.send(null);
	return text
}