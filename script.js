const mainElement = document.querySelector("main");
const header = document.querySelector(".header");
const addCustomerBtn = document.querySelector(".add_customer_btn");
const customersWrapper = document.querySelector(".customers_wrapper");
const searchInput = document.querySelector(".search_input");
const selectAllBtn = document.querySelector(".select_all_customers");
const sortByBtns = document.querySelectorAll(".sort_by");
const ascSortBtns = document.querySelectorAll(".sort_asc");
const descSortBtns = document.querySelectorAll(".sort_desc");
const paginationList = document.querySelector(".pagination_list");
const prevBtn = document.querySelector(".pagination_btn_prev");
const nextBtn = document.querySelector(".pagination_btn_next");
const rowsPerPageList = document.querySelector(".rows_per_page_list");
let customersArray = [];
let filteredArray;
let sortFunction;
let idToUpdate;
let customersPerPage = Number(rowsPerPageList.value);
let pagesNumber;
let currentPage = 1;
let firstName, lastName, description, rate, balance, deposit, accountStatus = "active", currency = "mad";


addCustomerBtn.addEventListener("click", ()=>{
    createPopUp("add");
});
// ------------------------------------------------ Search -----------------------------------------------------------

searchInput.addEventListener("input", ()=>{
    displayCustomers();
    // checkForSelectedCustomers();
});

//-------------------------------------------------Select Customers ----------------------------------------------------
selectAllBtn.addEventListener("click", ()=>{
    if (filteredArray.every(customer => customer.selected) || filteredArray.some(customer => customer.selected)) {
        filteredArray.forEach(customer => {
            customer.selected = false;
            customersArray.forEach(orignalCustomer =>{
                if(customer.id === orignalCustomer.id){
                    orignalCustomer.selected = customer.selected;
                }
            });
            resetSelectAllBtn();
        });
        displayCustomers();
    }else if (filteredArray.every(customer => !customer.selected)) {
        addIcon("check");
        selectAllBtn.classList.add("isSelected");
        filteredArray.forEach(customer => {
            customer.selected = true;
            customersArray.forEach(orignalCustomer =>{
                if(customer.id === orignalCustomer.id){
                    orignalCustomer.selected = customer.selected;
                }
            })
        });
        displayCustomers();
    }
});

function checkForSelectedCustomers(){
    if (filteredArray.every(customer => customer.selected)) {
        if (filteredArray.length !== 0) {
            selectAllBtn.innerHTML="";
        addIcon("check");
        selectAllBtn.classList.add("isSelected");
        }
    }else if (filteredArray.some(customer => customer.selected)) {
        selectAllBtn.innerHTML="";
        addIcon("minus");
        selectAllBtn.classList.add("isSelected");
    }else{
        resetSelectAllBtn();
    }
};

function addIcon(iconType){
    const icon =document.createElement("i");
    icon.className="fa-solid";
    if(iconType === "minus"){
        icon.classList.add("fa-minus");
    }else{
        icon.classList.add("fa-check");
    }
    selectAllBtn.appendChild(icon);
};

function resetSelectAllBtn(){
    selectAllBtn.innerHTML ="";
    selectAllBtn.classList.remove("isSelected");
};
// ------------------------------------------------ Sort----------------------------------------------------------------

