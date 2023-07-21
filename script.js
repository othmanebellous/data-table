const mainElement = document.querySelector("main");
const header = document.querySelector(".header");
const addCustomerBtn = document.querySelector(".add_customer_btn");
const customersWrapper = document.querySelector(".customers_wrapper");
const selectAllCustomers = document.querySelector(".select_all_customers");
const searchInput = document.querySelector(".search_input");
const sortByBtns = document.querySelectorAll(".sort_by");
let customersArray = [];
let idToUpdate;
let firstName, lastName, description, rate, balance, deposit, accountStatus = "active", currency = "mad";


addCustomerBtn.addEventListener("click", ()=>{
    if(!mainElement.querySelector(".pop_up")){
        createPopUp("add");
    }
});
// ------------------------------------------------ Search -----------------------------------------------------------
let searchValue ="";
searchInput.addEventListener("input", ()=>{
    searchValue = searchInput.value.trim().toLocaleLowerCase();
    displayCustomers();
});

// ------------------------------------------------ Sort-----------------------------------------------------------
let isSorted = false;
sortByBtns.forEach(button =>{
    button.addEventListener("click", ()=>{
        resetSort();
        let filteredArray = customersArray.filter(customer => customer.firstName.toLocaleLowerCase().includes(searchValue) || customer.lastName.toLocaleLowerCase().includes(searchValue) || customer.description.toLocaleLowerCase().includes(searchValue));
        sortCustomers(button, filteredArray);
        updateActiveCustomersNumbers();
    })
});

function sortCustomers(button, filteredArray){
    let sortFunction;
    if (button.classList.contains("sort_by_name")) {
        sortFunction = function(a, b){
            if(a.firstName < b.firstName) { return -1; }
            if(a.firstName > b.firstName) { return 1; }
            return 0;
        };
    }else if(button.classList.contains("sort_by_status")){
        sortFunction = function(a, b){
            if(a.status < b.status) { return -1; }
            if(a.status > b.status) { return 1; }
            return 0;
        };    
    }else{
        let sortByValue = button.parentElement.textContent;
        sortFunction = function(a, b){
            return a[sortByValue.trim()] - b[sortByValue.trim()];
        };
    }
    button.querySelector("i").classList.remove("fa-sort");
    if (isSorted) {
        addCustomersToPage(filteredArray.sort(sortFunction).reverse());
        isSorted = false;
        button.querySelector("i").classList.remove("fa-sort-down", "desc");
        button.querySelector("i").classList.add("fa-sort-up", "asc");
    }else{
        addCustomersToPage(filteredArray.sort(sortFunction));
        isSorted = true;
        button.querySelector("i").classList.remove("fa-sort-up", "asc");
        button.querySelector("i").classList.add("fa-sort-down", "desc");
    }
}

function resetSort(){
    sortByBtns.forEach(btn =>{
        btn.querySelector("i").classList.add("fa-sort");
        btn.querySelector("i").classList.remove("fa-sort-up", "asc", "desc");
    });
}

// ------------------------------------------------ PopUp-----------------------------------------------------------
function createPopUp(buttonType, customer) {
    const popUpForm = document.createElement("form");
    popUpForm.classList.add("pop_up");
    popUpForm.setAttribute("onsubmit", "return false");
    mainElement.appendChild(popUpForm);
    createFirstNameHolder(popUpForm, customer);
    createLastNameHolder(popUpForm, customer);
    createDescriptionHolder(popUpForm, customer);
    createInputsHolder(popUpForm, customer);
    createCancelBtn(popUpForm);
    if (buttonType === "add") {
        createAddBtn(popUpForm);
        createResetBtn(popUpForm);
    }else{
        createUpdateBtn(popUpForm);
    }
}

function createFirstNameHolder(popUpForm, customer){
    const firstNameHolder = document.createElement("div");
    firstNameHolder.className= "first_name_holder";
    popUpForm.appendChild(firstNameHolder);
    createFirstNameLabel(firstNameHolder);
    createFirstNameInput(firstNameHolder, customer);
}

