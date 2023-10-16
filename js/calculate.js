let savedDollarRate = parseFloat(localStorage.getItem("currentDollarCourse"));
let savedEuroCross = parseFloat(localStorage.getItem("currentEuroCross"));

let currentDollarCourse = document.getElementById("dollarCourse");
let currentEuroCross = document.getElementById("euroCross");

// function getCoursesFromLocal() {
//   currentDollarCourse = savedDollarRate;
//   currentEuroCross = savedEuroCross;
// }

function saveCoursesToLocal() {
  localStorage.setItem("currentDollarCourse", currentDollarCourse.value);
  localStorage.setItem("currentEuroCross", currentEuroCross.value);
}

const todaysDate = new Date().toLocaleDateString();
document.querySelector(".todaysDate").innerHTML = todaysDate;

function error() {
  alert(
    `You have not entered any value or any number. \n` +
      `\n` +
      `Reload the page and try again...!`
  );
  const errorDiv = document.createElement("div");
  errorDiv.className = "error";
  errorDiv.textContent = "Reload the page and try again...!";
  document.body.innerHTML = "";
  document.body.appendChild(errorDiv);
}

const dollarRate = prompt(`Please, enter today's (${todaysDate}) dollar rate:`);
const euroCross = prompt(
  `Please, enter today's (${todaysDate}) euro cross-rate:`
);
if (
  dollarRate === "" ||
  dollarRate === null ||
  euroCross === "" ||
  euroCross === null
) {
  error();
} else {
  const numericDollarRate = parseFloat(dollarRate.replace(",", "."));
  const numericEuroCross = parseFloat(euroCross.replace(",", "."));

  if (!isNaN(numericDollarRate) && !isNaN(numericEuroCross)) {
    currentDollarCourse.value = numericDollarRate;
    currentEuroCross.value = numericEuroCross;
    saveCoursesToLocal();
  } else {
    error();
  }
}

document.querySelector(".calcDollarPrice").focus();

currentDollarCourse.addEventListener("input", function () {
  saveCoursesToLocal();
  totalSumms();
  console.log(totalEuroSummFunct());
});

currentEuroCross.addEventListener("input", saveCoursesToLocal);

let savedValues = JSON.parse(localStorage.getItem("savedValues")) || [];

function updateSavedValues(inputNumber) {
  savedValues.push(inputNumber);
  localStorage.setItem("savedValues", JSON.stringify(savedValues));
  console.log(savedValues);
}

const inputAmountUsdElements = document.querySelectorAll(".calcDollarPrice");

inputAmountUsdElements.forEach(function (inputAmountUsd) {
  inputAmountUsd.addEventListener("input", function () {
    calculateAmounts(inputAmountUsd);
  });
});

const usdRate = parseFloat(document.getElementById("dollarCourse").value);
const eurRate = parseFloat(document.getElementById("euroCross").value);

function calculateAmounts(inputAmountUsd) {
  const calcDollarPrice = parseFloat(inputAmountUsd.value);

  const amountUah = (calcDollarPrice * usdRate).toFixed(2);
  const amountEur = (calcDollarPrice / eurRate).toFixed(2);
  const parentContainer = inputAmountUsd.parentElement.parentElement;

  parentContainer.querySelector(".calcUahPrice").value = amountUah;
  parentContainer.querySelector(".calcEuroPrice").value = amountEur;
  totalSumms();
}

function checkDeleteBtns() {
  const deleteButtons = document.querySelectorAll(".deleteBtn");
  if (deleteButtons.length === 1) {
    deleteButtons[0].setAttribute("disabled", "true");
  } else {
    deleteButtons.forEach((button) => button.removeAttribute("disabled"));
  }
}

function addFields() {
  const inputContainer = document.querySelector(".calcCourses").cloneNode(true);
  const resultsContainer = document.querySelector(".results-container");
  resultsContainer.appendChild(inputContainer);
  checkDeleteBtns();
  deleteButtons();
  addFieldsAction(inputContainer);
}

function deleteButtons() {
  const deleteButtons = document.querySelectorAll(".deleteBtn");
  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      deleteButtonAction(button);
    });
  });
}

