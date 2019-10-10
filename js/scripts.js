//-----------------------------------------------------------
//  DOM ELEMENTS FOR DOM MANIPULATION
//-----------------------------------------------------------

const gallery = document.querySelector("#gallery");

//-----------------------------------------------------------
//  FETCH FUNCTIONS
//-----------------------------------------------------------

//fetchData(url) takes a url as a parameter, and return the data received in json format using the fetch API.
//If an error occurs, it return an error message in the console.
function fetchData(url) {
  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .catch(error => console.log("Looks like there was a problem!", error));
}

// the fetchData function is passed the a url to 'https://randomuser.me/api/'. The request is modified
// to ensure the data received is for 12 employees only, and only from English speaking countries.
// A single promise object is created using the Promise.all object, then all the helper functions,
// user interaction function, and event listeners functions are applied on the data received.
Promise.all([
  fetchData(
    "https://randomuser.me/api/?inc=picture,name,email,location,phone,dob&nat=us,au,ca,nz&results=12"
  )
]).then(data => {
  // The data object received from 'https://randomuser.me/api/' is in json format with key 'results' which is stored in an array with 1 element.
  const employeeList = data[0].results;
  // generateCard(data) renders the employee cards in the "class = gallery div" with the employeeList data from the API response.
  generateCard(employeeList);
  // generateModal(data) renders the employee modals after the "class = gallery div" with the employeeList data from the API response. It also hides the modals.
  generateModal(employeeList);
  // showModal() displays the employee modals for the employee card which is clicked.
  showModal();
  // closeModal() hides the employee modals when the [X] button on the top right corner of the modal is clicked.
  closeModal();
  //modalToggle() moves to the next modal when the 'next' button is clicked, and to the previous modal when the 'prev' button is clicked.
  modalToggle();
  //generateSearchContainer() renders the search input bar and the submit button dynamically.
  generateSearchContainer();
  //searchFunctionality() hides the employee cards for "unmatched" search query from the search input bar.
  searchFunctionality();
});

//-----------------------------------------------------------
//  HELPER FUNCTIONS
//-----------------------------------------------------------

// checkStatus(response) ensures that, if the API response is not received - we get a message displayed in the console; i.e. failed requests do not
// go unnoticed silently.
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

// insertAfter(newElement, referenceElement inserts newElement after the referenceElement.
function insertAfter(newElement, referenceElement) {
  referenceElement.parentNode.insertBefore(
    newElement,
    referenceElement.nextSibling
  );
}

// generateCard(data) renders the employee cards in the "class = gallery div" with the employeeList data from the API response.
function generateCard(data) {
  //To store the userCard details once the data from the API response is processed.
  let newUserCard = "";
  //data.forEach() will generate a string literal containing the html for each employee cards from the API response data.
  // data should be in array format, hence we Promise.all the response data from 'https://randomuser.me/api/'.
  data.forEach(card => {
    return (newUserCard += `
        <div class='card'>
            <div class='card-img-container'>
                <img class='card-img' src='${card.picture.large}' alt="${card.name.first} ${card.name.last}'s Profile Picture">
            </div>
            <div class='card-info-container'>
                <h3 id='name' class='card-name cap'>${card.name.first} ${card.name.last}</h3>
                <p class='card-text'>${card.email}</p>
                <p class='card-text cap'>${card.location.city}, ${card.location.state}, ${card.location.country}</p>
            </div>
        </div> 
        `);
  });

  //The innerHTML for the gallery div is set to the sting stored in newUserCard.
  gallery.innerHTML = newUserCard;
}

