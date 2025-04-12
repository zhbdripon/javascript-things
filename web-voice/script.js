const recordButton = document.getElementById("record");
const promptTextParagraph = document.getElementById("recorded-text");

recordButton.addEventListener("click", function () {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onstart = function () {
    recordButton.innerHTML = "Record Starting...";
    setTimeout(() => {
      recordButton.innerHTML = "Recording...";
    }, 1000);

    recordButton.disabled = true;
    console.log("Voice recognition started. Speak into the microphone.");
  };

  recognition.onresult = function (event) {
    recordButton.innerHTML = "Record";
    recordButton.disabled = false;
    promptTextParagraph.innerHTML = event.results[0][0].transcript;
    console.log("Voice recognition result received:", event);
  };

  recognition.start();

  showRecordingAnimation();
});

const showRecordingAnimation = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    source.connect(analyser);

    function getVolume() {
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      return sum / dataArray.length;
    }

    function animate() {
      const volume = getVolume();
      // Update animation based on volume
      const scale = 1 + volume / 100;

      console.log("scale:", scale);

      if (recordButton.disabled) {
        requestAnimationFrame(animate);
      }
    }

    animate();
  });
};
