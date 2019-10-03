//-----------------------------------------------------------
//  DOM ELEMENTS FOR DOM MANIPULATION  
//-----------------------------------------------------------

const gallery = document.querySelector('#gallery');

//-----------------------------------------------------------
//  FETCH FUNCTIONS
//-----------------------------------------------------------

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log('Looks like there was a problem!', error))
};

Promise.all([
        fetchData('https://randomuser.me/api/?inc=picture,name,email,location,phone,dob&nat=us,au,ca,nz&results=12')
    ])
    .then(data => {
        const employeeList = data[0].results;
        generateCard(employeeList);
        generateModal(employeeList);
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
    referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
}

function generateCard(data) {
    let newUserCard = '';
    data.forEach(card => {
        return newUserCard += `
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
        `;
    });

    gallery.innerHTML = newUserCard;
}

function generateModal(data) {
    const modal = document.createElement('div');
    modal.className = 'modal-container';
    modal.style.visibility = 'hidden';
    let newUserModal = '';
    data.forEach(modal => {
        let DOB = modal.dob.date;
        let dt = DOB.slice(0, 10);
        let formattedDOB = dt.replace(/^(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1');

        newUserModal += `
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
        `;
    });

    modal.innerHTML = newUserModal;
    insertAfter(modal, gallery);
}

//-----------------------------------------------------------
//  EVENT LISTENERS
//-----------------------------------------------------------

gallery.addEventListener('click', (event) => {
    const employeeModals = document.querySelectorAll('.modal');
    const clickedCard = event.currentTarget;
    employeeCardName = clickedCard.querySelector('.card-name').textContent;

    employeeModals.forEach(modal => {
        const employeeModalName = modal.querySelector('.modal-name').textContent;
        if (employeeCardName.includes(employeeModalName)) {
            modal.style.visibility = 'visible';
        }
    });
});