// generateModal(data) renders the employee modals after the "class = gallery div" with the employeeList data from the API response. It also hides the modals.
function generateModal(data) {
  //Modal create will be a div element with "class = modal-gallery", in which all the generated employee modals will be rendered.
  const modal = document.createElement("div");
  modal.className = "modal-gallery";
  //To store the userModal details once the data from the API response is processed.
  let newUserModal = "";
  //data.forEach() will generate a string literal containing the html for each employee modals from the API response data.
  // data should be in array format, hence we Promise.all the response data from 'https://randomuser.me/api/'.
  data.forEach(modal => {
    let DOB = modal.dob.date; //The date of birth from the API response data is stored in DOB using 'dot' notation.
    let dt = DOB.slice(0, 10); //As the data received is in datetime format, we need to slice just the date from DOB.
    let formattedDOB = dt.replace(/^(\d{4})-(\d{2})-(\d{2})/, "$2/$3/$1"); // we use regex to convert the "dt" date in mm/dd/yyyy format, and store it in formattedDOB.

    newUserModal += `
            <div class = "modal-container" style = "visibility: hidden;">    
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${modal.picture.large}" alt="${modal.name.first} ${modal.name.last}'s Profile Picture">
                        <h3 id="name" class="modal-name cap">${modal.name.first} ${modal.name.last}</h3>
                        <p class="modal-text">${modal.email}</p>
                        <p class="modal-text cap">${modal.location.city}</p>
                        <hr>
                        <p class="modal-text">${modal.phone}</p>
                        <p class="modal-text">${modal.location.street.number} ${modal.location.street.name}., ${modal.location.city}, ${modal.location.state}, ${modal.location.country}, ${modal.location.postcode}</p>
                        <p class="modal-text">Birthday: ${formattedDOB}</p>
                    </div>
                </div>
                <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
            </div>
        `;
  });

  //The innerHTML for the modal-gallery div is set to the sting stored in newUserModal.
  modal.innerHTML = newUserModal;
  //modal is rendered after gallery div using the insertAfter function.
  insertAfter(modal, gallery);
}

