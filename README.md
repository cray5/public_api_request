# public_api_request

This project builds an app for a fictional company called Awesome Startup, a distributed company with remote employees working all over the world. They need a smart way for employees to share contact information with each other.

The App has four different components:-
–> A request to the Random User Generator API (https://randomuser.me/).
–> Employee detail "card" rendering.
–> Employee detail "modal" rendering.
–> Employee name "search" functionality.

• A request to the Random User Generator API (https://randomuser.me/):- A request is send to the Random User Generator API to get the information of 12 random "employees" of Awesome Startup. The response has to be modified, to make sure the data received is from countries that only use English alphabets. The response is also requested in JSON object format.

• Employee detail "card" rendered:- This display screen once rendered contains the basic details of all the 12 employees of Awesome Startup. The details are - Profile picture, Full Name, Email ID, City, State and Country.

• Employee detail "modal":- This display screen once rendered is revealed only after clicking the "Employee detail card". It contains full details of the employee. The details are - Profile picture, Full Name, Email ID, City, phone number, full address, and birthday.
There is also an onscreen [PREV] and [NEXT] button below the "modal" which can be used to move between all employee "modals". The "modal" screen can be exited using the [X] button on the top-right corner of the employee "modal".

• Employee name "search" functionality:- This display screen will only reveal "cards" of employee that matches the input in the "search" input on the top-left corner of the "Employee detail card" display. The "Employee detail modal" of only the matches can be accessed, and the [PREV] and [NEXT] button are not accessible while there is an input in the "search" input.

//-----------------------------------------------------------//
//------- RANDOM USER GENERATOR API FETCH FUNCTIONS -------- //
//-----------------------------------------------------------//

• fetchData(url):- fetchData(url) takes a url as a parameter, and return the data received in json format using the browser native fetch API.

• checkStatus(response):- checkStatus(response) ensures that, if the API response is not received - we get a message displayed in the console; i.e. failed requests do not go unnoticed silently, as in case of error it returns an error message with the reason for the error.

• Promise.all([fetchData(url)]):- The fetchData function is passed a url to 'https://randomuser.me/api/'. The request is modified to ensure the data received is for 12 employees only, and only from English speaking countries. A single promise object is created using the Promise.all object, then all the helper functions user interaction function, and event listeners functions are applied on the data received.

//-----------------------------------------------------------//
// ------------------- HELPER FUNCTIONS -------------------- //
//-----------------------------------------------------------//

• insertAfter(newElement, referenceElement):- insertAfter(newElement, referenceElement inserts newElement after the referenceElement.

• function generateCard(data):- generateCard(data) renders the employee cards in the "class = gallery div" with the employeeList data from the API response.

• generateModal(data):- generateModal(data) renders the employee modals after the "class = gallery div" with the employeeList data from the API response. It also hides the modals.

• generateSearchContainer():- generateSearchContainer() renders the search input bar and the submit button dynamically.

//-----------------------------------------------------------//
// --------------- EVENT LISTENERS FUNCTIONS --------------- //
//-----------------------------------------------------------//

• showModal():- showModal() displays the employee modals for the employee card which is clicked. A click event listener is applied to all the employee cards inside the function. Functions used inside this function are:-

    ––– * changeVisibility(click):- changeVisibility(click) changes the 'visibility' of the modal from hidden to visible.

• closeModal():- closeModal() hides the employee modals when the [X] button on the top right corner of the modal is clicked. A click event listener is applied to all the employee modals inside the function.

• modalToggle():- modalToggle() moves to the next modal when the [NEXT] button is clicked, and to the previous modal when the [PREV] button is clicked. A click event listener is applied to all the employee modals inside the function. Functions used inside this function are:-

    ––– * prevElementToggler(node, index, decrement):- prevElementToggler(node, index, decrement) hides the current employee modal, and show a previous employee modal 'decrement' index away from the current modal.

• searchFunctionality():- searchFunctionality() hides the employee cards for "unmatched" search query from the search input bar. A click, and keyup event listener are applied to the search input, and the submit button located on the top-right corner of the page inside the function. Functions used inside this function are:-

    ––– * performSearch(input, names):- performSearch searches for matching employee Card names and displays corresponding names i.e employeeCard.

//-----------------------------------------------------------//
// --------- STRUCTURE, STYLE, AND STYLING CHANGES --------- //
//-----------------------------------------------------------//

• Font-family:- Font family has been changed to 'Titillium Web', sans-serif, imported from https://fonts.googleapis.com.

• Body background color:- body background color has been changed to rgba(0, 50, 73, 0.9).

• header h1:- 'header h1 color' has been changed to rgba(239, 118, 129, 0.9), the font-weight is set to bolder, and a text-shadow of #000 has been added.

• .search-input:- .search-input's background has been changed to rgba(224, 221, 207, 0.98).

• .search-input
:hover
:active
:focus:-
.search-input's background on hover,active, and focus has been changed to rgba(243, 244, 227, 0.9), a box-shadow is added and set to 0 20px 50px rgba(243, 244, 227, 0.7). transform: scale(1.1) is also added, and so is transition: all 0.3s ease-in-out 0s.

• .search-submit:- .search-submit's background has been changed to rgba(224, 221, 207, 0.98).

• .search-submit
:hover
:active
:focus:-
.search-submit's background on hover,active, and focus has been changed to rgba(243, 244, 227, 0.9), a box-shadow is added and set to 0 20px 50px rgba(243, 244, 227, 0.7). transform: scale(1.1) is also added, and so is transition: all 0.3s ease-in-out 0s.

• .card:- .card's background has been changed to rgba(224, 221, 207, 0.98).

• .card:hover {
background-color: #F8F4E3;
box-shadow: 0 20px 50px rgba(243, 244, 227, 0.7);
transform: scale(1.1);
transition: all 0.3s ease-in-out 0s;
} has been applied.

• .card-img:hover {
border-radius: 10%;
transform: scale(1.2);
transition: all 0.3s ease-in-out 0s;
} has been applied.

• .modal:- .modal's background has been changed to rgba(224, 221, 207, 1).

• .modal-close-btn:hover {
transform: scale(1.5);
transition: all 0.3s ease-in-out 0s;
} has been applied.

• .modal-img:hover {
border-radius: 10%;
transform: scale(1.2);
transition: all 0.3s ease-in-out 0s;
} has been applied.

• .modal-btn-container:- .modal-btn-container's background has been changed to rgba(248, 244, 227, 1).

• .modal-btn-container:hover {
transform: scale(1.1);
transition: all 0.3s ease-in-out 0s;
} has been applied.

• .modal-btn-container .btn:- .modal-btn-container .btn's background has been changed to rgba(255, 255, 255, 0.9).

.modal-btn-container .btn:hover {
transform: scale(1.1);
transition: all 0.3s ease-in-out 0s;
} has been applied.

@media (min-width: 1024px) {

    .card:hover {
        background: rgba(243, 244, 227, 1);
        border: 1px solid rgba(50, 50, 50, 0.9);
    }

    .card:hover .card-text {
        color: rgba(25, 25, 25, 1);
    }

    .btn:hover {
        background: rgba(243, 255, 189, 1);
        color: rgba(25, 25, 25, 1);
    }

} have also been altered to match the overall color pallette scheme.