function createFirstNameLabel(firstNameHolder){
    const firstNameLabel = document.createElement("label");
    firstNameLabel.setAttribute("for", "first_name");
    firstNameLabel.textContent = "First Name";
    firstNameHolder.appendChild(firstNameLabel);
}

function createFirstNameInput(firstNameHolder, customer){
    const firstNameInput = document.createElement("input");
    firstNameInput.setAttribute("type", "text");
    firstNameInput.setAttribute("required", true);
    firstNameInput.className= "pop_up_input";
    if (customer) {
        firstNameInput.value = customer.firstName;
        firstName = customer.firstName;
    }
    firstNameHolder.appendChild(firstNameInput);
    firstNameInput.addEventListener("change",()=>{
        firstName = firstNameInput.value.trim();
    });
}

function createLastNameHolder(popUpForm, customer){
    const lastNameHolder = document.createElement("div");
    lastNameHolder.className= "last_name_holder";
    popUpForm.appendChild(lastNameHolder);
    createLastNameLabel(lastNameHolder);
    createLastNameInput(lastNameHolder, customer);
}

function createLastNameLabel(lastNameHolder){
    const lastNameLabel = document.createElement("label");
    lastNameLabel.setAttribute("for", "last_name");
    lastNameLabel.textContent = "Last Name";
    lastNameHolder.appendChild(lastNameLabel);
}

function createLastNameInput(lastNameHolder, customer){
    const lastNameInput = document.createElement("input");
    lastNameInput.setAttribute("required", true);
    lastNameInput.setAttribute("type", "text");
    lastNameInput.className= "pop_up_input";
    if (customer) {
        lastNameInput.value = customer.lastName;
        lastName = customer.lastName;
    }
    lastNameHolder.appendChild(lastNameInput);
    lastNameInput.addEventListener("change",()=>{
        lastName = lastNameInput.value.trim();
    });
}

function createDescriptionHolder(popUpForm, customer){
    const descriptionHolder = document.createElement("div");
    descriptionHolder.className= "description_holder";
    popUpForm.appendChild(descriptionHolder);
    createDescriptionLabel(descriptionHolder);
    createTextArea(descriptionHolder, customer);
}

function createDescriptionLabel(descriptionHolder){
    const descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "description");
    descriptionLabel.textContent = "Description";
    descriptionHolder.appendChild(descriptionLabel);
}

function createTextArea(descriptionHolder, customer){
    const textArea = document.createElement("textarea");
    textArea.setAttribute("required", true);
    textArea.setAttribute("id", "description");
    if (customer) {
        textArea.value = customer.description;
        description = customer.description;
    }
    textArea.classList.add("description_input", "pop_up_input");
    descriptionHolder.appendChild(textArea);
    textArea.addEventListener("change",()=>{
        description = textArea.value.trim();
    });
}

function createInputsHolder(popUpForm, customer){
    const inputsHolder = document.createElement("div");
    inputsHolder.className= "inputs_holder";
    popUpForm.appendChild(inputsHolder);
    createRateHolder(inputsHolder, customer);
    createBalanceHolder(inputsHolder, customer);
    createDipositHolder(inputsHolder, customer);
    createStatusHolder(inputsHolder, customer);
    createCurrencyHolder(inputsHolder, customer);
}

function createRateHolder(inputsHolder, customer){
    const rateHolder = document.createElement("div");
    inputsHolder.appendChild(rateHolder);
    createRateLabel(rateHolder);
    createRateInput(rateHolder, customer);
}

function createRateLabel(rateHolder){
    const rateLabel = document.createElement("label");
    rateLabel.setAttribute("for", "rate");
    rateLabel.textContent ="Rate";
    rateHolder.appendChild(rateLabel);
}

