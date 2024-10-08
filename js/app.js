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
    console.log(res); // Just for testing perpose
    res.categories.map((e) => {
        // const button = categorySection.appendChild(document.createElement('button'));
        // button.innerHTML = `
        //     <img src="${e.category_icon}" />
        //     ${e.category}
        //     `;
        // button.classList.add('btn', 'btn-outline')
    
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
