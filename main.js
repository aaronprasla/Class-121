function preload() {
}

function setup() {
	canvas = createCanvas(300, 300);
	canvas.center();
	video = createCapture(VIDEO);
	video.hide();
	classifier = ml5.imageClassifier('MobileNet', modelLoaded)
}

function draw() {
	image(video, 0, 0, 300, 300);
	classifier.classify(video, gotResults);
}

var previous_result = '';

function modelLoaded() {
	console.log('model loaded');
}

function gotResults(error, results) {
	if(error){
		console.error(error);
	}else{

		if((results[0].confidence > 0.5) && (previous_result != results[0].label)){
			console.log(results);
			previous_result = results[0].label;

			synth = window.speechSynthesis;
			speech = 'Object detected is ' + results[0].label;
			utterThis = new SpeechSynthesisUtterance(speech);
			synth.speak(utterThis);

			document.getElementById('ron').innerHTML = results[0].label;
			document.getElementById('roan').innerHTML = (results[0].confidence * 100).toFixed(2) + '%';
		}
	}
}