const selectDogs =  document.getElementById("select-dogs");
const imgContainerDogs =  document.getElementById("img-container-dogs");

let breedsDogs = [];

async function getimg(imageId) {
    console.log(imageId)
    const response = await axios.get(`https://api.thedogapi.com/v1/images/${imageId}`);
    const data =  response.data;
    displayImages(data);
    //console.log(data)
}

async function getBreeds() {
    const response = await axios.get("https://api.thedogapi.com/v1/breeds");
    const data = response.data;
      displayBreedName(data)
      //displayImages(data)
}

function displayBreedName(data) {
    for(const breed of data){
        const breedObj = {
            breedName: breed.name,
            imgId: breed.image.id,
        }
         breedsDogs.push(breedObj)
        
    }
    console.log(breedsDogs)

        selectDogs.innerHTML = `
        <select id="breed-selection">
            <option value="default">Choose a Dog</option>
            ${breedsDogs.map(breed => {
                //container.innerHTML = breed.imgId
                return `<option value="${breed.imgId}">${breed.breedName}</option>`  
            })}
                
           
        </select>   `
    
        
    
   
    const e = document.getElementById("breed-selection");
    e.addEventListener("change", () => {
        const value = e.options[e.selectedIndex].value;
        //console.log(value); 
        getimg(value);
    });
   
}

function displayImages(data){
    let nameDog;
    let weightDog;
    let heightDog;
    let originDog;
    let lifeSpanDog;
    let temperamentDog;
    let bredForDog;
    for(const details of data.breeds){
        nameDog = details.name
        weightDog = details.weight.metric
        heightDog = details.height.metric
        originDog = details.origin;
        lifeSpanDog = details.life_span;
        temperamentDog = details.temperament;
        bredForDog = details.bred_for;
    }
     imgContainerDogs.innerHTML = `
     <div class="column is-half is-offset-one-quarter">
     <div class="card">
         <div class="card-image">
           <figure class="image is-2by4">
             <img src="${data.url}" alt="${nameDog}">
           </figure>
         </div>
         <div class="card-content">
             <div class="media-content has-text-centered">
                 <p class="title is-4 bold">${nameDog}</p>
                 <p class="subtitle is-6">${originDog}</p>
             </div>
         </div>
         <div class="content has-text-left px-3">
         <p><strong>Temperament:</strong> ${temperamentDog} cm<p>
         <p><strong>Life Span:</strong> ${lifeSpanDog} cm<p>
         <p><strong>Bred For:</strong> ${bredForDog} cm<p>
            <p><strong>Height:</strong> ${heightDog} cm<p>
            <p><strong>Weight:</strong> ${weightDog} kg<p>
           </div>
           </div>
    `
}

getBreeds();