function createRateInput(rateHolder, customer){
    const rateInput = document.createElement("input");
    rateInput.setAttribute("required", true);
    rateInput.setAttribute("type", "number");
    rateInput.className= "pop_up_input";
    if (customer) {
        rateInput.value = customer.rate;
        rate = customer.rate;
    }
    rateHolder.appendChild(rateInput);
    rateInput.addEventListener("change",()=>{
        rate = rateInput.value.trim();
    });
}

function createBalanceHolder(inputsHolder, customer){
    const balanceHolder = document.createElement("div");
    inputsHolder.appendChild(balanceHolder);
    createBalanceLabel(balanceHolder);
    createBalanceInput(balanceHolder, customer);
}

function createBalanceLabel(balanceHolder){
    const balanceLabel = document.createElement("label");
    balanceLabel.setAttribute("for", "balance");
    balanceLabel.textContent = "Balance";
    balanceHolder.appendChild(balanceLabel);
}

function createBalanceInput(balanceHolder, customer){
    const balanceInput = document.createElement("input");
    balanceInput.setAttribute("required", true);
    balanceInput.setAttribute("type", "number");
    balanceInput.className= "pop_up_input";
    if (customer) {
        balanceInput.value = customer.balance;
        balance = customer.balance;
    }
    balanceHolder.appendChild(balanceInput);
    balanceInput.addEventListener("change",()=>{
        balance = balanceInput.value.trim();
    });
}

function createDipositHolder(inputsHolder, customer){
    const dipositHolder = document.createElement("div");
    inputsHolder.appendChild(dipositHolder);
    createDipositLabel(dipositHolder);
    createDipositInput(dipositHolder, customer);
}

function createDipositLabel(dipositHolder){
    const dipositLabel = document.createElement("label");
    dipositLabel.setAttribute("for", "deposit");
    dipositLabel.textContent = "Deposit";
    dipositHolder.appendChild(dipositLabel);
}

function createDipositInput(dipositHolder, customer){
    const dipositInput = document.createElement("input");
    dipositInput.setAttribute("required", true);
    dipositInput.setAttribute("type", "number");
    dipositInput.className= "pop_up_input";
    if (customer) {
        dipositInput.value = customer.deposit;
        deposit = customer.deposit;
    }
    dipositHolder.appendChild(dipositInput);
    dipositInput.addEventListener("change",()=>{
        deposit = dipositInput.value.trim();
    });
}

function createStatusHolder(inputsHolder, customer){
    const statusHolder = document.createElement("div");
    inputsHolder.appendChild(statusHolder);
    createStatusLabel(statusHolder);
    createStatusSelect(statusHolder, customer);
}

function createStatusLabel(statusHolder){
    const statusLabel = document.createElement("label");
    statusLabel.textContent = "Status";
    statusHolder.appendChild(statusLabel);
}

function createStatusSelect(statusHolder, customer){
    const statusSelect = document.createElement("select");
    statusSelect.className = "pop_up_status";
    statusHolder.appendChild(statusSelect);
    createActiveOption(statusSelect);
    createInactiveOption(statusSelect);
    if (customer) {
        statusSelect.value = customer.status;
        accountStatus = customer.status;
    }
    statusSelect.addEventListener("change",()=>{
        accountStatus = statusSelect.value;
    });
}

function createActiveOption(statusSelect){
    const activeOption = document.createElement("option");
    activeOption.setAttribute("value", "active");
    activeOption.textContent = "Active";
    statusSelect.appendChild(activeOption);
}

function createInactiveOption(statusSelect){
    const inactiveOption = document.createElement("option");
    inactiveOption.setAttribute("value", "inactive");
    inactiveOption.textContent = "Inactive";
    statusSelect.appendChild(inactiveOption);
}

function createCurrencyHolder(inputsHolder, customer){
    const currencyHolder = document.createElement("div");
    inputsHolder.appendChild(currencyHolder);
    createCurrencyLabel(currencyHolder);
    createCurrencySelect(currencyHolder, customer);
}

