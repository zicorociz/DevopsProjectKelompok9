  var productName = document.getElementById('productName');
  var productPrice = document.getElementById('productPrice');
  var productCategory = document.getElementById('productCategory');
  var productDescription = document.getElementById('productDescription');
  var myBody = document.getElementById('myBody');
  var myButton = document.getElementById('myButton');
  var searchInput = document.getElementById('searchInput');

  var productList ;  // 
  var updatedIndex ;
  if(localStorage.getItem("productList")){
    productList = JSON.parse(localStorage.getItem("productList"));
    displayProduct(productList);   



  }else{
    productList = [];
  }


  function getProduct () {
  if (myButton.innerHTML === "Add Product") {
       var product = {
      name: productName.value,
      price : productPrice.value,  
      category : productCategory.value,
      description: productDescription.value

      
   }

  productList.push(product); 
 
 
  } 
  else if(myButton.innerHTML === "Update Product"){ 
    productList[updatedIndex].name = productName.value;
    productList[updatedIndex].price = productPrice.value; 
    productList[updatedIndex].category = productCategory.value;
    productList[updatedIndex].description = productDescription.value;
     myButton.innerHTML = "Add Product"
    }
    saveToLocalStorage();
    displayProduct(productList);    
    clearInputs();


  
  }

  function displayProduct(pList) {
  var cartoona = "";
  for (var i = 0; i < pList.length; i++)
  {
       cartoona += `
      <tr >
        <td> ${i+1} </td>
        <td>${pList[i].name}</td>
        <td>${pList[i].price}</td>
        <td>${pList[i].category}</td> 
        <td>${pList[i].description}</td>
        <td class=""><button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
        <td class=""><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
      </tr>`;
      
  }
  myBody.innerHTML = cartoona ;
  }
 // function to clear inputs
  function clearInputs() {
    productName.value = "";
     productPrice.value = "";
     productCategory.value = "";
      productDescription.value = "";


  }


  // function to delete product

  function deleteProduct(index){
        productList.splice(index , 1);
        saveToLocalStorage();
       displayProduct(productList);
  }


 
 // function to save data in local storage
 function saveToLocalStorage() {
  localStorage.setItem("productList", JSON.stringify(productList));

  
 }
 
 function updateProduct(index) {
  updatedIndex = index;
  productName.value =  productList[index].name;
     productPrice.value = productList[index].price;
     productCategory.value = productList[index].category
      productDescription.value =  productList[index].description
      
   myButton.innerHTML = "Update Product" 
   }






   //function to search 
   function searchProduct( ) {
    var term = searchInput.value;
     var searchList = [];
   
     for ( var i = 0; i < productList.length; i++ ) {
      if(  
        (productList[i].name.toLowerCase().includes(term.toLowerCase()) ) 
      ||( productList[i].price.toLowerCase().includes(term.toLowerCase()))
      || ( productList[i].category.toLowerCase().includes(term.toLowerCase()))
      ||( productList[i].description.toLowerCase().includes(term.toLowerCase()))
        
        
        )
      
      
      
      {
        searchList.push(productList[i])

      }
    }
     displayProduct(searchList)
 
     }