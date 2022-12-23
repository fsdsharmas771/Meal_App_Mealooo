let favrouiteList = [];

// Getting all required elements
const SearchWrapper = document.querySelector(".search-input");
const InputBox = SearchWrapper.querySelector("input");
const SuggBox = SearchWrapper.querySelector(".autocom-box");
const addtofav = document.getElementById('add');
const search = document.getElementById('search');
let favrouiteMealCount = document.getElementById('fav-meal-count');

// Add to favroouite button click event handlling and storee it to local starage for use in  my fav list page
addtofav.addEventListener('click', function () {
    if (InputBox.value) {
        favrouiteList.push(InputBox.value);
        favrouiteMealCount.innerHTML = favrouiteList.length;
        localStorage.setItem('favrouiteList', JSON.stringify([...favrouiteList]));
    }
});

//if user press any key and release
InputBox.onkeyup = (e) => {
    let userData = e.target.value // grab user entered data into the userData
    let emptyArr = [];
    if (userData) {
        // put all elements start with userData into emptyArr
        emptyArr = suggestion.filter((data) => {
            //filtering array value and user data to lower case and return only 
            //those meals start with user entered data 
            return data.toLowerCase().startsWith(userData.toLowerCase());
        });
        // making their sytex as list and then agin put into the emptyArr
        emptyArr = emptyArr.map((data) => {
            return data = '<li>' + data + '</li>';
        });
        SearchWrapper.classList.add("active");//show autocomplete box
        showSuggestions(emptyArr);
        let allList = SuggBox.querySelectorAll('li');
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute to all li elements
            allList[i].setAttribute("onClick", "Select(this)");//onclick is attribute and Select is the functuin
        }
    } else {
        SearchWrapper.classList.remove("active");// remove autocomplete box
    }
}

function Select(element) {
    let userSelectedData = element.textContent;
    InputBox.value = userSelectedData;// passing the text of user selected list to input text area
    SearchWrapper.classList.remove("active");
}

function showSuggestions(list) {
    let listData;
    if (!list.length) {
        let userValue = InputBox.value;
        listData = '<li>' + userValue + '</li>';
    } else {
        listData = list.join(' ');
    }
    SuggBox.innerHTML = listData;
}


