const wrapper = document.querySelector('.wrapper'),
searchInput = wrapper.querySelector('input'),
infoText = wrapper.querySelector('.info-text');

const fetchApi = word => {
    infoText.style.color = '#000'
    infoText.innerHTML = `Searching the meaning of the word <span>"${word}"</span>`
}

searchInput.addEventListener('keyup', e => {
    if(e.key === 'Enter' && e.target.value) {
        fetchApi(e.target.value)
    }
})