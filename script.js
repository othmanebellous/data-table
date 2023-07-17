const addCustomerBtn = document.querySelector(".add_customer_btn");
const mainElement = document.querySelector("main");


addCustomerBtn.addEventListener("click", ()=>{
    if(!mainElement.querySelector(".pop_up")){
        createPopUp("add");
    }
});

function createPopUp(buttonType) {
    let popUpDiv = document.createElement("div");
    popUpDiv.classList.add("pop_up");
    mainElement.appendChild(popUpDiv);
    createFirstNameHolder(popUpDiv);
    createLastNameHolder(popUpDiv);
    createDescriptionHolder(popUpDiv);
    createInputsHolder(popUpDiv);
    createCancelBtn(popUpDiv);
    if (buttonType === "add") {
        createAddBtn(popUpDiv);
        createResetBtn(popUpDiv);
    }else{
        createUpdateBtn(popUpDiv);
    }
}

function createFirstNameHolder(popUpDiv){
    let firstNameHolder = document.createElement("div");
    firstNameHolder.className= "first_name_holder";
    popUpDiv.appendChild(firstNameHolder);
    createFirstNameLabel(firstNameHolder);
    createFirstNameInput(firstNameHolder);
}

function createFirstNameLabel(firstNameHolder){
    let firstNameLabel = document.createElement("label");
    firstNameLabel.setAttribute("for", "first_name");
    firstNameLabel.textContent = "First Name";
    firstNameHolder.appendChild(firstNameLabel);
}

function createFirstNameInput(firstNameHolder){
    let firstNameInput = document.createElement("input");
    firstNameInput.setAttribute("type", "text", "id", "first_name");
    firstNameInput.className= "pop_up_input";
    firstNameHolder.appendChild(firstNameInput);
}

function createLastNameHolder(popUpDiv){
    let lastNameHolder = document.createElement("div");
    lastNameHolder.className= "last_name_holder";
    popUpDiv.appendChild(lastNameHolder);
    createLastNameLabel(lastNameHolder);
    createLastNameInput(lastNameHolder);
}

function createLastNameLabel(lastNameHolder){
    let lastNameLabel = document.createElement("label");
    lastNameLabel.setAttribute("for", "last_name");
    lastNameLabel.textContent = "Last Name";
    lastNameHolder.appendChild(lastNameLabel);
}

function createLastNameInput(lastNameHolder){
    let lastNameInput = document.createElement("input");
    lastNameInput.setAttribute("type", "text", "id", "last_name");
    lastNameInput.className= "pop_up_input";
    lastNameHolder.appendChild(lastNameInput);
}

function createDescriptionHolder(popUpDiv){
    let descriptionHolder = document.createElement("div");
    descriptionHolder.className= "description_holder";
    popUpDiv.appendChild(descriptionHolder);
    createDescriptionLabel(descriptionHolder);
    createTextArea(descriptionHolder);
}

function createDescriptionLabel(descriptionHolder){
    let descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "description");
    descriptionLabel.textContent = "Description";
    descriptionHolder.appendChild(descriptionLabel);
}

function createTextArea(descriptionHolder){
    let textArea = document.createElement("textarea");
    textArea.setAttribute("id", "description");
    textArea.classList.add("description_input", "pop_up_input");
    descriptionHolder.appendChild(textArea);
}

function createInputsHolder(popUpDiv){
    let inputsHolder = document.createElement("div");
    inputsHolder.className= "inputs_holder";
    popUpDiv.appendChild(inputsHolder);
    createRateHolder(inputsHolder);
    createBalanceHolder(inputsHolder);
    createDipositHolder(inputsHolder);
    createStatusHolder(inputsHolder);
}

function createRateHolder(inputsHolder){
    let rateHolder = document.createElement("div");
    inputsHolder.appendChild(rateHolder);
    createRateLabel(rateHolder);
    createRateInput(rateHolder);
}

function createRateLabel(rateHolder){
    let rateLabel = document.createElement("label");
    rateLabel.setAttribute("for", "rate");
    rateLabel.textContent ="Rate";
    rateHolder.appendChild(rateLabel);
}