function createCurrencyLabel(currencyHolder){
    const currencyLabel = document.createElement("label");
    currencyLabel.textContent = "Currency";
    currencyHolder.appendChild(currencyLabel);
}

function createCurrencySelect(currencyHolder, customer){
    const currencySelect = document.createElement("select");
    currencySelect.className = "pop_up_currency";
    currencyHolder.appendChild(currencySelect);
    createMadOption(currencySelect);
    createUsdOption(currencySelect);
    createEurOption(currencySelect);
    if (customer) {
        currencySelect.value = customer.currency;
        currency = customer.currency;
    }
    currencySelect.addEventListener("change",()=>{
        currency = currencySelect.value;
    });
}

function createMadOption(currencySelect){
    const madOption = document.createElement("option");
    madOption.setAttribute("value", "mad");
    madOption.textContent = "mad";
    currencySelect.appendChild(madOption);
}

function createUsdOption(currencySelect){
    const usdOption = document.createElement("option");
    usdOption.setAttribute("value", "usd");
    usdOption.textContent = "usd";
    currencySelect.appendChild(usdOption);
}

function createEurOption(currencySelect){
    const eurOption = document.createElement("option");
    eurOption.setAttribute("value", "euro");
    eurOption.textContent = "euro";
    currencySelect.appendChild(eurOption);
}

function createCancelBtn(popUpForm){
    const cancelBtn = document.createElement("button");
    cancelBtn.className = "cancel_btn";
    const cancelIcon = document.createElement("i");
    cancelIcon.classList.add("fa-solid", "fa-x");
    cancelBtn.appendChild(cancelIcon);
    popUpForm.appendChild(cancelBtn);
    cancelBtn.addEventListener("click", ()=>{
        closePopUp(popUpForm);
    });
}

function closePopUp(popUpForm){
    popUpForm.remove();
}

function createAddBtn(popUpForm){
    const addBtn = document.createElement("button");
    addBtn.className = "add_btn";
    addBtn.setAttribute("type", "submit");
    addBtn.textContent = "Add";
    popUpForm.appendChild(addBtn);
    addBtn.addEventListener("click", ()=>{
        if (firstName && lastName && description && rate && balance && deposit && accountStatus && currency) {
            createNewCustomer();
        }
    })
}

function createResetBtn(popUpForm){
    const resetBtn = document.createElement("button");
    resetBtn.className = "reset_btn";
    resetBtn.textContent = "Reset";
    popUpForm.appendChild(resetBtn);
    resetBtn.addEventListener("click", ()=>{
        clearCustomerValues();
    })
}

function createUpdateBtn(popUpForm){
    const updateBtn = document.createElement("button");
    updateBtn.className = "update_btn";
    updateBtn.setAttribute("type", "submit");
    updateBtn.textContent = "Update";
    popUpForm.appendChild(updateBtn);
    updateBtn.addEventListener("click", ()=>{
        updateCustomer(idToUpdate);
        resetSort()
    })
}
// ------------------------------------------------ Customers -----------------------------------------------------------

if(localStorage.getItem("customers") && JSON.parse(localStorage.getItem('customers')).length !== 0){
    customersArray = JSON.parse(localStorage.getItem("customers"));
    displayCustomers();
}

selectAllCustomers.addEventListener("change",()=>{
    if (selectAllCustomers.checked) {
        customersArray.forEach(customer =>{
            customer.selected = true;
        });
        createCustomersCounter();
    }else{
        customersArray.forEach(customer =>{
            customer.selected = false;
        });
        if (header.querySelector(".selected_customers")) {
            header.querySelector(".selected_customers").remove();
        }
    }
    displayCustomers();
    localStorage.setItem("customers", JSON.stringify(customersArray));
});