//Sort by ascending order
let isNameAscSorted = isRateAscSorted = isBalanceAscSorted = isDepositAscSorted = isStatusAscSorted = false;
ascSortBtns.forEach(btn =>{
    btn.addEventListener("click", ()=>{
        sortByBtns.forEach(btn => btn.classList.remove("sorted")); 
        if (btn.classList.contains("sort_by_name")) {
           sortNamesAscendingly(btn); 
           isRateAscSorted = isBalanceAscSorted = isDepositAscSorted = isStatusAscSorted = false;
           isNameDescSorted = isRateDescSorted = isBalanceDescSorted = isDepositDescSorted = isStatusDescSorted = false;
        }else if(btn.classList.contains("sort_by_rate")){
            sortRatesAscendingly(btn);
            isNameAscSorted = isBalanceAscSorted = isDepositAscSorted = isStatusAscSorted = false;
            isRateDescSorted = isNameDescSorted = isBalanceDescSorted = isDepositDescSorted = isStatusDescSorted = false;
        }else if(btn.classList.contains("sort_by_balance")){
            sortBalancesAscendingly(btn);
            isNameAscSorted = isRateAscSorted = isDepositAscSorted = isStatusAscSorted = false;
            isBalanceDescSorted = isNameDescSorted = isRateDescSorted = isDepositDescSorted = isStatusDescSorted = false;
        }else if(btn.classList.contains("sort_by_deposit")){
            sortDepositAscendingly(btn);
            isNameAscSorted = isRateAscSorted = isBalanceAscSorted = isStatusAscSorted = false;
            isDepositDescSorted = isNameDescSorted = isRateDescSorted = isBalanceDescSorted = isStatusDescSorted = false;
        }else if(btn.classList.contains("sort_by_status")){
            sortStatusAscendingly(btn);
            isNameAscSorted = isRateAscSorted = isBalanceAscSorted = isDepositAscSorted = false;
            isStatusDescSorted = isNameDescSorted = isRateDescSorted = isBalanceDescSorted = isDepositDescSorted = false;
        }
    })
});

function sortNamesAscendingly(btn){
    if(!isNameAscSorted){
        btn.classList.add("sorted");
        sortFunction = function(a, b){
            if(a.firstName < b.firstName) { return -1; }
            if(a.firstName > b.firstName) { return 1; }
            return 0;
        };
        addCustomersToPage(filteredArray.sort(sortFunction));
        isNameAscSorted = true
    }else{
        resetSort(btn);
        isNameAscSorted = false;
    }
};

function sortRatesAscendingly(btn){
    if (!isRateAscSorted) {
        btn.classList.add("sorted");
        sortFunction = (a, b) => a.rate - b.rate;
        addCustomersToPage(filteredArray.sort(sortFunction));
        isRateAscSorted = true;
    }else{
        resetSort(btn);
        isRateAscSorted = false;
    }
};

function sortBalancesAscendingly(btn){
    if (!isBalanceAscSorted) {
        btn.classList.add("sorted");
        sortFunction = (a, b) => a.balance - b.balance;
        addCustomersToPage(filteredArray.sort(sortFunction));
        isBalanceAscSorted = true;
    }else{
        resetSort(btn);
        isBalanceAscSorted = false;
    }
};

function sortDepositAscendingly(btn){
    if (!isDepositAscSorted) {
        btn.classList.add("sorted");
        sortFunction = (a, b) => a.deposit - b.deposit;
        addCustomersToPage(filteredArray.sort(sortFunction));
        isDepositAscSorted = true;
    }else{
        resetSort(btn);
        isDepositAscSorted = false;
    }
}

function sortStatusAscendingly(btn){
    if(!isStatusAscSorted){
        btn.classList.add("sorted");
        sortFunction = function(a, b){
            if(a.status < b.status) { return -1; }
            if(a.status > b.status) { return 1; }
            return 0;
        };
        addCustomersToPage(filteredArray.sort(sortFunction));
        isStatusAscSorted = true;
    }else{
        resetSort(btn);
        isStatusAscSorted = false;
    }
}

function resetSort(btn){
    btn.classList.remove("sorted");
    displayCustomers();
}
//Sort by descending order
let isNameDescSorted = isRateDescSorted = isBalanceDescSorted = isDepositDescSorted = isStatusDescSorted = false;

