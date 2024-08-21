'use strict'

// #region Data
let userData = [ 
  {
    "username": "mai",
    "phone": "0546478963",
    "address": "Ha Asif 5 Haifa",
    "email": "maigalili@gmail.com",
    "freeTaxt": ""
  },
  {
    "username": "aviel",
    "phone": "0527570051",
    "address": "Herzil 33 Akko",
    "email": "avielmalka7@gmail.com",
    "freeTaxt" : ""
  },
  {
    "username": "neta",
    "phone": "0526134829",
    "address": "Herzil 50 Akko",
    "email": "Neta@gmail.com",
    "freeTaxt" : ""
  },
  {
    "username": "ori",
    "phone": "0545830820",
    "address": "Hess 34 Haifa",
    "email": "ori_g_inal@yahoo.com",
    "freeTaxt" : ""
  },
  {
    "username": "daniel",
    "phone": "0527570052",
    "address": "Brazil 55 Tel-Aviv",
    "email": "daniel@gmail.com",
    "freeTaxt" : ""
  }
];
// #endregion data


// #region variables and function callouts

const phonelist = document.getElementById("phonelist");
const reporter = document.createElement("p")

rendar(userData);
createPopUp();
createSlider()
chaneBackground()
createActionsSection()
search()

// #endregion variables and function callouts


// #region popup initialization

// #region create popup
// Create new Pop Up and append all 
function createPopUp()
{
  const form = document.createElement("form")
  form.onsubmit = (e) => {
        e.preventDefault(); // Prevent the form from submitting
  };
  const popUp = document.createElement("div")
  popUp.classList.add("modal")
  popUp.id = "myModal"
  popUp.onclick = (e) => {
    closeModal(e)
  }
  form.append(popUp)
  const container = document.createElement("div")
  
  container.classList.add("modal-content")
  const data = [{ "type": "text", "id": "inputUserName" },
    { "type": "phone", "id": "inputUserPhone" },
    { "type": "text", "id": "inputUserAddress" },
    { "type": "text", "id": "inputUserEmail" },
    { "type": "text", "id": "inputUserFreeText" }]
    
  attachItems(container, data)
  popUp.append(container)

  const main = document.querySelector(".main")
  main.append(popUp)

  return popUp
}

//פונקצייה אורכת לפי אירוע שקורה
function editPopUp(h2Title, buttonTitle)
{
  const h2 = document.querySelector(".popUpTitle")
  const button = document.querySelector(".actionButton")

  h2.textContent = h2Title
  button.textContent = buttonTitle
}

// create Button and title and append to popup
function attachItems(container, inputData)
{
  const closeButton = document.createElement("button")
  closeButton.classList.add("close-btn")
  closeButton.id = "closeModalBtn"

  // close popup
  closeButton.onclick = (e) => {
    closeModal(e)
  }
  closeButton.textContent = 'x';
  container.append(closeButton)

  const h2 = document.createElement("h2")
  h2.classList.add("popUpTitle")
  container.append(h2)

  const p = document.createElement("p")
  container.append(p)
  
  // create and add input fields to container.
  inputData.forEach((element) => {
    const inputField = document.createElement("input")
    inputField.type = element.type
    inputField.id = element.id
    container.append(inputField)
  })

  const actionButton = document.createElement("button")
  actionButton.classList.add("actionButton")
  actionButton.id = "getinput"
  container.append(actionButton)
}
// #endregion create popup

// #region open popup
// פונקצייה להצג מידה בפופאפ
 function openPupUp (indLi, action)  // action = add / edit / review
 {
  console.log(action)
  const button = document.querySelector(".actionButton")
  const popup = document.getElementById( 'myModal' );
  if (action == 'review')
  {
    
      editPopUp("Review contact", "review")
      button.style.display = "none"
      syncInputFields(true)
      let data = userData[indLi];
      popup.querySelector( "#inputUserName" ).value = data.username || "Empty field";
      popup.querySelector( "#inputUserPhone" ).value = data.phone || "Empty field ";
      popup.querySelector( "#inputUserAddress" ).value = data.address || "Empty field"
      popup.querySelector( "#inputUserEmail" ).value = data.email || "Empty field";
      popup.querySelector( "#inputUserFreeText" ).value = data.freeTaxt || "Empty field";
  }
  else { // add or edit.
      button.style.display = "inline-block"
      syncInputFields(false)
    // add callback
    if (action == 'add')
     {
       syncButton(newAdd, "Add User")
       setupPopUpInputFields(["*Add Name", "*Add Phone", "Add Address", "Add Email", "Add Free Text"]) // clear fields
       editPopUp("Add Contact", "Add") // 
     }
      // edit callback
    if (action == 'edit')
     {
      modifyInputFields(userData[indLi])
       editPopUp("Edit Contact", "Edit")
       syncButton(() => Edit(indLi), "Edit")    
       popup.querySelector( "#inputUserName" ).value = userData[indLi].username
       popup.querySelector( "#inputUserPhone" ).value = userData[indLi].phone
       popup.querySelector( "#inputUserAddress" ).value = userData[indLi].address 
       popup.querySelector( "#inputUserEmail" ).value = userData[indLi].email
       popup.querySelector( "#inputUserFreeText" ).value = userData[indLi].freeTaxt 
     }
   }

    popup.style.display = 'flex';
   // for add , no need to apply values.
}