function createRateInput(rateHolder){
    let rateInput = document.createElement("input");
    rateInput.setAttribute("type", "number", "id", "rate");
    rateInput.className= "pop_up_input";
    rateHolder.appendChild(rateInput);
}

function createBalanceHolder(inputsHolder){
    let balanceHolder = document.createElement("div");
    inputsHolder.appendChild(balanceHolder);
    createBalanceLabel(balanceHolder);
    createBalanceInput(balanceHolder);
}

function createBalanceLabel(balanceHolder){
    let balanceLabel = document.createElement("label");
    balanceLabel.setAttribute("for", "balance");
    balanceLabel.textContent = "Balance";
    balanceHolder.appendChild(balanceLabel);
}

function createBalanceInput(balanceHolder){
    let balanceInput = document.createElement("input");
    balanceInput.setAttribute("type", "number", "id", "balance");
    balanceInput.className= "pop_up_input";
    balanceHolder.appendChild(balanceInput);
}

function createDipositHolder(inputsHolder){
    let dipositHolder = document.createElement("div");
    inputsHolder.appendChild(dipositHolder);
    createDipositLabel(dipositHolder);
    createDipositInput(dipositHolder);
}

function createDipositLabel(dipositHolder){
    let dipositLabel = document.createElement("label");
    dipositLabel.setAttribute("for", "diposit");
    dipositLabel.textContent = "Diposit";
    dipositHolder.appendChild(dipositLabel);
}

function createDipositInput(dipositHolder){
    let dipositInput = document.createElement("input");
    dipositInput.setAttribute("type", "number", "id", "diposit");
    dipositInput.className= "pop_up_input";
    dipositHolder.appendChild(dipositInput);
}

function createStatusHolder(inputsHolder){
    let statusHolder = document.createElement("div");
    inputsHolder.appendChild(statusHolder);
    createStatusLabel(statusHolder);
    createStatusSelect(statusHolder);
}

function createStatusLabel(statusHolder){
    let statusLabel = document.createElement("label");
    statusLabel.textContent = "Status";
    statusHolder.appendChild(statusLabel);
}

function createStatusSelect(statusHolder){
    let statusSelect = document.createElement("select");
    statusSelect.className = "pop_up_status";
    statusHolder.appendChild(statusSelect);
    createActiveOption(statusSelect);
    createInactiveOption(statusSelect);
}

function createActiveOption(statusSelect){
    let activeOption = document.createElement("option");
    activeOption.setAttribute("value", "active");
    activeOption.textContent = "Active";
    statusSelect.appendChild(activeOption);
}

function createInactiveOption(statusSelect){
    let inactiveOption = document.createElement("option");
    inactiveOption.setAttribute("value", "inactive");
    inactiveOption.textContent = "Inactive";
    statusSelect.appendChild(inactiveOption);
}

function createCancelBtn(popUpDiv){
    let cancelBtn = document.createElement("button");
    cancelBtn.className = "cancel_btn";
    let cancelIcon = document.createElement("i");
    cancelIcon.classList.add("fa-solid", "fa-x");
    cancelBtn.appendChild(cancelIcon);
    popUpDiv.appendChild(cancelBtn);
    cancelBtn.addEventListener("click", ()=>{
        closePopUp(popUpDiv);
    })
}

function closePopUp(popUpDiv){
    popUpDiv.remove();
}

function createAddBtn(popUpDiv){
    let addBtn = document.createElement("button");
    addBtn.className = "add_btn";
    addBtn.textContent = "Add";
    popUpDiv.appendChild(addBtn);
}

function createResetBtn(popUpDiv){
    let resetBtn = document.createElement("button");
    resetBtn.className = "reset_btn";
    resetBtn.textContent = "Reset";
    popUpDiv.appendChild(resetBtn);
}

function createUpdateBtn(popUpDiv){
    let updateBtn = document.createElement("button");
    updateBtn.className = "update_btn";
    updateBtn.textContent = "Update";
    popUpDiv.appendChild(updateBtn);
}