descSortBtns.forEach(btn =>{
    btn.addEventListener("click", ()=>{
        sortByBtns.forEach(btn => btn.classList.remove("sorted")); 
        if (btn.classList.contains("sort_by_name")) {
           sortNamesDescendingly(btn); 
           isNameAscSorted = isRateAscSorted = isBalanceAscSorted = isDepositAscSorted = isStatusAscSorted = false;
           isRateDescSorted = isBalanceDescSorted = isDepositDescSorted = isStatusDescSorted = false;
        }else if(btn.classList.contains("sort_by_rate")){
            sortRatesDescendingly(btn);
            isRateAscSorted = isNameAscSorted = isBalanceAscSorted = isDepositAscSorted = isStatusAscSorted = false;
            isNameDescSorted = isBalanceDescSorted = isDepositDescSorted = isStatusDescSorted = false;
        }else if(btn.classList.contains("sort_by_balance")){
            sortBalancesDescendingly(btn);
            isBalanceAscSorted = isNameAscSorted = isRateAscSorted = isDepositAscSorted = isStatusAscSorted = false;
            isNameDescSorted = isRateDescSorted = isDepositDescSorted = isStatusDescSorted = false;
        }else if(btn.classList.contains("sort_by_deposit")){
            sortDepositDescendingly(btn);
            isDepositAscSorted = isNameAscSorted = isRateAscSorted = isBalanceAscSorted = isStatusAscSorted = false;
            isNameDescSorted = isRateDescSorted = isBalanceDescSorted = isStatusDescSorted = false;
        }else if(btn.classList.contains("sort_by_status")){
            sortStatusDescendingly(btn);
            isStatusAscSorted = isNameAscSorted = isRateAscSorted = isBalanceAscSorted = isDepositAscSorted = false;
            isNameDescSorted = isRateDescSorted = isBalanceDescSorted = isDepositDescSorted = false;
        }
    })
});

function sortNamesDescendingly(btn){
    if(!isNameDescSorted){
        btn.classList.add("sorted");
        sortFunction = function(a, b){
            if(a.firstName < b.firstName) { return -1; }
            if(a.firstName > b.firstName) { return 1; }
            return 0;
        };
        addCustomersToPage(filteredArray.sort(sortFunction).reverse());
        isNameDescSorted = true
    }else{
        resetSort(btn);
        isNameDescSorted = false;
    }
};

function sortRatesDescendingly(btn){
    if (!isRateDescSorted) {
        btn.classList.add("sorted");
        sortFunction = (a, b) => a.rate - b.rate;
        addCustomersToPage(filteredArray.sort(sortFunction).reverse());
        isRateDescSorted = true;
    }else{
        resetSort(btn);
        isRateDescSorted = false;
    }
};

function sortBalancesDescendingly(btn){
    if (!isBalanceDescSorted) {
        btn.classList.add("sorted");
        sortFunction = (a, b) => a.balance - b.balance;
        addCustomersToPage(filteredArray.sort(sortFunction).reverse());
        isBalanceDescSorted = true;
    }else{
        resetSort(btn);
        isBalanceDescSorted = false;
    }
};

function sortDepositDescendingly(btn){
    if (!isDepositDescSorted) {
        btn.classList.add("sorted");
        sortFunction = (a, b) => a.deposit - b.deposit;
        addCustomersToPage(filteredArray.sort(sortFunction).reverse());
        isDepositDescSorted = true;
    }else{
        resetSort(btn);
        isDepositDescSorted = false;
    }
}

function sortStatusDescendingly(btn){
    if(!isStatusDescSorted){
        btn.classList.add("sorted");
        sortFunction = function(a, b){
            if(a.status < b.status) { return -1; }
            if(a.status > b.status) { return 1; }
            return 0;
        };
        addCustomersToPage(filteredArray.sort(sortFunction).reverse());
        isStatusDescSorted = true;
    }else{
        resetSort(btn);
        isStatusDescSorted = false;
    }
}

function resetSortVariables(){
    isStatusAscSorted = isNameAscSorted = isRateAscSorted = isBalanceAscSorted = isDepositAscSorted = false;
    isStatusdescSorted = isNameDescSorted = isRateDescSorted = isBalanceDescSorted = isDepositDescSorted = false;
};

//--------------------------------------------pagination----------------------------------------------------------------------------------
rowsPerPageList.addEventListener("change", ()=>{
    if(rowsPerPageList.value === "all"){
        customersPerPage = customersArray.length;
        
    }else{
        customersPerPage = Number(rowsPerPageList.value);
    }
    currentPage = 1;
    displayCustomers();
})

function createPagination(){
    if(searchInput.value.trim()){
        pagesNumber = Math.ceil(filteredArray.length / customersPerPage);
    }else{
        pagesNumber = Math.ceil(customersArray.length / customersPerPage);
    }

   disableNextAndPrev();
   
    createPaginationBtns();
}

