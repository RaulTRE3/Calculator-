const averegeBillElement = document.querySelector(".average-bill");
const averageTipElement = document.querySelector(".average-tip");
const averageTheMostExpensive = document.querySelector(".average-expensive");

const updateAverageBill = () => {
  // statistics

  let sum = 0;

  for (let i = 0; i < history.length; i++) {
    sum += history[i].bill;
  }
  const averege = sum / history.length;

  averegeBillElement.innerHTML = "$" + averege.toFixed(2);
};

const updateAverageTip = () => {
  let sum = 0;
  for (let i = 0; i < history.length; i++) {
    const bill = history[i].bill;
    const tipProcent = history[i].tip;
    const tipValue = bill * (tipProcent / 100);
    sum += tipValue;
  }
  const averageTip = sum / history.length;
  averageTipElement.innerText = `$` + averageTip.toFixed(2);
};

const theMostExpensive = () => {
  let price = 0;
  for (let i = 0; i < history.length; i++) {
    if (history[i].bill > price) {
      price = history[i].bill;
    }
  }
  averageExpensive.innerText = "$" + price;
};
