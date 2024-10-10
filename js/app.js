// Function for fetching API: It returns a promise object
const getData = async (api) => {
  const data = await fetch(api);
  const jsonData = data.json();
  return jsonData;
};

// List of all category buttons
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
  getData(`https://openapi.programming-hero.com/api/peddy/${source}`).then(
    (res) => {
      let data;
      res.pets ? (data = res.pets) : (data = res.data);

      if(sortPetsByPrice) {
        data = data.sort((a, b) => b.price - a.price);
      };

      data.map((e) => {
        const petDisplay = document.getElementById("pet-display");
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
              <div class="flex flex-col gap-3">
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
            </div>
        `;
      });
    }
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

// Function call for primary display of all pets
displayPets();


/* 
    Pet object model:
{
    "petId": 1,
    "breed": "Golden Retriever",
    "category": "Dog",
    "date_of_birth": "2023-01-15",
    "price": 1200,
    "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
    "gender": "Male",
    "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
    "vaccinated_status": "Fully",
    "pet_name": "Sunny"
}

    Category object model:
{
    "status": true,
    "message": "successfully fetched all the categories data",
    "categories": [
        {
            "id": 1,
            "category": "Cat",
            "category_icon": "https://i.ibb.co.com/N7dM2K1/cat.png"
        },
        {
            "id": 2,
            "category": "Dog",
            "category_icon": "https://i.ibb.co.com/c8Yp1y7/dog.png"
        },
        {
            "id": 3,
            "category": "Rabbit",
            "category_icon": "https://i.ibb.co.com/3hftmLC/rabbit.png"
        },
        {
            "id": 4,
            "category": "Bird",
            "category_icon": "https://i.ibb.co.com/6HHZwfq/bird.png"
        }
    ]
}
*/
