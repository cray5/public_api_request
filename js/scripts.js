//-----------------------------------------------------------
//  DOM ELEMENTS FOR DOM MANIPULATION
//-----------------------------------------------------------

const gallery = document.querySelector("#gallery");

//-----------------------------------------------------------
//  FETCH FUNCTIONS
//-----------------------------------------------------------

function fetchData(url) {
  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .catch(error => console.log("Looks like there was a problem!", error));
}

Promise.all([
  fetchData(
    "https://randomuser.me/api/?inc=picture,name,email,location,phone,dob&nat=us,au,ca,nz&results=12"
  )
]).then(data => {
  const employeeList = data[0].results;
  generateCard(employeeList);
  generateModal(employeeList);
  showModal();
  closeModal();
});

//-----------------------------------------------------------
//  HELPER FUNCTIONS
//-----------------------------------------------------------

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function insertAfter(newElement, referenceElement) {
  referenceElement.parentNode.insertBefore(
    newElement,
    referenceElement.nextSibling
  );
}

function generateCard(data) {
  let newUserCard = "";
  data.forEach(card => {
    return (newUserCard += `
        <div class='card'>
            <div class='card-img-container'>
                <img class='card-img' src='${card.picture.large}' alt="${card.name.first} ${card.name.last}'s Profile Picture">
            </div>
            <div class='card-info-container'>
                <h3 id='name' class='card-name cap'>${card.name.first} ${card.name.last}</h3>
                <p class='card-text'>${card.email}</p>
                <p class='card-text cap'>${card.location.city}, ${card.location.state}</p>
            </div>
        </div> 
        `);
  });

  gallery.innerHTML = newUserCard;
}

function generateModal(data) {
  const modal = document.createElement("div");
  modal.className = "modal-gallery";
  let newUserModal = "";
  data.forEach(modal => {
    let DOB = modal.dob.date;
    let dt = DOB.slice(0, 10);
    let formattedDOB = dt.replace(/^(\d{4})-(\d{2})-(\d{2})/, "$2/$3/$1");

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
                        <p class="modal-text">${modal.location.street.number} ${modal.location.street.name}., ${modal.location.city}, ${modal.location.state} ${modal.location.postcode}</p>
                        <p class="modal-text">Birthday: ${formattedDOB}</p>
                    </div>
                </div>
            </div>
        `;
  });

  modal.innerHTML = newUserModal;
  insertAfter(modal, gallery);
}

//-----------------------------------------------------------
//  EVENT LISTENERS FUNCTIONS
//-----------------------------------------------------------
function showModal() {
  const employeeCards = document.querySelectorAll(".card");
  const employeeModals = document.querySelectorAll(".modal");
  const modalContainer = document.querySelectorAll(".modal-container");
  const employeeModalNames = [];

  for (let i = 0; i < employeeModals.length; i++) {
    employeeModalNames.push(employeeModals[i].querySelector("h3").textContent);
  }

  function changeVisibility(click) {
    employeeCardName = click.querySelector(".card-name").textContent;
    const modalIndex = employeeModalNames.indexOf(employeeCardName);
    modalContainer[modalIndex].style.visibility = "visible";
    employeeModals[modalIndex].style.visibility = "visible";
  }

  for (let i = 0; i < employeeCards.length; i++) {
    employeeCards[i].addEventListener("click", event => {
      let clickedCard = event.target.parentNode;
      let employeeCardName = clickedCard.querySelectorAll(".card-name");
      if (employeeCardName.length === 12) {
        clickedCard = event.target;
        changeVisibility(clickedCard);
      } else if (employeeCardName.length === 0) {
        clickedCard = event.target.parentNode.parentNode;
        changeVisibility(clickedCard);
      } else {
        clickedCard = event.target.parentNode;
        changeVisibility(clickedCard);
      }
    });
  }
}

function closeModal() {
  const modalCloseButton = document.querySelectorAll(".modal-close-btn");

  for (let i = 0; i < modalCloseButton.length; i++) {
    modalCloseButton[i].addEventListener("click", event => {
      const employeeModal = event.target.parentNode.parentNode;
      employeeModal.style.visibility = "hidden";
      const modalContainer = event.target.parentNode.parentNode.parentNode;
      modalContainer.style.visibility = "hidden";
    });
  }
}
