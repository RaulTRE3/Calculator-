const historyNotAvailableMessage = document.querySelector(
  ".history-not-available"
);
const historyTable = document.querySelector(".history-table");
const historyTableBody = historyTable.querySelector(`tbody`);

let history = [];

const createHistoryRow = (bill, numberOfPeople, lastHistoryItem) => {
  const newHistoryElement = document.createElement(`tr`);
  newHistoryElement.setAttribute("date-id", lastHistoryItem);
  newHistoryElement.innerHTML = `
      <td>${bill} </td>
      <td>${selectedTip}%</td>
      <td>${numberOfPeople}</td>
      <td>${getFormattedDate()} </td>
      <td> 
        <button class="delete-button" data-id="${lastHistoryItem}">
            <img src="./assets/delete.svg" />
        </button>
      </td>
    `;
  historyTableBody.appendChild(newHistoryElement);

  // delete button

  const deleteButton = newHistoryElement.querySelector(".delete-button");

  const handleDeleteHistoryRow = () => {
    const userConfirmed = confirm("Are you sure? This action is irreversible.");

    if (userConfirmed === true) {
      history = history.filter((element) => element.id !== lastHistoryItem);
      historyTableBody.removeChild(newHistoryElement);
      updateAverageBill();
      updateAverageTip();
      theMostExpensive();
    }
  };
  deleteButton.addEventListener("click", handleDeleteHistoryRow);
};

const displayHistoryTable = () => {
  historyNotAvailableMessage.classList.add("hide");
  historyTable.classList.remove("hide");
};
const hideHistoryTable = () => {
  historyNotAvailableMessage.classList.remove("hide");
  historyTable.classList.add("hide");
};

let historyId = 0;

const generateHistoryId = () => {
  historyId++;
  return historyId;
};
