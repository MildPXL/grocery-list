// Get elements
const createBtn = document.querySelector('.create-btn');
const newListModal = document.getElementById('newListModal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const doneBtn = document.getElementById('doneBtn');
const modalInput = document.querySelector('.modal-input');
const headerText = document.querySelector(".header-text");
const breadcrumb = document.querySelector('.breadcrumb');
const contentText2 = document.querySelector('.content-text2');
const contentText = document.querySelector('.content-text');

// Add product modal
const addProductModal = document.getElementById('addProductModal');
const closeProductModal = document.getElementById('closeProductModal');
const saveProductBtn = document.getElementById('saveProductBtn');
const productList = document.getElementById("productList");

// State to track what mode the button is in
let isAddingList = true;

// ---- MODAL FUNCTIONS ----
function openModal(modal) {
  modal.classList.add('active');
}
function closeModalFunction(modal) {
  modal.classList.remove('active');
}

// ---- CREATE NEW LIST ----
createBtn.addEventListener('click', () => {
  if (isAddingList) {
    // Open New List modal
    openModal(newListModal);
    modalInput.value = '';
    modalInput.style.borderColor = '';
  } else {
    // Open Add Product modal
    openModal(addProductModal);
  }
});

// ---- NEW LIST MODAL ----
closeModal.addEventListener('click', () => closeModalFunction(newListModal));
cancelBtn.addEventListener('click', () => closeModalFunction(newListModal));
newListModal.addEventListener('click', (e) => {
  if (e.target === newListModal) closeModalFunction(newListModal);
});

doneBtn.addEventListener('click', () => {
  const folderName = modalInput.value.trim();

  if (folderName) {
    // Update header and breadcrumb
    headerText.textContent = folderName;
    breadcrumb.innerHTML = `
      <span class="breadcrumb-item">Home</span> /
      <span class="breadcrumb-item active">Shopping List</span> /
      <span class="breadcrumb-item">Folders</span>
    `;

    // Change texts
    contentText.textContent = "What do you need to buy?";
    contentText2.textContent = "Start adding them to your list!";

    // Change button text and behavior
    createBtn.innerHTML = `
      <img src="Images/plus icon.svg" alt="plus icon">
      Add product
    `;
    isAddingList = false; // next click will open Add Product modal

    closeModalFunction(newListModal);
  } else {
    modalInput.style.borderColor = 'red';
  }
});

// ---- ADD PRODUCT MODAL ----
closeProductModal.addEventListener('click', () => closeModalFunction(addProductModal));
addProductModal.addEventListener('click', (e) => {
  if (e.target === addProductModal) closeModalFunction(addProductModal);
});

saveProductBtn.addEventListener('click', () => {
  const name = document.querySelector('.product-name').value.trim();
  const quantity = document.querySelector('.product-quantity').value.trim();
  const description = document.querySelector('.product-description').value.trim();

  if (name && quantity) {
    console.log("Saved product:", { name, quantity, description });
    closeModalFunction(addProductModal);
    // optional: clear inputs after saving
    document.querySelector('.product-name').value = '';
    document.querySelector('.product-quantity').value = '';
    document.querySelector('.product-description').value = '';
  } else {
    alert("Please enter item name and quantity!");
  }
});

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");

// --- ADD PRODUCT FUNCTION ---
function addProduct(name, quantity, description) {
  const productItem = document.createElement("div");
  productItem.classList.add("product-item");

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");

  // Product details
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");

  const productName = document.createElement("p");
  productName.classList.add("product-name");
  productName.textContent = quantity ? `${name} (${quantity})` : name;

  const productDesc = document.createElement("p");
  productDesc.classList.add("product-desc");
  productDesc.textContent = description;

  productDetails.appendChild(productName);
  if (description) productDetails.appendChild(productDesc);

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = `<img src="Images/delete.svg" alt="delete icon" />`;

  // Append to item
  productItem.appendChild(checkbox);
  productItem.appendChild(productDetails);
  productItem.appendChild(deleteBtn);

  // Add to list
  productList.appendChild(productItem);

  // --- EVENT: MARK COMPLETED ---
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      productItem.classList.add("completed");
    } else {
      productItem.classList.remove("completed");
    }
  });

  // --- EVENT: DELETE ---
  deleteBtn.addEventListener("click", () => {
    productItem.remove();
  });
}