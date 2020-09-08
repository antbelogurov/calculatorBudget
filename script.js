let data = [
  {
    id: "sww2",
    name: "Купил Штаны",
    amount: -1000,
    positive: false,
  },
  {
    id: "sww3",
    name: "Получил зп",
    amount: 50000,
    positive: true,
  },
  {
    id: "sww4",
    name: "Купил молоко",
    amount: -1000,
    positive: false,
  },
];

if (localStorage.getItem("set")) {
  data = JSON.parse(localStorage.getItem("set")) ;
}

let table = document.querySelector(".budget-more__table");
// Инициализация таблицы из входных данных
function init() {
  table.innerHTML = "";
  for (let key of data) {
    let item = document.createElement("div");
    item.classList.add("row", "budget-more__table-item", "m-2", "p-2");
    item.classList.add(key.positive ? "color-positive" : "color-negative");
    item.innerHTML += `<div class = "item-name px-1">${key.name}</div>
             <div class="item-amount"> ${key.amount} ₽</div>
             <div class="item-delete">
             <button class="btn btn-danger" data-id=${key.id}>&times;</button>
            </div>`;
    table.append(item);
  }
  localStorage.setItem("set", JSON.stringify(data));
}
init();

let budgetNegative = document.querySelector(".budget-negative"),
  budgetPositive = document.querySelector(".budget-positive"),
  budgetTotal = document.querySelector(".budget__table-reuslt");

// Рассчет положительного и отрицательного баланса

function checkBalans() {
  let positive = data.reduce((total, d) => {
    if (d.positive) total += d.amount;
    return total;
  }, 0);
  budgetPositive.innerHTML = positive + "₽";

  let negative = data.reduce((total, d) => {
    if (!d.positive) total += d.amount;
    return total;
  }, 0);
  budgetNegative.innerHTML = negative + "₽";

  budgetTotal.innerHTML = `${positive + negative}₽`;
}

checkBalans();
// Генерируем Айди
let generateId = () => {
  return `f${(+new Date()).toString(16)}`;
};

let form = document.querySelector("form"),
  formButton = document.querySelector(".add-new");
// получаем данные с формы
let addNew = (event) => {
  event.preventDefault();
  let formName = document.querySelector("#title-item").value,
    formAmount = +document.querySelector("#amount-item").value,
    formAdd = document.querySelector(".add-select").value;
  if ((formName.trim() && formAmount) !== "") {
    let obj = {
      id: generateId(),
      name: formName,
      amount: JSON.parse(formAdd) ? formAmount : formAmount * -1,
      positive: JSON.parse(formAdd),
    };
    data.push(obj);
  }

  init();
  checkBalans();
};
form.addEventListener("submit", addNew);
const btnDelete = document.querySelector(".budget-more__table");

const deleteItem = (event) => {
  if (event.target.classList.contains("btn-danger")) {
    data = data.filter((item) => item.id !== event.target.dataset.id);
    console.log(data);
    init();
  }
};
btnDelete.addEventListener("click", deleteItem);