function disableNextAndPrev(){
    if(currentPage === 1){
        prevBtn.classList.add("hide")
    }else{
        prevBtn.classList.remove("hide")
    }

    if(currentPage === pagesNumber){
        nextBtn.classList.add("hide")
    }else{
        nextBtn.classList.remove("hide")
    }
};

function createPaginationBtns(){
    paginationList.innerHTML = "";
    for(let i = 1; i <= pagesNumber; i++){
        const paginationBtn = document.createElement("button");
        paginationBtn.className ="pagination_btn";
        if(currentPage === i){
            paginationBtn.classList.add("active");
        }
        paginationBtn.textContent = i;
        paginationList.appendChild(paginationBtn);
        paginationBtn.addEventListener("click", ()=>{
            currentPage = i;
            displayCustomers()
        })
    }
};

prevBtn.addEventListener("click", ()=>{
     currentPage === 1? currentPage: currentPage = currentPage -1;
     displayCustomers();
    });
nextBtn.addEventListener("click", ()=>{
    currentPage === pagesNumber? currentPage: currentPage = currentPage +1;
    displayCustomers();
});
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
    document.body.classList.add("overlay");
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
    document.body.classList.remove("overlay")
}

function createAddBtn(popUpForm){
    const addBtn = document.createElement("button");
    addBtn.classList.add("add_btn", "blue_btn");
    addBtn.setAttribute("type", "submit");
    addBtn.textContent = "Add";
    popUpForm.appendChild(addBtn);
    addBtn.addEventListener("click", ()=>{
        if (firstName && lastName && description && rate && balance && deposit && accountStatus && currency) {
            createNewCustomer();
        }
        closePopUp(popUpForm);
    })
}

function createResetBtn(popUpForm){
    const resetBtn = document.createElement("button");
    resetBtn.classList.add("reset_btn", "blue_btn");
    resetBtn.textContent = "Reset";
    popUpForm.appendChild(resetBtn);
    resetBtn.addEventListener("click", ()=>{
        clearCustomerValues();
    })
}

function createUpdateBtn(popUpForm){
    const updateBtn = document.createElement("button");
    updateBtn.classList.add("update_btn", "blue_btn");
    updateBtn.setAttribute("type", "submit");
    updateBtn.textContent = "Update";
    popUpForm.appendChild(updateBtn);
    updateBtn.addEventListener("click", ()=>{
        updateCustomer(idToUpdate, popUpForm);
    })
}
// ------------------------------------------------ Customers -----------------------------------------------------------

if(localStorage.getItem("customers") && JSON.parse(localStorage.getItem('customers')).length !== 0){
    customersArray = JSON.parse(localStorage.getItem("customers"));
    customersArray.forEach(customer=> customer.selected = false)
    displayCustomers();
}else{
    customersArray= [{ id: 1690115452013, firstName: "Othmane", lastName: "Bellous", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", rate: "4", balance: "7", deposit: "5", status: "active", currency: "mad", selected: false },{ id: 1690115452014, firstName: "Matthew", lastName: "Schreck", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", rate: "20", balance: "30", deposit: "100", status: "inactive", currency: "usd", selected: false },{ id: 1690115452015, firstName: "David", lastName: "Henry", description: "aa", rate: "4", balance: "7", deposit: "5", status: "active", currency: "euro", selected: false },{ id: 1690115452016, firstName: "Robert", lastName: "Davis", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", rate: "14", balance: "17", deposit: "500", status: "active", currency: "euro", selected: false },{ id: 1690115452017, firstName: "Howis", lastName: "Hamilton", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", rate: "44", balance: "777", deposit: "390", status: "active", currency: "euro", selected: false }]
    localStorage.setItem("customers", JSON.stringify(customersArray));
    displayCustomers();
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
    customersArray.unshift(customer);
    addCustomerToLocalStorage();
    clearCustomerValues();
}

function addCustomerToLocalStorage(){
    localStorage.setItem("customers", JSON.stringify(customersArray));
    displayCustomers();
}

