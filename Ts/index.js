"use strict";
let tbodyData1 = document.getElementById("tbodyData1");
let listData = document.getElementById("listData");
let add = document.getElementById("add");
let statusInput = document.getElementById("statusInput");
// let pending: HTMLElement | null = document.getElementById("pending");
// let inProgress: HTMLElement | null = document.getElementById("in-progress");
// let done: HTMLElement | null = document.getElementById("done");
let pendingRow = document.getElementById("pendingRow");
let inProgressRow = document.getElementById("inProgressRow");
let doneRow = document.getElementById("doneRow");
let trashId = document.getElementById("trashId");
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
// ...existing code...
function getData() {
    let pendingHtml = "";
    let inProgressHtml = "";
    let doneHtml = "";
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const status = (item.statusInput || "").toLowerCase();
        const row = `<tr data-index="${i}">
      <td>${item.nameWork}<i class="fa-solid fa-trash-can ms-1 trash-icon" id="trashId" onclick="deletItem(${i})"></i></td>
    </tr>`;
        if (status.includes("pending")) {
            pendingHtml += row;
        }
        else if (status.includes("progress") || status.includes("in-progress") || status.includes("inprogress") || status.includes("in progress")) {
            inProgressHtml += row;
        }
        else if (status.includes("done")) {
            doneHtml += row;
        }
        else {
            pendingHtml += row;
        }
    }
    if (pendingRow)
        pendingRow.innerHTML = pendingHtml;
    if (inProgressRow)
        inProgressRow.innerHTML = inProgressHtml;
    if (doneRow)
        doneRow.innerHTML = doneHtml;
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
//delete
function deletItem(index) {
    arr.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(arr));
    getData();
}
