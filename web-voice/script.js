import languages from "./languages.js";

const recordButton = document.getElementById("record");
const promptTextParagraph = document.getElementById("recorded-text");
const select = document.getElementById("lang");
const recordAnimation = document.getElementById("circle");
recordAnimation.style.display = "none";
let isRecording = false;


// implementing the language selection dropdown
languages.forEach((language) => {
  const option = document.createElement("option");
  option.value = language.code;
  option.textContent = `${language.name} (${language.code})`;

  if (language.code === "en-US") {
    option.selected = true;
  }
  select.appendChild(option);
});

recordButton.addEventListener("click", function () {
  if (isRecording) {
    return;
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = select.value;

  recognition.onstart = function () {
    isRecording = true;
    recordButton.innerHTML = "Record Starting...";
    setTimeout(() => {
      recordButton.innerHTML = "Recording...";
    }, 1000);

    select.disabled = true;
    console.log("Voice recognition started. Speak into the microphone.");
  };

  recognition.onresult = function (event) {
    recordButton.innerHTML = "Record";
    isRecording = false;
    select.disabled = false;
    promptTextParagraph.innerHTML = event.results[0][0].transcript;
    textToSpeech(event.results[0][0].transcript, select.value);
    console.log("Voice recognition result received:", event);
  };

  recognition.start();

  showRecordingAnimation();
});

const textToSpeech = (text, lang) => {
    // https://www.youtube.com/watch?v=JFfCDvKiJqU&ab_channel=ColbyFayock
    loadVoices().then((voices) => {
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      speech.lang = lang;
      speech.voice = voices.find((voice) => voice.lang === lang);
      console.log(speech.voice);
      speechSynthesis.speak(speech);
      console.log("Voices loaded:", voices, lang);
    // Now you can use them safely
  });
//   speech.rate = 1;
//   speech.pitch = 1;
//   speech.volume = 1;
};

function loadVoices() {
  return new Promise((resolve) => {
    let voices = speechSynthesis.getVoices();

    if (voices.length) {
      resolve(voices);
    } else {
      // Listen for voiceschanged event
      speechSynthesis.onvoiceschanged = () => {
        voices = speechSynthesis.getVoices();
        resolve(voices);
      };
    }
  });
}

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
      const scale = 1 + (volume * 3) / 100;
      recordAnimation.style.display = "block";
      recordAnimation.style.transform = `scale(${scale})`;
      if (isRecording) {
        requestAnimationFrame(animate);
      } else {
        recordAnimation.style.display = "none";
        source.disconnect();
        analyser.disconnect();
        audioContext.close();
        stream.getTracks().forEach((track) => track.stop());
      }
    }

    animate();
  });
};
