// Function for fetching API: It returns a promise object
const getData = async (api) => {
  const data = await fetch(api);
  const jsonData = data.json();
  return jsonData;
};

// Listing all category buttons
getData("https://openapi.programming-hero.com/api/peddy/categories").then(
  (res) => {
    const categorySection = document.getElementById("categories");
    res.categories.map((e) => {
      const catElements = categorySection.innerHTML;

      categorySection.innerHTML =
        catElements + `
        <button onclick="filterByCategory('${e.category.toLowerCase()}', ${e.id})" id=${'category-btn-' + e.id} class="btn btn-outline btn-accent filter-btn">
            <img src="${e.category_icon}" class="h-full" />
            ${e.category}
        </button>
        `;
    });
  }
);


// Code for activating sort by price button:
let sortPetsByPrice = 0;
function sortByPrice() {
  sortPetsByPrice === 0 ? sortPetsByPrice = 1 : sortPetsByPrice = 0;
  document.getElementById('pet-display').innerHTML = "";
  displayPets();
  const filterBtns = document.getElementsByClassName('filter-btn');
  for(const btn in filterBtns) {
    const fbtn = filterBtns[btn];
    fbtn.classList.remove('rounded-full');
  };
};


// Display all available pets / pets of a perticular category.
function displayPets(source = 'pets') {
  const loader = document.getElementById('loading');
  loader.innerHTML = `
    <div class="w-max mx-auto my-32">
      <span class="loading loading-bars loading-lg"></span>
    </div>
  `
  // Code for showing loader 2 seconds before loading:
  setTimeout(() => {
    getData(`https://openapi.programming-hero.com/api/peddy/${source}`).then(
      (res) => {
        loader.innerHTML = '';
        let data;
        res.pets ? (data = res.pets) : (data = res.data);

        if(sortPetsByPrice) {
          data = data.sort((a, b) => b.price - a.price);
        };

        // Code for displaying error message:
        const notAvailabe = document.getElementById('pet-display-error');
        
        if (!data.length) {
          notAvailabe.classList.remove('hidden');
          notAvailabe.classList.add('flex');
        }
        else {
          notAvailabe.classList.remove('flex');
          notAvailabe.classList.add('hidden');
        };

        // Code for displaying available pet list:
        const petDisplay = document.getElementById("pet-display");
        data.map((e) => {
          const prevCards = petDisplay.innerHTML;
          petDisplay.innerHTML =
            prevCards +
            `
              <div class="pet-card">
                <div class="pet-image">
                  <img
                      src="${e.image}"
                      alt=""
                      class="h-full min-w-full rounded-lg"
                  />
                </div>
                <div class="flex flex-col gap-3 pet-desc">
                  <h6 class="font-bold">${e.pet_name}</h6>
                  <div class="flex flex-row gap-1">
                    <span>${breedSvg}</span>
                    <p>Breed: ${e.breed ? e.breed : "Not available"}</p>
                  </div>
                  <div class="flex flex-row gap-1">
                  <span>${birthSvg}</span>
                    <p>Birth: ${e.date_of_birth ? e.date_of_birth : "Not available"}</p>
                  </div>
                  <div class="flex flex-row gap-1">
                  <span>${genderSvg}</span>
                    <p>Gender: ${e.gender ? e.gender : "Not available"}</p>
                  </div>
                  <div class="flex flex-row gap-1">
                    <span>${priceSvg}</span>
                    <p>Price : ${e.price ? e.price : "Not available"}$</p>
                  </div>
                </div>
                <div class="w-full flex flex-row flex-wrap justify-between card-btns">
                  <button class="btn btn-accent" onclick="addToFavorite('${e.image}')">${likeSvg}</button>
                  <button class="btn btn-accent">Adopt</button>
                  <button class="btn btn-accent" onclick="showDetails('${e.petId}')">Details</button>
                </div>
              </div>
          `;
        });
      }
    )}, 2000
  );
};


// Function for styling active button:
function filterByCategory(categ, categId) {
    const petDisplay = document.getElementById('pet-display');
    petDisplay.innerHTML = '';
    displayPets(`category/${categ}`);
    
    const filterBtns = document.querySelectorAll(".filter-btn");
    const categBtn = document.getElementById(`category-btn-${categId}`);

    filterBtns.forEach(e => {
      e.classList.remove('rounded-full');
    });
    categBtn.classList.add('rounded-full');
};


// Add to favorite function:
function addToFavorite(img) {
  const favoriteSection = document.getElementById('favorites');
  const prev = favoriteSection.innerHTML;
    favoriteSection.innerHTML = prev + `
      <div class="fav-img">
        <img src="${img}" class="h-full min-w-full" />
      </div>
    `
};



// Function for showing details:
function showDetails(id) {
  getData(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
  .then(res => {
    const detailsModal = document.getElementById('pet-details');
    
    const pet = res.petData;
    const nA = "Not available"

    detailsModal.innerHTML = `
      <div class="w-full rounded-lg overflow-hidden">
        <img class="h-full min-w-full rounded-lg" src="${pet.image ? pet.image : nA}" alt="pet-image">
      </div>
      <h5 class="font-bold">${pet.pet_name}</h5>
      <div class="w-full grid grid-cols-2 grid-flow-row">
      <div class="flex flex-row gap-2">
        ${breedSvg}
        <p>Breed: ${pet.breed ? pet.breed : nA}</p>
      </div>
      <div class="flex flex-row gap-2">
        ${birthSvg}
        <p>Birth: ${pet.date_of_birth ? pet.date_of_birth : nA}</p>
      </div>
      <div class="flex flex-row gap-2">
        ${genderSvg}
        <p>Gender: ${pet.gender ? pet.gender : nA}</p>
      </div>
      <div class="flex flex-row gap-2">
        ${priceSvg}
        <p>Price : ${pet.price ? pet.price : nA}</p>
      </div>
      <div class="flex flex-row gap-2">
        ${vaccineSvg}
        <p>Vaccinated status: ${pet.vaccinated_status ? pet.vaccinated_status : nA}</p>
      </div>
      </div>
      <hr>
      <div class="w-full">
        <p class="font-bold">Details Information</p>
        <P>${pet.pet_details ? pet.pet_details : nA}</P>
      </div>
      <div class="modal-action w-full">
        <form method="dialog" class="w-full">
          <button class="btn w-full">Cancel</button>
        </form>
      </div>
    `;

    my_modal_5.showModal();
  });
}


// Function call for primary display of all pets
window.onload = () => displayPets();