function displayCustomers(){
    let searchValue = searchInput.value.trim().toLocaleLowerCase();
    filteredArray = customersArray.filter(customer => customer.firstName.toLocaleLowerCase().includes(searchValue) || customer.lastName.toLocaleLowerCase().includes(searchValue) || customer.description.toLocaleLowerCase().includes(searchValue));
   addCustomersToPage();
   sortByBtns.forEach(btn => btn.classList.remove("sorted"));
    resetSortVariables();
    checkForSelectedCustomers();
}

function addCustomersToPage(){
    customersWrapper.innerHTML = "";
    createPagination();
    filteredArray = filteredArray.slice((currentPage -1) * customersPerPage, currentPage * customersPerPage);
    if (filteredArray.length === 0) {
        displayMessage();
    }
    filteredArray.forEach((customer) =>{
        createCustomerRow(customer);
    });
    updateActiveCustomersNumbers();
    checkIfLastCustomerOdd();
}
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
        }else{
            customer.selected = false;
        }
        displayCustomers();
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
        customerStatus.textContent="active";
    }else{
        customerStatus.classList.add("status", "inactive");
        customerStatus.textContent="inactive";
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
        createConfirmPopUP(actionsHolder.parentElement.getAttribute("data-id"));
    });
};

function createConfirmPopUP(id){
    const confirmDoalog = document.createElement("dialog");
    confirmDoalog.className ="confirm_dialog";
    confirmDoalog.textContent="Are you sure you want to delete this customer?";
    document.body.appendChild(confirmDoalog);
    createConfirmButtons(confirmDoalog, id);
    document.body.classList.add("overlay");
};

function createConfirmButtons(confirmDoalog, id){
    const confirmButtons = document.createElement("div");
    confirmDoalog.appendChild(confirmButtons);
    createConfirmOkBtn(confirmButtons, confirmDoalog, id);
    createConfirmCancelBtn(confirmButtons, confirmDoalog);
};

function createConfirmOkBtn(confirmButtons, confirmDoalog, id){
    const confirmOkBtn = document.createElement("button");
    confirmOkBtn.classList.add("confirm_ok", "blue_btn");
    confirmOkBtn.textContent="Yes";
    confirmButtons.appendChild(confirmOkBtn);
    confirmOkBtn.addEventListener("click", ()=>{
        deleteCustomer(id);
        confirmDoalog.remove();
        document.body.classList.remove("overlay");
    })
};

function createConfirmCancelBtn(confirmButtons, confirmDoalog){
    const confirmCancelBtn = document.createElement("button");
    confirmCancelBtn.classList.add("confirm_cancel", "blue_btn");
    confirmCancelBtn.textContent="Cancel";
    confirmButtons.appendChild(confirmCancelBtn);
    confirmCancelBtn.addEventListener("click", ()=>{
        confirmDoalog.remove();
        document.body.classList.remove("overlay");
    })
};

function deleteCustomer(id){
        customersArray = customersArray.filter(customer => customer.id != id);
        displayCustomers();
        localStorage.setItem("customers", JSON.stringify(customersArray));
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
    document.querySelector(".pop_up_status").value = accountStatus;
    document.querySelector(".pop_up_currency").value = currency;
}

function updateCustomer(idToUpdate, popUpForm){
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
    closePopUp(popUpForm)
}

function updateActiveCustomersNumbers(){
    document.querySelector(".active_customers_number").textContent = filteredArray.filter(customer => customer.status === "active").length;
    document.querySelector(".all_customers_number").textContent = filteredArray.length;
}

function checkIfLastCustomerOdd(){
    if(filteredArray.length %2 !== 0){
        document.querySelector(".footer").style.backgroundColor = "#F4F7FC";
    }else{
        document.querySelector(".footer").style.backgroundColor = "#FFFFFF";
      }
}

function displayMessage(){
    const tr = document.createElement("tr");
    document.querySelector("tbody").appendChild(tr);
    const td = document.createElement("td");
    td.setAttribute("colspan", "8");
    td.className="message";
    td.textContent ="No data to show!"
    tr.appendChild(td);
}
