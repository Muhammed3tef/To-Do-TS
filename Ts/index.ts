let tbodyData1: HTMLElement | null = document.getElementById("tbodyData1");
let listData: HTMLElement | null = document.getElementById("listData");
let add: HTMLElement | null = document.getElementById("add");
let statusInput: HTMLElement | null = document.getElementById("statusInput");
let pending: HTMLElement | null = document.getElementById("pending");
let inProgress: HTMLElement | null = document.getElementById("in-progress");
let done: HTMLElement | null = document.getElementById("done");

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
function getData() {
  let cartona: string = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `<tr>
        <td>${arr[i].nameWork}</td>
      </tr>`;
  }
  tbodyData1!.innerHTML = cartona;
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