function deleteButtonAction(button) {
  const container = button.closest(".calcCourses");
  if (container) {
    container.remove();
  }
  totalSumms();
  checkDeleteBtns();
}

function addFieldsAction(inputContainer) {
  const clonedInputAmountUsdElements =
    inputContainer.querySelectorAll(".calcDollarPrice");
  clonedInputAmountUsdElements.forEach(function (inputAmountUsd) {
    inputAmountUsd.addEventListener("input", function () {
      calculateAmounts(inputAmountUsd);
    });
    inputContainer.querySelector(".calcDollarPrice").value = "";
    inputContainer.querySelector(".calcUahPrice").value = "";
    inputContainer.querySelector(".calcEuroPrice").value = "";
    inputContainer.querySelector(".calcDollarPrice").focus();
    // window.scrollBy(0, 80);
    window.scrollTo(0, document.body.scrollHeight);
  });
}

const addFieldsButton = document.getElementById("addFields");
addFieldsButton.addEventListener("click", addFields);

const totalSumDollar = document.querySelector(".totalSumDollar");
const totalSumUah = document.querySelector(".totalSumUah");
const totalSumEuro = document.querySelector(".totalSumEuro");

function totalDollarSummFunct() {
  let totalDollarSum = 0;
  let inputAmountUsdElements = document.querySelectorAll(".calcDollarPrice");
  for (var i = 0; i < inputAmountUsdElements.length; i++) {
    if (inputAmountUsdElements[i].value !== "") {
      totalDollarSum += parseFloat(inputAmountUsdElements[i].value);
      totalSumDollar.value = totalDollarSum.toFixed(2);
      totalSumDollar.style.color = "grey";
      setTimeout(function () {
        totalSumDollar.style.color = "black";
      }, 200);
    }
  }
}

function totalUahSummFunct() {
  let totalUahSumm = 0;
  let inputAmountUahElements = document.querySelectorAll(".calcUahPrice");
  for (var i = 0; i < inputAmountUahElements.length; i++) {
    if (inputAmountUahElements[i].value !== "") {
      totalUahSumm += parseFloat(inputAmountUahElements[i].value);
      totalSumUah.value = totalUahSumm.toFixed(2);
      totalSumUah.style.color = "grey";
      setTimeout(function () {
        totalSumUah.style.color = "black";
      }, 200);
    }
  }
}

function totalEuroSummFunct() {
  let totalEuroSumm = 0;
  let inputAmountEuroElements = document.querySelectorAll(".calcEuroPrice");
  for (var i = 0; i < inputAmountEuroElements.length; i++) {
    if (inputAmountEuroElements[i].value !== "") {
      totalEuroSumm += parseFloat(inputAmountEuroElements[i].value);
      totalSumEuro.value = totalEuroSumm.toFixed(2);
      totalSumEuro.style.color = "grey";
      setTimeout(function () {
        totalSumEuro.style.color = "black";
      }, 200);
    }
  }
}

function totalSumms() {
  totalDollarSummFunct();
  totalUahSummFunct();
  totalEuroSummFunct();
}

function clearAll() {
  const calcCoursesDivs = document.querySelectorAll(".calcCourses");
  for (let i = 1; i < calcCoursesDivs.length; i++) {
    const divToDelete = calcCoursesDivs[i];
    divToDelete.parentNode.removeChild(divToDelete);
    document.querySelector(".calcDollarPrice").value = "0";
  }
  calculateAmounts(document.querySelector(".calcDollarPrice"));
  document.querySelector(".deleteBtn").setAttribute("disabled", "true");
  document.querySelector(".calcDollarPrice").focus();
  document.querySelector(".calcDollarPrice").value = "0";
  document.querySelector(".calcUahPrice").value = "0";
  document.querySelector(".calcEuroPrice").value = "0";
  totalDollarSummFunct();
  totalUahSummFunct();
  totalEuroSummFunct();
}

const clearAllBtn = document.querySelector(".clearAllBtn");

clearAllBtn.addEventListener("click", clearAll);
