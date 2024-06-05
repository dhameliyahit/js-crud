var selectRow = null;

function showAlert(message,className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message))

    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div,main)

    setTimeout(()=>document.querySelector(".alert").remove(),3000)
}
//clear data
function clearFields(){
    document.querySelector("#name").value = "";
    document.querySelector("#address").value = "";
    document.querySelector("#mobileNo").value = "";
    document.querySelector("#age").value = "";
    document.querySelector("#country").value = "";
}

//add data
document.querySelector("#student-form").addEventListener("submit",(e)=>{
    e.preventDefault()
    const name = document.querySelector('#name').value;
    const address = document.querySelector('#address').value;
    const mobileNo = document.querySelector('#mobileNo').value;
    const age = document.querySelector('#age').value;
    const country = document.querySelector('#country').value;

    //vadiation
    
    if(name == "" || address==""|| mobileNo==""|| age==""|| country==""){
        showAlert("please Fill in All fields","danger");    
    }else if(isNaN(mobileNo)){
        showAlert("Enter only NUmeric value","danger")
    }else if(mobileNo.length>10 || mobileNo.length< 10){
        showAlert("enter only 10 digit","danger")
    }else{
        if(selectRow == null){
            const list =  document.querySelector('#student-list');
            const row = document.createElement("tr")

            row.innerHTML = `
                <td>${name}</td>
                <td>${address}</td>
                <td>${mobileNo}</td>
                <td>${age}</td>
                <td>${country}</td>
                <td>
                    <button href="#" id="updateBtn" class="btn btn-warning btn-sm edit">Edit</button>
                    <button href="#" class="btn btn-danger btn-sm delete">Delete</button>
                </td>
            `
            list.appendChild(row);
            selectRow = null;
            showAlert("Record Added","success");
        }
        else{
            selectRow.children[0].textContent =name;
            selectRow.children[1].textContent =address;
            selectRow.children[2].textContent =mobileNo;
            selectRow.children[3].textContent =age;
            selectRow.children[4].textContent =country;
            
            selectRow = null;
            showAlert("Record info Edited","info")
        }

        clearFields();
    }
})

//updated
document.querySelector("#student-list").addEventListener("click",(e)=>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectRow = target.parentElement.parentElement;
        document.querySelector("#name").value =  selectRow.children[0].textContent;
        document.querySelector("#address").value =  selectRow.children[1].textContent;
        document.querySelector("#mobileNo").value =  selectRow.children[2].textContent;
        document.querySelector("#age").value =  selectRow.children[3].textContent;
        document.querySelector("#country").value =  selectRow.children[4].textContent;
    }
})

//delete data
document.querySelector("#student-list").addEventListener("click",(e)=>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Record Data Deleted","danger");
    }
})

//mobile number varification


function validatePhoneNumber(phoneNumber) {
// Regular expression to check valid phone number
const pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

// If the phone number is empty return false
if (!phoneNumber) {
    return false;
}

// Return true if the phone number matches the regex
if (pattern.test(phoneNumber)) {
    console.log('vaild mobile number')
} else {
    showAlert("Enter Vaild Mobile Number","danger")
}
}