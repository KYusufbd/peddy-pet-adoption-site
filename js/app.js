// Function for fetching API: It returns a promise object
const getData = async (api) => {
  const data = await fetch(api);
  const jsonData = data.json();
  return jsonData;
};

// List all categories
getData("https://openapi.programming-hero.com/api/peddy/categories").then(
  (res) => {
    const categorySection = document.getElementById("categories");
    res.categories.map((e) => {
      const catElements = categorySection.innerHTML;
      categorySection.innerHTML =
        catElements +
        `
        <button class="btn btn-outline btn-accent hover:rounded-full">
            <img src="${e.category_icon}" class="h-full" />
            ${e.category}
        </button>
        `;
    });
  }
);

// Display all available pets / pets of a perticular category.
function displayPets(source = "pets") {
  getData(`https://openapi.programming-hero.com/api/peddy/${source}`).then(
    (res) => {
      let data;
      res.pets ? (data = res.pets) : (data = res.data);
      data.map((e) => {
        const petDisplay = document.getElementById("pet-display");
        const prevCards = petDisplay.innerHTML;
        petDisplay.innerHTML =
          prevCards +
          `
            <div class="flex flex-col p-5 gap-3 shadow-lg rounded-lg">
              <div class="rounded-lg w-full h-40 overflow-hidden">
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
                  <p>Price : ${e.price}$</p>
                </div>
              </div>
            </div>
        `;
      });
    }
  );
}

// displayPets("category/cat");
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
*/
