console.log("%c HI", "color: firebrick");
document.addEventListener("DOMContentLoaded", () => {
  var dogContainer = document.querySelector("#dog-image-container");
  var dogBreedList = document.querySelector("#dog-breeds");
  var dogList = document.querySelector("ul#dog-breeds");
  var breedSelector = document.querySelector("#breed-dropdown");
  var imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  var breedUrl = "https://dog.ceo/api/breeds/list/all";

  var getAllDogs = async (url) => {
    let response = await fetch(url);
    let allDogs = await response.json();
    return allDogs.message;
  };

  var getAllDogBreeds = async (url) => {
    try {
      let response = await fetch(url);
      let allDogBreeds = await response.json();
      return Object.keys(allDogBreeds.message);
    } catch (error) {
      console.error(error)
    }  
   
  };

  var displayAllDogs = async (url) => {
    await getAllDogs(url).then((dogs) => {
      dogs.forEach((dog) => {
        let img = document.createElement("img");
        img.src = dog;
        dogContainer.appendChild(img);
      });
    });
  };

  var displayAllDogBreeds = async (url) => {
    await getAllDogBreeds(url).then((breeds) => {
      breeds.forEach((breed) => {
        let li = document.createElement("li");
        li.addEventListener("click", highlightItem);
        li.textContent = breed;
        dogBreedList.appendChild(li);
      });
    });
  };

  var removeHighlight = (dogs) => {
    for (const dog of dogs) {
      if (dog.classList.contains("active")) {
        dog.classList.remove("active");
      }
    }
  };

  var highlightItem = (item) => {
    removeHighlight(item.target.parentNode.children);
    if (!item.target.classList.contains("active")) {
      item.target.classList.add("active");
    }
  };

  var filterByBreed = async (breed) => {
    // await getAllDogBreeds(imgUrl).then((breeds=>console.log(breeds)));
    var dogs = [...dogList.children];
    var filterLetter = breed.target.value.trim();
    console.log(filterLetter)
    var filteredDogs = dogs.filter((dog) =>
      dog.textContent.trim().startsWith(filterLetter)
    );

    dogList.innerHTML = "";

    for (const dog of filteredDogs) {
      dogList.appendChild(dog);
    }
  };

  displayAllDogBreeds(breedUrl);

  displayAllDogs(imgUrl);

  breedSelector.addEventListener("click", filterByBreed);
});
