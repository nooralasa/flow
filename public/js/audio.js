var playButton = document.getElementById("playButton");
var audio = document.getElementById("audioSrc");
var isPlaying = false;

var audioSrcs = ["1.wav", "2.wav", "3.wav", "4.wav", "5.wav"]
var curIdx = -1;

// start with audio playing, but muted, because we want continuous playback
audio.src = getNextAudioSrc();
audio.muted = true;

// mute/unmute audio
playButton.addEventListener("click", function() {
	if (isPlaying)
	{
		audio.muted = true;
		isPlaying = false;
		playButton.className = "fas fa-volume-up";
	}
	else
	{
		audio.muted = false;
		isPlaying = true;
		playButton.className = "fas fa-volume-off";
	}
});

// get next audio file to play
audio.onended = function() {
	audio.src = getNextAudioSrc();
}

function getNextAudioSrc() {
	curIdx = (curIdx + 1) % audioSrcs.length;
	return "audio/" + audioSrcs[curIdx];
}