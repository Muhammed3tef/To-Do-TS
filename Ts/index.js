"use strict";
let tbodyData1 = document.getElementById("tbodyData1");
let listData = document.getElementById("listData");
let add = document.getElementById("add");
let statusInput = document.getElementById("statusInput");
let pending = document.getElementById("pending");
let inProgress = document.getElementById("in-progress");
let done = document.getElementById("done");
const notyf = new Notyf({
    position: {
        x: 'right',
        y: 'top',
    }
});
// array of data
let arr = [];
if (localStorage.getItem("list")) {
    arr = JSON.parse(localStorage.getItem("list") || "[]");
}
add?.addEventListener("click", () => {
    let nameWork = listData.value;
    let statusValue = statusInput.value;
    arr.push({ nameWork, statusInput: statusValue });
    localStorage.setItem("list", JSON.stringify(arr));
    console.log(arr);
    listData.value = "";
    statusInput.value = "";
    getData();
});
//read data
function getData() {
    let cartona = "";
    for (let i = 0; i < arr.length; i++) {
        cartona += `<tr>
        <td>${arr[i].nameWork}</td>
      </tr>`;
    }
    document.getElementById("tbodyData1").innerHTML = cartona;
}
getData();
//valid
function vaildInputs(element) {
    var regex = {
        listData: /^[a-zA-z]{3,200}$/i,
    };
    if (regex[element.id].test(element.value)) {
        notyf.success('Valid');
    }
    else {
        notyf.error('Invalid');
    }
}
