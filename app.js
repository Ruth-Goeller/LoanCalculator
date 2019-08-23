// event listener for submit

document.getElementById("loan-form").addEventListener("submit", function(e) {
    // hide results
    document.getElementById("results").style.display = "none";

    // show loader
    document.getElementById("loading").style.display = "block";

    setTimeout(calculateResult, 2000);

    e.preventDefault();
});

// calculate result

function calculateResult() {
    console.log("calculating..");

    //UI vars

    const amount = document.getElementById("amount");
    const interest = document.getElementById("interest");
    const years = document.getElementById("years");

    const monthlyPayment = document.getElementById("monthly-payment");
    const totalPayment = document.getElementById("total-payment");
    const totalInterest = document.getElementById("total-interest");

    //calculation

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

        //show result
        document.getElementById("results").style.display = "block";

        // hide loader
        document.getElementById("loading").style.display = "none";
    } else {
        showError("Please check your numbers");
    }
}

function showError(error) {
    const createDiv = document.createElement("div");

    //hide result
    document.getElementById("results").style.display = "none";

    // hide loader
    document.getElementById("loading").style.display = "none";

    //where to placet the error
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");

    card.insertBefore(createDiv, heading);

    createDiv.className = "alert alert-danger";
    createDiv.appendChild(document.createTextNode(error));

    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector(".alert").remove();
}