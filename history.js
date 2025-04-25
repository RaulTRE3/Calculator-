const historyNotAvailableMessage = document.querySelector(
  ".history-not-available"
);
const historyTable = document.querySelector(".history-table");
const historyTableBody = historyTable.querySelector(`tbody`);

let history = [];

const createHistoryRow = () => {
  const lastHistoryItem = history[history.length - 1];

  const newHistoryElement = document.createElement(`tr`);
  newHistoryElement.setAttribute("date-id", lastHistoryItem.id);
  newHistoryElement.innerHTML = `
      <td>${lastHistoryItem.bill} </td>
      <td>${lastHistoryItem.tip}%</td>
      <td>${lastHistoryItem.numberOfPeople}</td>
      <td>${getFormattedDate()} </td>
      <td> 
        <button class="delete-button">
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
      history.splice(lastHistoryItem, 1);
      historyTableBody.removeChild(newHistoryElement);
    }
    const tableRow = deleteButton.parentElement.parentElement;
    const tableRowId = Number(tableRow.getAttribute("data-id"));

    history = history.filter((element) => element.id !== tableRowId);

    // la atributul find trebuie folosit un arrow function in el

    updateAverageBill();
    updateAverageTip();
    theMostExpensive(averageExpensive);
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
