// add event to render list when we detect any change in local storage
window.addEventListener('storage', render);

// add on load event to make favrouite meal page persistent
window.onload = render();

// function get favrouite list from local storage prase it from string to array then add li elements to list 
function render() {
    let FL = localStorage.getItem('favrouiteList');
    const list = document.getElementById('list');
    const count = document.getElementById('meal-count');
    FL = JSON.parse(FL);
    let promise = new Promise((resolved, reject) => {
        FL = FL.map((data, index) => {
            return data = `<li id=${index.toString()}>` + data + `</li><span class="remove" data-dish=${index}><i class="fa-solid fa-trash"></i></span>`;
        });
        resolved(FL);
    })
    promise.then((FL) => {
        let remove = document.getElementsByClassName('remove');//this will return a HTML Collection so we have to convert it into array
        // so to convert any html collection into array
        remove = Array.from(remove);
        for(let i =0;i<remove.length;i++){
            remove[i].addEventListener('click',deteteMeal,i);
        }
    });

    function deteteMeal(i){
        FL.splice(i,1);
        showFavList(FL);
    }
    showFavList(FL);
    // show list 
    function showFavList(favlist) {
        let listData;
        if (!favlist.length) {

        } else {
            listData = favlist.join(' ');
        }
        list.innerHTML = listData;
        count.innerHTML = favlist.length;
    }
}