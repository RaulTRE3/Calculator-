// --Form--
const form = document.querySelector(".calculator-container form");
const amountInputError = document.querySelector(".amount-input-error");
const numberOfPeopleInputError = document.querySelector(
  ".number-of-people-input-error"
);
const numberOfPeople = document.querySelector(".number-of-people-input");
const amountInput = document.querySelector(".amount-input");
const tipInputError = document.querySelector(".tip-input-error");
const totalPerPersonElement = document.querySelector(".total-per-person");
const tipTotalPerPerson = document.querySelector(".amount-total-paragraph");
const averageExpensive = document.querySelector(".average-expensive");

// Statistics

let selectedTip;

const handleFormSubmit = (e) => {
  e.preventDefault();
  const data = new FormData(e.target);

  let numberOfErrors = 0;

  // amount

  const amount = Number(data.get("amount"));
  if (amount <= 0) {
    amountInputError.classList.remove("hide");
    numberOfErrors++;
  } else {
    amountInputError.classList.add("hide");
  }

  // de uitat pe ea la final ,legat de tip si custom
  const tip = Number(data.get(`custom-tip`));
  console.log(data.get("custom-tip"));
  if (tip < 0) {
    tipInputError.classList.remove("hide");
    numberOfErrors++;
  } else {
    tipInputError.classList.add("hide");
  }

  // number of people
  const numberOfPeople = Number(data.get("number-of-people"));
  if (numberOfPeople <= 0) {
    numberOfPeopleInputError.classList.remove("hide");
    numberOfErrors++;
  } else {
    numberOfPeopleInputError.classList.add("hide");
  }

  if (numberOfErrors > 0) {
    return;
  }

  // const totalPerPerson
  const totalPerPerson =
    (amount + (selectedTip / 100) * amount) / numberOfPeople;
  totalPerPersonElement.innerText = `$` + totalPerPerson.toFixed(2);
  // const tipPerPerson
  const tipPerPerson = (amount * (selectedTip / 100)) / numberOfPeople;
  tipTotalPerPerson.innerText = `$` + tipPerPerson.toFixed(2);

  resetButton.removeAttribute(`disabled`);
  // History
  historyNotAvailableMessage.classList.add("hide");
  historyTable.classList.remove("hide");

  displayHistoryTable();
  const lastHistoryItem = Date.now();

  history.push({
    id: lastHistoryItem,
    bill: amount,
    tip: Number(selectedTip),
    numberOfPeople: numberOfPeople,
  });

  //statistics
  createHistoryRow(amount, numberOfPeople, lastHistoryItem);
  updateAverageBill();
  updateAverageTip();
  theMostExpensive();
};

form.addEventListener("submit", handleFormSubmit);

// ---Tip Buttons ---
const tipButtons = document.querySelectorAll(".tip-button");

const handleSelectTip = (e) => {
  tipButtons.forEach((tipButton) => {
    tipButton.classList.remove("selected-tip");
  });
  e.target.classList.add("selected-tip");
  customTipInput.value = ``;
  selectedTip = Number(e.target.getAttribute("value"));
};

tipButtons.forEach((tipButton) => {
  tipButton.addEventListener("click", handleSelectTip);
});

// for (let i = 0; i < tipButtons.length; i++) {
//   tipButtons[i].addEventListener("click", handleSelectTip);

// }

// ---Custom Tip Input---
const customTipInput = document.querySelector(".custom-tip-input");

const handleCustomTip = () => {
  tipButtons.forEach((tipButton) => {
    tipButton.classList.remove("selected-tip");
  });
  selectedTip = Number(customTipInput.value);
  // const selectedTipButton = document.querySelector(".selected-tip");
  // if (selectedTipButton !== null) {
  //   selectedTipButton.classList.remove("selected-tip");
  // }
};

customTipInput.addEventListener("input", handleCustomTip);
// ---Reset Button---
// 1. se salveaza in memorie resetButton
const resetButton = document.querySelector(".reset-button");

// 2. se salveaza in memorie handleResetForm

const handleResetForm = () => {
  amountInput.value = "";
  customTipInput.value = "";
  numberOfPeople.value = "";
  totalPerPersonElement.innerText = "$0.00";
  tipTotalPerPerson.innerText = "$0.00";
  resetButton.setAttribute("disabled", "true");
  tipButtons.forEach((tipButton) => {
    tipButton.classList.remove("selected-tip");
  });
  selectedTip = null;
  // cu forEach se trece prin toate butoanele
};

resetButton.addEventListener("click", handleResetForm);
// the most expensive//
