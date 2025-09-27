let tbodyData1: HTMLElement | null = document.getElementById("tbodyData1");
let listData: HTMLElement | null = document.getElementById("listData");
let add: HTMLElement | null = document.getElementById("add");
let statusInput: HTMLElement | null = document.getElementById("statusInput");
// let pending: HTMLElement | null = document.getElementById("pending");
// let inProgress: HTMLElement | null = document.getElementById("in-progress");
// let done: HTMLElement | null = document.getElementById("done");
let pendingRow: HTMLElement | null = document.getElementById("pendingRow");
let inProgressRow: HTMLElement | null = document.getElementById("inProgressRow");
let doneRow: HTMLElement | null = document.getElementById("doneRow");
let trashId: HTMLElement | null = document.getElementById("trashId");
// notyf
declare const Notyf: any;
const notyf = new Notyf({
    position: {
        x: 'right',
        y: 'top',
    }
});
// array of data
let arr: Todo[] = [];
// interface
interface Todo {
  nameWork: string;
  statusInput: string;
}
if (localStorage.getItem("list")) {
  arr = JSON.parse(localStorage.getItem("list") || "[]");
}

add?.addEventListener("click", ():void =>  {
  let nameWork = (listData as HTMLInputElement).value;
  let statusValue = (statusInput as HTMLInputElement).value;
  arr.push({ nameWork, statusInput: statusValue });
  localStorage.setItem("list", JSON.stringify(arr));
  console.log(arr);
  (listData as HTMLInputElement).value = "";
  (statusInput as HTMLInputElement).value = "";
  getData();
});

//read data
// ...existing code...
function getData() {
  let pendingHtml: string = "";
  let inProgressHtml: string = "";
  let doneHtml: string = "";

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const status = (item.statusInput || "").toLowerCase();

    const row = `<tr data-index="${i}">
      <td>${item.nameWork}<i class="fa-solid fa-trash-can ms-1 trash-icon" id="trashId" onclick="deletItem(${i})"></i></td>
    </tr>`;
    if (status.includes("pending")) {
      pendingHtml += row;
    } else if (status.includes("progress") || status.includes("in-progress") || status.includes("inprogress") || status.includes("in progress")) {
      inProgressHtml += row;
    } else if (status.includes("done")) {
      doneHtml += row;
    } else {
      pendingHtml += row;
    }
  }

  if (pendingRow) pendingRow.innerHTML = pendingHtml;
  if (inProgressRow) inProgressRow.innerHTML = inProgressHtml;
  if (doneRow) doneRow.innerHTML = doneHtml;
}
getData();

//valid
function vaildInputs(element : HTMLInputElement):void {
  var regex: { [key: string]: RegExp } = {
    listData: /^[a-zA-z]{3,200}$/i,
  };
  if (regex[element.id].test(element.value)) {
    notyf.success('Valid');
  } else {
    notyf.error('Invalid');
  }
}
//delete
function deletItem(index : number):void {
  arr.splice(index, 1);
  localStorage.setItem("list", JSON.stringify(arr));
  getData();
}