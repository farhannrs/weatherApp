
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const paragraph1 = document.querySelector('#message-1')
const paragraph2 = document.querySelector('#message-2')

paragraph1.textContent = 'Loading.....'
paragraph2.textContent = ''

weatherForm.addEventListener('submit' , (e) => {
     e.preventDefault()
     const location = search.value
    console.log(location)

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
       if(data.error){
           paragraph1.textContent = data.error
           paragraph2.textContent = ''
       } else {
           paragraph1.textContent = data.location
           paragraph2.textContent = data.forcast
       }
       
        
    })
})

})