function modifyInputFields(data)
{
  const popup = document.getElementById( 'myModal' );
  popup.querySelector( "#inputUserAddress" ).value = data.address || ""
  popup.querySelector( "#inputUserEmail" ).value = data.email || "";
  popup.querySelector( "#inputUserFreeText" ).value = data.freeTaxt || "";
}


// change the button onetime for the edit and onetime for add
function syncButton(callback, text)
{
  const actionButton = document.querySelector(".actionButton")


  // Remove the previous event listener, if it exists
  if (actionButton.currentCallback) {
        actionButton.removeEventListener('click', actionButton.currentCallback);
  }

    // Add the new event listener
    actionButton.addEventListener('click', callback);

    // Store the reference to the current callback for future removal
    actionButton.currentCallback = callback;

    // Change the text content of the button
    actionButton.textContent = text;
}


// #endregion open popup

//  callback for each element in  popup for reviewing a contact
function handlePopUp(e, index, action)
{
  if(e.target == e.currentTarget)
  {
    openPupUp(index, action)
  }
}


// clear all the input form to popup and  put place holders
function setupPopUpInputFields(placeHolders)
{
  const popUp = document.getElementById( 'myModal' );
  const inputs = popUp.querySelectorAll("input");
  
  // clear fields
  inputs.forEach((el) => {
    el.value = ""
  })

  // put place holders.
  for (let i = 0; i < placeHolders.length; i++)
  {
    inputs[i].placeholder = placeHolders[i]
  }
  
}
  

// פונקצייה הסוגרת פופאפ
function closeModal ( event ) 
{
  if ( event.target === document.getElementById( 'myModal' ) || event.target === document.getElementById( 'closeModalBtn' )) {
    document.getElementById( 'myModal' ).style.display = 'none';
  }
}

// #endregion popup initialization


// #region contact list creation
  // פונקצייה מייצרת את כול הרשומות לםי מידע שבמערך
function rendar(data)
{ 
    data.sort((a,b)=>a.username.localeCompare(b.username))
    phonelist.innerHTML = "";
    changePosition()
    data.forEach( ( elem, ind ) => {
        const item = document.createElement( 'li' );
        item.className = "item";
        item.innerHTML = `
            <img class ="actionImage" src="./img/profile.png" alt="Contact 1" class="contact-img">
            <div class="contact-info">
                <span class="name">${elem.username}</span> <span class="name">${elem.phone}</span>
            </div>
            <div class="buttons">
                <button class="actionImage" onclick ="openPupUp(${ind}, 'edit')"><img src="./img/edit.png"></button>
                <button class="actionImage" onclick ="remove(${ind})"><img src="./img/delete.png"></button>
            </div>
                  `;    
                  
        item.onmouseover = (e) => {e.currentTarget.style.backgroundColor = "lightblue";}
        item.onmouseout = (e) => {e.currentTarget.style.backgroundColor = "#f9f9f9";}
        item.addEventListener('click', (e) => {
        handlePopUp(e, ind, "review")
        })      
        phonelist.append( item );
    } ); 
}
// #endregion contact list creation


// #region popup actions
//פונקצייה המוחקת משטמש מי המערך
function remove(ind)
{
  if(confirm("Are you sure you want to delete?"))
  {
    userData.splice(ind,1)
    rendar(userData);
    const popup = document.getElementById( 'myModal' );
    popup.style.display = 'none';
    if(userData.length == 0)
    {
      phonelist.innerHTML = "No contacts found! :("
    }
  }
}

  //פונקצייה עורכת רשומה במערך
function Edit(index)
{
  let result = confirm("Are you sure you want to edit?", "Yes", "No")

  if(result)
  {
    const d =document;
    const newName = d.querySelector( "#inputUserName" ).value;
    const popup = document.getElementById('myModal');

    let userNameValue = popup.querySelector("#inputUserName").value
    
    if (!userNameValue || !validatePhoneNumber())
    {
      alert("Both name and phone number needs to be correct. error: in 1 or more.")
      return;
    }
    else
    { // edit values.
      userData[index].username = popup.querySelector( "#inputUserName" ).value;
      userData[index].phone = popup.querySelector( "#inputUserPhone" ).value;
      userData[index].address = popup.querySelector( "#inputUserAddress" ).value ;
      userData[index].email = popup.querySelector( "#inputUserEmail" ).value;
      userData[index].freeTaxt = popup.querySelector("#inputUserFreeText").value;
      rendar(userData); 
    }
  }
  document.getElementById( 'myModal' ).style.display = 'none';

}