function createCustomersCounter(){
    let selectedCustomersArray = customersArray.filter(customer => customer.selected);
    if (header.querySelector(".selected_customers")) {
        header.querySelector(".selected_customers_span").textContent = `${selectedCustomersArray.length} selected`;
    }else{
        let selectedCustomers = document.createElement("div");
        selectedCustomers.className ="selected_customers";
        header.insertBefore(selectedCustomers, header.children[0]);
        createSelectedNumerSpan(selectedCustomers, selectedCustomersArray)
        createDeleteSelectedBtn(selectedCustomers, selectedCustomersArray);
    }
}

function createSelectedNumerSpan(selectedCustomers, selectedCustomersArray){
    const selectedNumerSpan = document.createElement("span");
    selectedNumerSpan.className ="selected_customers_span";
    selectedNumerSpan.textContent = `${selectedCustomersArray.length} selected`;
    selectedCustomers.appendChild(selectedNumerSpan);
}

function createDeleteSelectedBtn(selectedCustomers, selectedCustomersArray){
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete_selected_btn");
   selectedCustomers.appendChild(deleteBtn);
   createDeleteSelectedIcon(deleteBtn);
   deleteBtn.addEventListener("click", ()=>{
    deleteSelectedCustomer(selectedCustomersArray);
    resetSort()
   })
};

function deleteSelectedCustomer(selectedCustomersArray){
    selectedCustomersArray.forEach(selectedCustomer =>{
        deleteCustomer(selectedCustomer.id);
    })
    header.querySelector(".selected_customers").remove()
    selectAllCustomers.checked = false;
};

function createDeleteSelectedIcon(deleteBtn){
    let deleteIcon = document.createElement("i");
   deleteIcon.classList.add("fa-solid", "fa-trash");
   deleteBtn.appendChild(deleteIcon);
}

function createNewCustomer(){
    let customer = {
        id: Date.now(),
        firstName: `${firstName.charAt(0).toUpperCase()}${firstName.slice(1).toLowerCase()}`,
        lastName: `${lastName.charAt(0).toUpperCase()}${lastName.slice(1).toLowerCase()}`, 
        description: description,
        rate: rate,
        balance: balance,
        deposit: deposit,
        status: accountStatus,
        currency: currency,
        selected: false,
    }
    addCustomerToLocalStorage(customer);
    clearCustomerValues();
}

function addCustomerToLocalStorage(customer){
    customersArray.unshift(customer);
    localStorage.setItem("customers", JSON.stringify(customersArray));
    displayCustomers();
}

function displayCustomers(){
    let filteredArray = customersArray.filter(customer => customer.firstName.toLocaleLowerCase().includes(searchValue) || customer.lastName.toLocaleLowerCase().includes(searchValue) || customer.description.toLocaleLowerCase().includes(searchValue));
   addCustomersToPage(filteredArray);
   updateActiveCustomersNumbers();
}

function addCustomersToPage(filteredArray){
    customersWrapper.innerHTML = "";
    filteredArray.forEach(customer =>{
        createCustomerRow(customer);

    });

    function createCustomerRow(customer){
        const customerRow = document.createElement("tr");
        customerRow.setAttribute("data-id", customer.id);
        if (customer.selected) {
            customerRow.classList.add("customer", "selected");

        }else{
            customerRow.className = "customer";
        }
        customersWrapper.appendChild(customerRow);
        createCheckBox(customerRow, customer);
        createCustomerName(customerRow, customer);
        createCustomerDescription(customerRow, customer);
        createCustomerRate(customerRow, customer);
        createCustomerBalance(customerRow, customer);
        createCustomerDiposit(customerRow, customer);
        createCustomerStatus(customerRow, customer);
        createActionsHolder(customerRow, customer);
    }
}

function createCheckBox(customerRow, customer){
    const checkBoxHolder = document.createElement("td");
    checkBoxHolder.className ="checkbox";
    customerRow.appendChild(checkBoxHolder);
    createCheckBoxInput(checkBoxHolder, customer);
}

