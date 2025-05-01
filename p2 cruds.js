let title = document.getElementById('title');
let price = document.getElementById('price');
let selling = document.getElementById('selling');
let gain = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');


let mood = 'create';
let tmp;
//date
let date = new Date();
let yearDate = date.getFullYear();
let monthDate = date.getMonth();
let dayDate = date.getDate();
let hoursDate = date.getHours();
let minutesDate = date.getMinutes();

let totalDate = `${hoursDate}:${minutesDate} ${dayDate}/${monthDate + 1}/${yearDate}`;

//getGain
function getGain() {
    if(price.value !== '') {
        result = +price.value - +selling.value;
        gain.innerHTML = result;
        gain.style.backgroundColor = "#067192";
    }else {
        gain.innerHTML = "";
        gain.style.backgroundColor = "#330692";
    }
}

//create product
let dataPro = [];

if(localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
}else {
    dataPro = [];
}


submit.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        selling: selling.value,
        gain: gain.innerHTML,
        count: count.value,
        data: totalDate,
        category: category.value.toLowerCase(),
    }
    if(title.value != '' && price.value != '') {
        if(mood === 'create') {
            dataPro.push(newPro);
        }else {
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'create';
        };
        clearDate();
    }
    //save data
    localStorage.setItem('product', JSON.stringify(dataPro) );
    showData();
}

//read
function showData() {
    getGain();
    table = '';
    for(let i = 0; i < dataPro.length ; i++) {
        table += 
        `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].selling}</td>
                <td>${dataPro[i].gain}</td>
                <td>${dataPro[i].count}</td>
                <td>${dataPro[i].data}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick= "updataData(${i})" id="update">update</button></td>
                <td><button onclick = "deleteOneValue(${i})" id="delete">delete</button></td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;

    let btndelete = document.getElementById('btndelete');
    if(dataPro.length > 0) {
        btndelete.innerHTML = `<button onclick= "deleteAll()" id="update">delete All ( ${dataPro.length} )</button></td>`;
    }else {
        btndelete.innerHTML = '';
    }
}
showData();
//clear Date
function clearDate() {
    title.value = '';
    price.value = '';
    selling.value = '';
    gain.innerHTML = '';
    count.value= '';
    category.value = '';
};  

//delete
function deleteOneValue(value) {
    dataPro.splice(value,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
};
//delete All
function deleteAll() {
    dataPro.splice(0);
    localStorage.clear();
    showData();
};

//updata
function updataData(value) {
    title.value = dataPro[value].title;
    price.value = dataPro[value].price;
    selling.value = dataPro[value].selling;
    gain.innerHTML =dataPro[value].gain;
    count.value = dataPro[value].count;
    category.value = dataPro[value].category

    getGain();
    submit.innerHTML = "Update";
    mood = 'update';
    tmp = value;
    scroll({
        top:0,
        behavior:"smooth",
    })
}  

//search
let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search');
    if(id === "searchTitle") {
        searchMood = 'title';
        search.placeholder = "Search By Title";
    }else {
        searchMood = 'category';
        search.placeholder = "Search By Category";
    }
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    if(searchMood == 'title') {
        for(let i = 0 ; i < dataPro.length; i++) {
            if(dataPro[i].title.includes(value.toLowerCase())) {
                table += 
                    `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].selling}</td>
                            <td>${dataPro[i].gain}</td>
                            <td>${dataPro[i].count}</td>
                            <td>${dataPro[i].data}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick= "updataData(${i})" id="update">update</button></td>
                            <td><button onclick = "deleteOneValue(${i})" id="delete">delete</button></td>
                        </tr>
                    `;
            }
        }
    }else {
        for(let i = 0 ; i < dataPro.length; i++) {
            if(dataPro[i].category.includes(value.toLowerCase())) {
                table += 
                    `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].selling}</td>
                            <td>${dataPro[i].gain}</td>
                            <td>${dataPro[i].count}</td>
                            <td>${dataPro[i].data}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick= "updataData(${i})" id="update">update</button></td>
                            <td><button onclick = "deleteOneValue(${i})" id="delete">delete</button></td>
                        </tr>
                    `;
            }
        }
    };
    document.getElementById('tbody').innerHTML = table;
};
//clean data