//generateSearchContainer() renders the search input bar and the submit button dynamically.
function generateSearchContainer() {
  const searchContainer = document.querySelector(".search-container");
  const searchForm = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
    `;
  searchContainer.innerHTML = searchForm;
}

//-----------------------------------------------------------
//  EVENT LISTENERS FUNCTIONS
//-----------------------------------------------------------

// showModal() displays the employee modals for the employee card which is clicked.
function showModal() {
  //DOM elements stored in const to help in DOM manipulation.
  const employeeCards = document.querySelectorAll(".card");
  const employeeModals = document.querySelectorAll(".modal");
  const modalContainer = document.querySelectorAll(".modal-container");
  // employeeModalNames will stores the employee names of all the employee Modals.
  const employeeModalNames = [];

  //Looping through all the 'employeeModals' to store the employee names in 'employeeModalNames' array.
  for (let i = 0; i < employeeModals.length; i++) {
    employeeModalNames.push(employeeModals[i].querySelector("h3").textContent);
  }

  // changeVisibility(click) changes the 'visibility' of the modal from hidden to visible.
  function changeVisibility(click) {
    //'employeeCardName' stores the name of the employee card clicked.
    employeeCardName = click.querySelector(".card-name").textContent;
    //'modalIndex' stores the index of the 'employeeCardName' in the 'employeeModalNames' array. i.e it find the index of the modal to be made visible.
    const modalIndex = employeeModalNames.indexOf(employeeCardName);
    //Changing the visibility of the employee modal, and modalContainer i.e the background; at index =  'modalIndex' to visible.
    modalContainer[modalIndex].style.visibility = "visible";
    employeeModals[modalIndex].style.visibility = "visible";
  }

  //Looping through all employeeCards to add 'click' event listeners on them to hear for 'clicks'.
  for (let i = 0; i < employeeCards.length; i++) {
    employeeCards[i].addEventListener("click", event => {
      //clickedCard  will store the div with 'class = card', but it has two edge cases.
      //1.) When space between the 'class = card' div and its children is clicked. It will store the "class = gallery" div.
      //2.) when a grandchild of 'class = card' div is clicked. It will store a child of 'class = card' div, which will be undefined.
      let clickedCard = event.target.parentNode;

      // employeeCardName will be used the check the how many employeeCardNames is clickCard finding. This is to check for the edge cases.
      let employeeCardName = clickedCard.querySelectorAll(".card-name");
      if (employeeCardName.length === 12) {
        //For edge case 1.) The gallery has 12 cards, hence 'employeeCardName.length' === 12.
        clickedCard = event.target; //clickedCard is set to just event.target, as it will be equal to "class = 'card'" div.
        changeVisibility(clickedCard); //To make the modal for the clickCard visible.
      } else if (employeeCardName.length === 0) {
        //For edge case 2.) The parentNode of the clickedCard has no cards, hence 'employeeCardName.length' === 0.
        clickedCard = event.target.parentNode.parentNode; //clickedCard is set to the grandparent element of event.target, as it will be equal to "class = 'card'" div.
        changeVisibility(clickedCard); //To make the modal for the clickCard visible.
      } else {
        clickedCard = event.target.parentNode; //If clickedCard has stored the div with 'class = card'.
        changeVisibility(clickedCard); //To make the modal for the clickCard visible.
      }
    });
  }
}

// closeModal() hides the employee modals when the [X] button on the top right corner of the modal is clicked.
function closeModal() {
  //'modalCloseButton' stores all the [X] button on the top right corner of the all the employee modals.
  const modalCloseButton = document.querySelectorAll(".modal-close-btn");

  //Looping through all modalCloseButton to add 'click' event listeners on them to hear for 'clicks'.
  for (let i = 0; i < modalCloseButton.length; i++) {
    modalCloseButton[i].addEventListener("click", event => {
      //'employeeModal' stores the 'class = modal' div of the clicked button.
      const employeeModal = event.target.parentNode.parentNode;
      employeeModal.style.visibility = "hidden"; // hiding the clicked 'employeeModal'.
      //'modalContainer' stores the 'class = modal-container' div of the clicked button.
      const modalContainer = event.target.parentNode.parentNode.parentNode;
      modalContainer.style.visibility = "hidden"; // hiding the clicked 'modalContainer'.
    });
  }
}

//modalToggle() moves to the next modal when the 'next' button is clicked, and to the previous modal when the 'prev' button is clicked.
function modalToggle() {
  //'prevButtons' stores all the [PREV] button on the bottom left corner of the all the employee modals.
  const prevButtons = document.querySelectorAll(".modal-prev");
  //'prevButtons' stores all the [NEXT] button on the bottom right corner of the all the employee modals.
  const nextButtons = document.querySelectorAll(".modal-next");
  //'modals' stores all the employee modals.
  const modals = document.querySelectorAll(".modal");

  // prevElementToggler(node, index, decrement) hides the current employee modal, and show a previous employee modal 'decrement' index away from the current modal.
  function prevElementToggler(node, index, decrement) {
    if (node[index].style.visibility === "visible" && index > 0) {
      // To find the index of the current modal visible on the page && find if the modal is not the first employee modal on the page.
      const currentModal = node[index]; // currentModal stores the modal that is visible on the screen.
      const currentModalContainer = currentModal.parentNode; // currentModalContainer stores the modalContainer of modal that is visible on the screen.
      const prevModal = node[index - decrement]; // prevModal stores the previous modal at 'decrement' before the currentModal.
      const prevModalContainer = prevModal.parentNode; // prevModalContainer stores the previous modalContainer of the prevModal.
      currentModal.style.visibility = "hidden"; // Hiding the currentModal.
      currentModalContainer.style.visibility = "hidden"; // Hiding the currentModalContainer.
      prevModal.style.visibility = "visible"; // Making the prevModal visible.
      prevModalContainer.style.visibility = "visible"; // Making the prevModalContainer visible.
    } else if (node[index].style.visibility === "visible" && index === 0) {
      // If the modal is the first employee modal on the page.
      const currentModal = node[index]; // currentModal stores the modal that is visible on the screen.
      const currentModalContainer = currentModal.parentNode; // currentModalContainer stores the modalContainer of modal that is visible on the screen.
      currentModal.style.visibility = "visible"; // Making the currentModal visible.
      currentModalContainer.style.visibility = "visible"; // Making the currentModalContainer visible.
    }
  }

  //Looping through all prevButtons to add 'click' event listeners on them to hear for 'clicks'.
  for (let i = 0; i < prevButtons.length; i++) {
    prevButtons[i].addEventListener("click", () => {
      for (let j = 0; j < modals.length; j++) {
        // To check for all the employee modals on the page
        prevElementToggler(modals, j, 1); //prevElementToggler will show employee modal right before i.e 1 behind the modal visible on the screen
      }
    });
  }

  //Looping through all nextButtons to add 'click' event listeners on them to hear for 'clicks'.
  for (let i = 0; i < nextButtons.length; i++) {
    nextButtons[i].addEventListener("click", () => {
      for (let k = 0; k < modals.length; k++) {
        // To check for all the employee modals on the page
        if (modals[k].style.visibility === "visible") {
          // To find the index of the current modal visible on the page.
          const currentModal = modals[k]; // currentModal stores the modal that is visible on the screen.
          const currentModalContainer = currentModal.parentNode; // currentModalContainer stores the modalContainer that is visible on the screen.
          let nextModal = ""; // nextModal will stores the next modal at 1 increment after the currentModal.
          let nextModalContainer = ""; // nextModalContainer stores the modalContainer of the nextModal.
          if (k === modals.length - 1) {
            // Edge case.) If the modal is the last employee modal on the page.
            nextModal = modals[0]; // nextModal is equal to the first employee modal on the page.
            nextModalContainer = nextModal.parentNode; // nextModalContainer stores the modalContainer of the first employee Modal on the page.
            currentModal.style.visibility = "hidden"; // Hiding the currentModal, i.e the last employee modal on the page.
            currentModalContainer.style.visibility = "hidden"; // Hiding the currentModalContainer, i.e the last employee modal container on the page.
            nextModal.style.visibility = "visible"; // Making the first employee modal on the page visible.
            nextModalContainer.style.visibility = "visible"; // Making the first employee modal container on the page visible.
          } else if (k < modals.length) {
            // For all other employee modals on the page
            nextModal = modals[k + 1]; // nextModal stores the next modal at 1 increment after the currentModal
            nextModalContainer = nextModal.parentNode; // nextModalContainer stores the next modal container at 1 increment after the currentModal
            currentModal.style.visibility = "hidden"; // Hiding the currentModal.
            currentModalContainer.style.visibility = "hidden"; // Hiding the currentModalContainer.
            nextModal.style.visibility = "visible"; // Making the nextModal visible.
            nextModalContainer.style.visibility = "visible"; // Making the nextModalContainer visible.
            break; //Break statement is used as the conditional will keep on looping i.e will be true till the last employee Modal on the page,
            // so, break statement will only let the conditional pass through once.
          }
        }
      }
    });
  }
}

//searchFunctionality() hides the employee cards for "unmatched" search query from the search input bar.
function searchFunctionality() {
  const search = document.querySelector(".search-input"); // 'search' stores the search input bar on the top right corner of the page.
  const submit = document.querySelector(".search-submit"); // 'submit' stores the submit button on the top right corner of the page.
  const employeeNames = document.querySelectorAll(".card-name"); // 'employeeNames' stores all the employee card names on the page.
  const employeeModals = document.querySelectorAll(".modal-name"); // 'employeeModals' stores all the employee modal names on the page.
  // 'toggleButtons' stores all the employee modal [PREV] [NEXT] button on the modals on the page.
  const toggleButtons = document.querySelectorAll(".modal-btn-container");

  // array for storing search results
  let searchResults = [];

  /* - performSearch searches for matching employee Card names and displays corresponding names i.e employeeCard,
      while hiding the non matching names. 
      - Arguments it accepts is input- which will be a string, and names 
      which has to be an HTMLCollection.
      - looping is done to check for all the HTMLCollection items.
      - The conditional `if` check for two conditions:-
            1. to check if the "search" input has a value.
            2. names contains the string that has been entered in the "search" input.
      - if both conditional statements are true, it displays names that satisfies those conditions.
   */
  function performSearch(input, names) {
    for (let i = 0; i < names.length; i++) {
      if (input.value.length !== 0) {
        if (
          names[i].textContent.toLowerCase().includes(input.value.toLowerCase())
        ) {
          names[i].parentNode.parentNode.style.visibility = "visible";
          toggleButtons[i].style.visibility = "hidden"; //To disable the toggling functionality.
          // store each of the displayed student name in the 'searchResult' array
          searchResults.push(names[i]);
        } else {
          names[i].parentNode.parentNode.style.visibility = "hidden";
        }
      } else {
        //if nothing is typed in the search input, display all the list of employees
        //and each of their div elements are stored in the 'searchResult' array
        names[i].parentNode.parentNode.style.visibility = "visible";
        searchResults.push(names[i]);
        toggleButtons[i].style.visibility = "inherit"; //to enable the toggling functionality
      }
    }
  }

  //make the searchResult array empty again
  searchResult = [];

  //Attaching a 'click' event listener on the submit button.
  submit.addEventListener("click", event => {
    event.preventDefault(); // to prevent the form from submitting, as this will result in the page to load again with new API response.
    // Invoked performSearch function here - Arguments: search, employeeNames
    performSearch(search, employeeNames);
  });

  //Attaching a 'keyup' event listener on the search input.
  search.addEventListener("keyup", () => {
    // Invoke your performSearch function here - Arguments: search, employeeNames
    performSearch(search, employeeNames);
  });
}