function createCheckBoxInput(checkBoxHolder, customer){
    const checkBoxInput = document.createElement("input");
    checkBoxInput.className ="checkbox_input";
    if (customer.selected) {
        checkBoxInput.setAttribute("checked", true);
    }
    checkBoxInput.setAttribute("type", "checkbox");
    checkBoxInput.setAttribute("required", true);
    checkBoxHolder.appendChild(checkBoxInput);
    checkBoxInput.addEventListener("change", ()=>{
        if (checkBoxInput.checked) {
            customer.selected = true;
            createCustomersCounter();
        }else{
            customer.selected = false;
            if (customersArray.filter(customer => customer.selected).length !== 0) {
                header.querySelector(".selected_customers_span").textContent = `${customersArray.filter(customer => customer.selected).length} selected`;
            }else{
                header.querySelector(".selected_customers").remove();
                selectAllCustomers.checked = false;
            }
        }
        displayCustomers();
        //update local storage
        localStorage.setItem("customers", JSON.stringify(customersArray));
    })
}

function createCustomerName(customerRow, customer){
    const customerName = document.createElement("td");
    customerName.className = "customer_name";
    customerName.textContent = `${customer.firstName} ${customer.lastName}`;
    customerRow.appendChild(customerName);
    createSerialNumber(customerName, customer);
}

function createSerialNumber(customerName, customer){
    const serialNumber = document.createElement("span");
    serialNumber.className ="serial_number";
    serialNumber.textContent = customer.id.toString().substr(0,10);
    customerName.appendChild(serialNumber);
}

function createCustomerDescription(customerRow, customer){
    const customerDescription = document.createElement("td");
    customerRow.appendChild(customerDescription);
    createDescriptionParagraph(customerDescription, customer);
}

function createDescriptionParagraph(customerDescription, customer){
    const descriptionParagraph = document.createElement("p");
    descriptionParagraph.className = "customer_description";
    let descriptionContent = customer.description.length < 40 ? customer.description: `${customer.description.substr(0, 40)}...`
    descriptionParagraph.textContent = `${descriptionContent.charAt(0).toUpperCase()}${descriptionContent.slice(1).toLowerCase()}`;
    customerDescription.appendChild(descriptionParagraph);
}

function createCustomerRate(customerRow, customer){
    const customerRateHolder = document.createElement("td");
    customerRateHolder.className ="customer_rate_holder";
    customerRow.appendChild(customerRateHolder);
    createRateSpan(customerRateHolder, customer);
}

function createRateSpan(customerRateHolder, customer){
    const customerRate = document.createElement("span");
    customerRate.className ="rate";
    customerRate.textContent = Number(customer.rate).toFixed(2);
    customerRateHolder.appendChild(customerRate);
    createCurrencySpan(customerRate, customer);
}

function createCurrencySpan(customerRate, customer){
    const currencySpan = document.createElement("span");
    currencySpan.className = "currency";
    currencySpan.textContent = customer.currency;
    customerRate.appendChild(currencySpan);
}

function createCustomerBalance(customerRow, customer){
    const customerBalanceHolder = document.createElement("td");
    customerBalanceHolder.className ="customer_balance_holder";
    customerRow.appendChild(customerBalanceHolder);
    createBalanceSpan(customerBalanceHolder, customer);
}

function createBalanceSpan(customerBalanceHolder, customer){
    const customerBalance = document.createElement("span");
    customer.balance >= 0 ? 
    customerBalance.classList.add("balance", "positive"):
    customerBalance.classList.add("balance", "negative");
    customerBalance.textContent = Number(customer.balance).toFixed(2);
    customerBalanceHolder.appendChild(customerBalance);
    createCurrencySpan(customerBalance, customer);
}

