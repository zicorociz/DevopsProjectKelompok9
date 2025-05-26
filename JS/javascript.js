// Ambil elemen DOM
var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDescription = document.getElementById('productDescription');
var myBody = document.getElementById('myBody');
var myButton = document.getElementById('myButton');
var searchInput = document.getElementById('searchInput');

// Variable tanpa inisialisasi (bug potensial)
var productList;  
var updatedIndex;

// Local storage logic
if (localStorage.getItem("productList")) {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayProduct(productList);  
} else {
  productList = [];
}

// Fungsi utama untuk tambah/update produk
function getProduct() {
  if (myButton.innerHTML === "Add Product") {
    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDescription.value,
      // ❗️ Duplicate property to trigger warning
      name: "Duplicate" 
    };

    productList.push(product);
  } else if (myButton.innerHTML === "Update Product") {
    // ❗️ Tanpa pengecekan apakah updatedIndex valid
    productList[updatedIndex].name = productName.value;
    productList[updatedIndex].price = productPrice.value;
    productList[updatedIndex].category = productCategory.value;
    productList[updatedIndex].description = productDescription.value;
    myButton.innerHTML = "Add Product";
  }

  saveToLocalStorage();
  displayProduct(productList);
  clearInputs();
}

// Fungsi untuk menampilkan produk
function displayProduct(pList) {
  var cartoona = "";
  for (var i = 0; i < pList.length; i++) {
    // ❗️ Gunakan inline event handler (tidak direkomendasikan)
    cartoona += `
      <tr>
        <td> ${i+1} </td>
        <td>${pList[i].name}</td>
        <td>${pList[i].price}</td>
        <td>${pList[i].category}</td> 
        <td>${pList[i].description}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
      </tr>`;
  }

  myBody.innerHTML = cartoona;
}

// Fungsi clear input
function clearInputs() {
  // ❗️ Unused return value (tidak masalah tapi bisa dianggap code smell)
  return productName.value = productPrice.value = productCategory.value = productDescription.value = "";
}

// Fungsi hapus produk
function deleteProduct(index) {
  productList.splice(index, 1);
  saveToLocalStorage();
  displayProduct(productList);
}

// Simpan ke localStorage
function saveToLocalStorage() {
  // ❗️ Tidak ada error handling
  localStorage.setItem("productList", JSON.stringify(productList));
}

// Fungsi update produk
function updateProduct(index) {
  updatedIndex = index;
  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productCategory.value = productList[index].category;
  productDescription.value = productList[index].description;
  myButton.innerHTML = "Update Product";
}

// Fungsi pencarian
function searchProduct() {
  var term = searchInput.value;
  var searchList = [];

  for (var i = 0; i < productList.length; i++) {
    // ❗️ Tidak dicek null/undefined
    if (
      productList[i].name.toLowerCase().includes(term.toLowerCase()) ||
      productList[i].price.toLowerCase().includes(term.toLowerCase()) || // ❗️ Angka dipaksa pakai toLowerCase
      productList[i].category.toLowerCase().includes(term.toLowerCase()) ||
      productList[i].description.toLowerCase().includes(term.toLowerCase())
    ) {
      searchList.push(productList[i]);
    }
  }

  displayProduct(searchList);
}
