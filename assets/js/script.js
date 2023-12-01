const wrapper = document.querySelector('.wrapper'),
searchInput = wrapper.querySelector('input'),
infoText = wrapper.querySelector('.info-text'),
synonyms = wrapper.querySelector('.synonyms .list'),
soundIcon = wrapper.querySelector('.word img'),
removeIcon = wrapper.querySelector('.search .close-icon');
let audio;


const search = word => {

    searchInput.value = word
    fetchApi(word)
}

const data = (result, word) => {
    if(result.title) {
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please try to search another word!`
    } else {
        wrapper.classList.add('active')
        let definitions = result[0].meanings[0].definitions[0],
        phonetics = `${result[0].meanings[0].partOfSpeech}${result[0].phonetics[0] !== undefined && result[0].phonetics[0].text}`;

        document.querySelector('.word p').innerText = result[0].word;
        document.querySelector('.word span').innerText = phonetics;
        document.querySelector('.meaning span').innerText = definitions.definition;
  
        if(result[0].phonetics[0] == undefined || result[0].phonetics[0].audio == '') {
            soundIcon.style.display = 'none'
        } else {
            console.log(searchInput)
            soundIcon.style.display = 'block'
            audio = new Audio(result[0].phonetics[0].audio);
        }

        // if(result[0].phonetics[0] == undefined || result[0].phonetics[0].audio == '') {
        //     soundIcon.style.display = 'none'
        // } else {
        //     console.log(searchInput)
        //     searchInput.style.display = 'block'
        //     audio = new Audio(result[0].phonetics[0].audio);
        // }
        console.log(definitions.example)
        console.log(definitions.synonyms)
  
        if(definitions.example == undefined) {
            document.querySelector('.example').style.display = 'none';
        } else {
            document.querySelector('.example').style.display = 'block';
            document.querySelector('.example span').innerText = definitions.example;
        }

        if(definitions.synonyms[0] == undefined) {
            synonyms.parentElement.parentElement.style.display = 'none';
        } else {
         
            synonyms.parentElement.parentElement.style.display = 'block';
            synonyms.innerHTML = '';
            const synonymsWords = definitions.synonyms;
            synonymsWords.forEach(word => {
                let tag = `<span onClick=search('${word}')>${word}</span>`
                synonyms.insertAdjacentHTML('beforeend', tag);
            })
        }
        
    }
}

const fetchApi = word => {
    infoText.style.color = '#000'
    infoText.innerHTML = `Searching the meaning of the word <span>"${word}"</span>`
    wrapper.classList.remove('active');
    const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(API_URL).then(res => res.json()).then(result => {
        data(result, word)
    })
    .catch(err => {
        console.log(err)
        wrapper.style.height = '0';
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please try to search another word!`
    })
}

searchInput.addEventListener('keyup', e => {
    if(e.key === 'Enter' && e.target.value) {
        fetchApi(e.target.value)
    }
})

soundIcon.addEventListener('click', () => {
    audio.play()
})

removeIcon.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
    infoText.innerHTML = `Type a word and press enter to get meaning, example, pronunciation, and synonyms of that typed word.`
    wrapper.classList.remove('active');
})