const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    const day = new Date();
    var hour = day.getHours();

    if(hour>=0 && hour<12){
        speak("GOOD MORNING, How may I help you?...")
    } 
    else if(hour>12 && hour<17){
        speak("GOOD AFTERNOON, How may I help you?...")
    }
    else{
        speak("GOOD EVENING, How may I help you?...")
    }

    
}

window.addEventListener('load', () => {
    speak('Launching TREVOR..');
    wishMe();

});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());

}
btn.addEventListener('click', () => {
    content.textContent = "Listening....";
    recognition.start();
});


function takeCommand(message){
    if (message.includes('hey') || message.includes('hello')){
        speak("Hello Sir! How may I assist you");
    }
    if (message.includes("open google")){
        window.open("https://google.com", "blank");
        speak("Opening Google!")
    }
    if (message.includes("open youtube")){
        window.open("https://youtube.com", "blank");
        speak("Opening Youtube!")
    }
    if (message.includes("open instagram")){
        window.open("https://instagram.com", "blank");
        speak("Opening Instagram!")
    }
    if (message.includes("open facebook")){
        window.open("https://facebook.com", "blank");
        speak("Opening Facebook!")
    }
    else if (message.includes('what') || message.includes('who') || message.includes('how') || message.includes('when')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    }
    else if (message.includes('wikipedia')) {
        const searchQuery = message.replace("wikipedia", "").trim();
        const wikipediaURL = `https://en.wikipedia.org/wiki/${encodeURIComponent(searchQuery)}`;
        
        window.open(wikipediaURL, "_blank");
    
        const finalText = "This is what I found on Wikipedia regarding " + searchQuery;
        speak(finalText);
    }
    else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric", second: "numeric"});
        const finalText = time;
        speak(finalText);
    }
    else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric" });
        const finalText = date;
        speak(finalText);
    }
    else if (message.includes('calculator')) {
        window.location.href = 'https://www.google.com/search?q=calculator';
        const finalText = "Opening Calculator";
        speak(finalText);
    }
    else{
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for" + message + "on google";
        speak(finalText);
    }
}
  