// פונקצייה מוסיפה למערך רשומה חדשה
function newAdd()
{
  const popup = document.getElementById( 'ModalAdd' );
  const newName = document.querySelector( "#inputUserName" ).value;
  if(!validatePhoneNumber())
  {
    alert("Phonenumber needs to be 10 digits only")
    return ; 
  }
  const checkPhone = document.querySelector("#inputUserPhone").value;
  const checkName = document.querySelector("#inputUserName").value;


  const check = userData.find(x=>x.username == newName)
  if(!check && checkPhone != "" && checkName != ""){
    userData.push({username:document.querySelector( "#inputUserName" ).value,
    phone:document.querySelector( "#inputUserPhone" ).value,
    address:document.querySelector( "#inputUserAddress" ).value,
    email:document.querySelector( "#inputUserEmail" ).value,
    freeTaxt:document.querySelector("#inputUserFreeText").value});
    rendar(userData);
    document.getElementById( 'myModal' ).style.display = 'none';
  }
  else
  if(check)
  {
    alert("name is allreade exist")
  }
  else
    alert("one of the followeng is not correct");
}

// פונקצייה המחפש את השם שנרשם ומציגה אותו במסך 

function search()
{
  const input = document.getElementById("search");

  input.oninput = ((e) =>{
    console.log(e.target.value) // Emanuel
    const data = userData.filter((el) => el.username.includes(e.target.value))
    rendar(data)
  });

}

//פונקצייה המוחקת את כול הרשומות מי מערך
function deleteAll()
{
  let result = confirm("Are you sure you want to delete?")

  if(!result)
    return;

    userData = []
    rendar(userData)
    phonelist.innerHTML = "No contacts found! :("
}

// #endregion popup actions


// #region general setup
function syncInputFields(disable)
{
  const popUp = document.querySelector(".modal")
  const inputs = popUp.querySelectorAll("input")

  inputs.forEach((input) => {
    input.disabled = disable
  })
}




// check if number have 10 digits only 
function validatePhoneNumber() {
  const phoneNumberInput = document.getElementById('inputUserPhone').value;

  // Check if the input contains only numbers and has a length of 10
  return /^\d{10}$/.test(phoneNumberInput);
}

// #endregion general setup


// #region general styling
// פונקצייה בודקת את מיקום הכתב
function changePosition()
{
  const align = userData.length == 0 ? "center" : "left"
  phonelist.style.textAlign = align
}

// פונקצייה המשנה את צבע של הרקע ומזירה אותו לצבע המקורי בלחיצה שנייה
function chaneBackground()
{
  const slider = document.querySelector("#colorSlider")

  slider.addEventListener("input", (e) => {
    if (e.target.value < 10)
    {
      document.body.style.backgroundColor  = "#fff"
    }
    else
    {
      document.body.style.backgroundColor = createColor()
    }
    
  })

}

// create a slider surprise and set range
function createSlider()
{
  const section = document.querySelector("section")
  const title = document.createElement("h2")

  title.style.fontSize = "0.7rem"
  title.textContent = "Move slider for surprise"
  section.append(title)

  const slider = document.createElement("input")

  slider.type = "range"
  slider.min = 0
  slider.max = 100
  slider.value = 0
  slider.id = "colorSlider"

  section.append(slider)
}

// generate rgb color.
function createColor()
{
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  return `rgb(${r},${g},${b})`
}

// #endregion general styling

// #region Actions Section

// Create Header
function createActionsSection()
{
  const header = document.querySelector(".header");

  const h1 = document.createElement("h1");
  h1.textContent = "Phone Book";
  header.append(h1);

  const addButton = createAddButton();

  header.append(addButton);

  const searchInput = createSearchInput();
  header.append(searchInput);

  const deleteAllButton = createDeleteAllButton();
  header.append(deleteAllButton);

}

//Create Add Button
function createAddButton()
{
  const addButton = document.createElement("button");
  addButton.textContent = "Add new";

  addButton.addEventListener("click", () => {openPupUp(-1, 'add');})

  return addButton;
}

//Create SearchInput 
function createSearchInput()
{
  const searchInput = document.createElement("input")
  searchInput.type = "search"
  searchInput.id = "search"
  searchInput.placeholder = "search User"

  return searchInput;

}
// create Delete All Button
function createDeleteAllButton()
{
  const deleteAllButton = document.createElement("button");

  deleteAllButton.textContent = "Delete All"

  deleteAllButton.addEventListener("click", () => { deleteAll() })
  
  return deleteAllButton;
}
// #endregion Actions Section


