let showwordDefinition = document.getElementById('showDefinition');
let definitions = document.createElement("div");
let synonyms = document.createElement("div");
let searchmyword = document.getElementById("searchbar");
let showverb = document.createElement("div");
let showsource = document.createElement("div");


function handle(){ 
       let myword = document.getElementById("searchbar").value; 
       url = `https://api.dictionaryapi.dev/api/v2/entries/en/${myword}`;
       getapi(url);
};

const audioCtx = new AudioContext();
let buffer = null;

function fetAudiofromApi(url) {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.responseType = "arraybuffer";
    request.onload = function() {
      let undecodedAudio = request.response;
      audioCtx.decodeAudioData(undecodedAudio, (data) => buffer = data);
    };
    request.send();
    play();
  }

function play() {
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start();
  };

async function getapi(url) {
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();

    if (response) {
        console.log(data);
        test(data);
    }
    
}

function manyData(data){
    if(data.length >= 1 ){
        for (let i = 0; i < data.length; i++) {
            showsource.innerHTML += `<li>${data[i].definition}</li>`;
        }
        return showsource;
    }
}

async function test(data){
    if(data.length >= 1){
        console.log(data.length);
        for(let i = 0; i < data.length; i++ ){
    let mymeanings = data[i].meanings;
    console.log(mymeanings);
    if(mymeanings.length >= 1){
        for (let i = 0; i < mymeanings.length; i++){
            console.log();
            let mydefinition = mymeanings[i].definitions;
            let mysynonyms = mymeanings[i].synonyms;
            let myshowverb = mymeanings[i].definitions;
            if(mydefinition.length >= 1 && mymeanings[i].partOfSpeech == "noun"){
                definitions.innerHTML = "";
                for (let i = 0; i < mydefinition.length; i++){
                    definitions.innerHTML += `<li>${mydefinition[i].definition}</li>`;
                }
            }if(myshowverb.length >= 1 && mymeanings[i].partOfSpeech == "verb"){
                showverb.innerHTML = "";
                for (let i = 0; i < myshowverb.length; i++){
                    showverb.innerHTML += `<li>${myshowverb[i].definition}</li>`;
                }
            }
            else{
                
            }
            if(mysynonyms.length >= 1){
                synonyms.innerHTML = "";
                for (let i = 0; i < mysynonyms.length; i++){
                    synonyms.innerHTML += `${mysynonyms[i]} `;
                }
            }else{
                mysynonyms.innerHTML = "";
            }
            
            
        }
        
        
    }
    showwordDefinition.innerHTML += `
    <div id="headPresent">
        <div id="titlePresent">${data[i].word}</div>
        <div id="playPresent"><img onclick=fetAudiofromApi("${data[i].phonetics[1].audio}") src="./assets/images/icon-play.svg"></div>
    </div>
    <div id="nounDefinition">
        <h2><span>noun</span></h2>
        <h3>Meanning</h3>
        ${definitions.innerHTML}
        <p>Synonyms : ${synonyms.innerHTML}
    </div>
    <div id="verbDefinition">
      <h2>verb</h2>
      ${showverb.innerHTML}
    </div>
    <hr>
    <p>Source : <a href=""></a></p>`;
    console.log(showwordDefinition);
}
}
}

async function show(data) {
    let myverb = data[0].meanings[1].definitions;
    if(myverb.length >= 1){
        for (let i = 0; i < myverb.length; i++) {
            console.log(myverb[i].definition);
            showverb.innerHTML += `<li>${myverb[i].definition}</li>`;
        }
    }else{
        showverb.innerHTML = "";
    }
    
    if(data.length >= 1 ){
	    for (let r of data) {
            console.log(r);
            test(r);
	        showwordDefinition.innerHTML += `
	        <div id="headPresent">
	            <div id="titlePresent">${r.word}</div>
	            <div id="playPresent"><img onclick=fetAudiofromApi("${data[i].phonetics[1].audio}") src="./assets/images/icon-play.svg"></div>
	        </div>
	        <div id="nounDefinition">
	            <h2><span>noun</span></h2>
	            <h3>Meanning</h3>
	            ${definitions.innerHTML}
	            <p>Synonyms : ${synonyms.innerHTML}
	        </div>
	        <div id="verbDefinition">
	          <h2>verb</h2>
	          ${showverb.innerHTML}
	        </div>
	        <hr>
	        <p>Source : <a href="${manyData(r.sourceUrls)}">${r.sourceUrls}</a></p>`;
	        console.log(showwordDefinition);
	    }
    }

}