function createCustomerDiposit(customerRow, customer){
    const customerDipositHolder = document.createElement("td");
    customerDipositHolder.className ="customer_diposit_holder";
    customerRow.appendChild(customerDipositHolder);
    createDipositSpan(customerDipositHolder, customer);
}

function createDipositSpan(customerDipositHolder, customer){
    const customerDiposit = document.createElement("span");
    customerDiposit.className ="deposit";
    customerDiposit.textContent = Number(customer.deposit).toFixed(2);
    customerDipositHolder.appendChild(customerDiposit);
    createCurrencySpan(customerDiposit, customer);
}

function createCustomerStatus(customerRow, customer){
    const customerStatusHolder = document.createElement("td");
    customerRow.appendChild(customerStatusHolder);
    createStatusSpan(customerStatusHolder, customer);
}

function createStatusSpan(customerStatusHolder, customer){
    const customerStatus = document.createElement("span");
    if (customer.status === "active") {
        customerStatus.classList.add("status", "active");
    }else{
        customerStatus.classList.add("status", "inactive");
    }
    customerStatusHolder.appendChild(customerStatus);
}

function createActionsHolder(customerRow, customer){
    const actionsHolder = document.createElement("td");
    customerRow.appendChild(actionsHolder);
    createEditBtn(actionsHolder, customer);
    createDeleteBtn(actionsHolder, customer);
}

function createEditBtn(actionsHolder, customer){
    const editBtn = document.createElement("button");
    editBtn.className = "edit_btn";
    actionsHolder.appendChild(editBtn);
    createEditIcon(editBtn);
    editBtn.addEventListener("click", ()=>{
        createPopUp("edit", customer);
        idToUpdate = customer.id;
    })
}

function createEditIcon(editBtn){
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen");
    editBtn.appendChild(editIcon);
}

function createDeleteBtn(actionsHolder){
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete_btn";
    actionsHolder.appendChild(deleteBtn);
    createDeleteIcon(deleteBtn);
    deleteBtn.addEventListener("click", ()=>{
        deleteCustomer(actionsHolder.parentElement.getAttribute("data-id"));
        resetSort()
    });
}

function deleteCustomer(id){
        customersArray = customersArray.filter(customer => customer.id != id);
        displayCustomers();
        localStorage.setItem("customers", JSON.stringify(customersArray));
        if (selectAllCustomers.checked) {
            header.querySelector(".selected_customers_span").textContent = `${customersArray.filter(customer => customer.selected).length} selected`;
        }
}

function createDeleteIcon(deleteBtn){
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-can");
    deleteBtn.appendChild(deleteIcon);
}

function clearCustomerValues(){
    //clear inputs
    document.querySelectorAll(".pop_up_input").forEach(input =>{
        input.value = "";
    });
    //reset variables
    firstName = ""; lastName = ""; description = ""; rate = 0;
    balance = 0; deposit = 0; accountStatus = "active", currency="mad";
    //reset account status
    document.querySelector(".pop_up_status").value = accountStatus;
    closePopUp(document.querySelector(".pop_up"));
}

function updateCustomer(idToUpdate){
    customersArray.forEach(customer =>{
        if (customer.id === idToUpdate) {
            customer.firstName = `${firstName.charAt(0).toUpperCase()}${firstName.slice(1).toLowerCase()}`;
            customer.lastName= `${lastName.charAt(0).toUpperCase()}${lastName.slice(1).toLowerCase()}`; 
            customer.description= description;
            customer.rate= rate;
            customer.balance= balance;
            customer.deposit= deposit;
            customer.status= accountStatus;
            customer.currency= currency;
        }
    });
    displayCustomers();
    localStorage.setItem("customers", JSON.stringify(customersArray));
    clearCustomerValues();
}

function updateActiveCustomersNumbers(){
    document.querySelector(".active_customers_number").textContent = customersArray.filter(customer => customer.status === "active").length;
    document.querySelector(".all_customers_number").textContent = customersArray.length;
}
