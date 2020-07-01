let cartArray = [];
let buildArray = [];

window.onload = function screen() {  
    //Runs when browser gets to it
    document.getElementById('bill').innerHTML ="jayakrishna";
   
    localStorage.setItem('buildArray', JSON.stringify(buildArray));
   buildArray = JSON.parse(localStorage.getItem('buildArray'));

  if (buildArray != null) {
    buildTable(buildArray);
  }
 };
 

//  this.document.write("jayakrishna");

let buildTable = (data) => {       //buildtable data
  let table = document.getElementById('shopTable');
  table.innerHTML = '';

  for (let i = 0; i < 10; i++) {     //loop limits to ten pagination
    let row = `<tr>
                        <td>${data[i].name}</td>
                        <td>${data[i].price}</td>
                        <td><input  type = "button"  value="Add" onclick = "clickAdd(${data[i].price}); cartAdd(this);" </td>
              </tr>`;
    table.innerHTML += row;
  }
}

let cart = [];

let cartAdd = element => {      //add items number function in cart section 
  let rows = element.parentNode.parentNode.rowIndex;
  let cols = element.parentNode.cellIndex;
  let product = document.getElementById('shopTable').rows[rows - 1].cells[cols - 2].innerHTML; //based on the row coloumn 
  let price = document.getElementById('shopTable').rows[rows - 1].cells[cols - 1].innerHTML;   //based on the row coloumn 

  if (cart[rows] !== 0 && cart[rows] !== undefined) {       //condition to check cart rows
    cart[rows]++;
  } else {
    cart[rows] = 1;
  }
  let cartObj = {                  
    product: product,
    cart: cart[rows],
    price: price
  };
  let flag = false,                                 
    index;

  for (let i in cartArray) {
    if (cartObj.product == cartArray[i].product) {   // check condition for same element addding again
      flag = true;
      index = i;
    }
  }
  if (flag == true) {
    cartArray[index].cart = cart[rows];    // already exist in cart 
  } else {
    cartArray.push(cartObj);              //push the element to cartArray
  }
  buildCartTable(cartArray);
};

function buildCartTable(obj) {    //buildtable for the cart section 
  let table = document.getElementById('cartTable');

  table.innerHTML = '';
  for (let i = 0; i < cartArray.length; i++) {    // based on cart length the loop based
    let row = `<tr>                               
                        <td>${obj[i].product}</td>
                        <td><input  type = "button" class = "plusAdd" value = "-" onclick = " clickSub(${obj[i].price},this);
                         countItemsRemove(this); cartRemove(this);"</td>
                        <td>${obj[i].cart}</td>
                        <td> <input  type = "button" class = "plusAdd" value = "+" onclick = " clickAdd(${obj[i].price});  cartAddtion(this);" </td>
                        <td></td>
              </tr>`;
    table.append += row;
  }
}

let cartAddtion = element => {       //add  items number function in cart in carttable 
  let rows = element.parentNode.parentNode.rowIndex;
  let cols = element.parentNode.cellIndex;

  if (
    cartArray[rows - 1].cart !== 0 &&
    cartArray[rows - 1].cart !== undefined &&
    cartArray[rows - 1].cart > 0) {

    cartArray[rows - 1].cart++;
  } else {
    cartArray[rows - 1].cart = 0;
  }
  let x = document.getElementById('cartTable').rows[rows - 1].cells[cols - 1];
  x.innerHTML = cartArray[rows - 1].cart;
};

let cartRemove = element => {       //remove  items number function in cart in carttable 
  let rows = element.parentNode.parentNode.rowIndex;
  let cols = element.parentNode.cellIndex;

  if (                                                //conditions to be satisfied to decrement in carttable
    cartArray[rows - 1].cart !== 0 &&
    cartArray[rows - 1].cart !== undefined &&
    cartArray[rows - 1].cart > 0) {
    cartArray[rows - 1].cart--;
  } else {  
    cartArray[rows - 1].cart = 0;
    cartArray.splice(rows - 1, 1);
    document.getElementById("cartTable").deleteRow(rows - 1);      //remove the added element if goes to zero count in cart
  }
  let x = document.getElementById('cartTable').rows[rows - 1].cells[cols + 1];
  x.innerHTML = cartArray[rows - 1].cart;
};

let prices = 0;

let clickAdd = price => {                // funtion for  adding price for each click
  prices = prices + price;
  document.getElementById('price').innerHTML = 'Total value is ' + prices;        //total prices is displayed
  countItemsAdd();                              //countitems add function is called
};

let clickSub = (price, element) => {       // funtion for subtracting price for each click
  let rows = element.parentNode.parentNode.rowIndex;
  let cols = element.parentNode.cellIndex;
  var x = document.getElementById('cartTable').rows[rows - 1].cells[cols + 1];
  try {                                     
    if (x.innerHTML > 0) {        //price value greater than zero (no negative)
      prices = prices - price;
      document.getElementById('price').innerHTML = 'Total value is ' + prices;
    } else {                             
      throw Error(" remove the item from table ");         //custom error creation 
    }
  } catch (err) {
    alert(err);                            //alert method 
  }
};

let j = 0;

let countItemsAdd = element => {       // add  total count of items
  j++;
  document.getElementById('count').innerHTML = 'Total Count of Items ' + j;
};

let countItemsRemove = element => {    // remove total count of items
  let rows = element.parentNode.parentNode.rowIndex;
  let cols = element.parentNode.cellIndex;
  var x = document.getElementById('cartTable').rows[rows - 1].cells[cols + 1];
  try {                                       //try catch for checking value decrementing below zero
    if (x.innerHTML > 0) {
      j--;
      document.getElementById('count').innerHTML = 'Total Count of Items ' + j;
    } else if (x.innerHTML == 0) {              
      throw Error(" Can't be  removed");
    }
  } catch (err) {
    console.log(err);    //console the err
  }
};

let gstTax = () => {                   //function for Final with gst Tax
  
    if(prices <= 0){
      alert('Cart Is Empty')
      } 
      else if (prices > 100 && prices < 500) {                //total above 100 and below 500 condition with tax
        prices = prices + 100;
        document.getElementById('gstAmount').innerHTML =
          'Final amount with GST ' + prices;
      } else if (prices < 100) {                              //total does not exceed hundred contion no tax
        document.getElementById('gstAmount').innerHTML =
          'Final amount with GST ' + prices;
      } else if (prices > 500 && prices < 1000) {             //total above 500 and below 1000 with tax
        prices = prices + 200;
        document.getElementById('gstAmount').innerHTML =
          'Final amount with GST ' + prices;
      } else if (prices > 1000) {                              //amount exceeds 1000 with tax
        prices = prices + 300;
        document.getElementById('gstAmount').innerHTML =
          'Final amount with GST ' + prices;
      }
    };

let disable = () => {                         // disable finalbill  after a click on the final
  document.getElementById('gstCal').disabled = true;
};

buildArray = JSON.parse(localStorage.getItem('buildArray'));

function addItem() {                          //pushing new item to table build array
  
  let name = document.getElementById('name').value;
  let price = document.getElementById('priceholder').value;
  let flag = true;
  buildArray = JSON.parse(localStorage.getItem('buildArray'));

  for (let i in buildArray) {       
    if (buildArray[i].name == name) {       //checking the same name in the field condtion
      flag = false;
      break;
    }
  }

  if (flag) {
     let item = {    //assign item 
      name: name,
      price: price,
      cart: 0
    };

    if (buildArray == null) {    //checking build array null 
      buildArray = [];
    }
    buildArray.push(item);       //push item to the buildarray
    localStorage.setItem('buildArray', JSON.stringify(buildArray));  // send the data in local storage in string format
    let table = document.getElementById('shopTable');
    table.innerHTML = '';
    buildTable(buildArray);      //buildtable buildarray
  } else {
    alert("Product already added");
  }
}


let index = 0;             //pagination part

function nextPage() {                 //For the next page in the build array
 
  index = index + 10;                     //index ten after checks 
  buildArray = JSON.parse(localStorage.getItem('buildArray'));        //buildaray  the items from localstorage get
  let itemsList = buildArray.slice(index, index + 10);
  buildTable(itemsList);
 }

function prevPage() {                //For the previous page in the build array

  index = index - 10;                 //index based operation
  buildArray = JSON.parse(localStorage.getItem('buildArray'));      //buildarray  the items from localstorage get
  let itemsList = buildArray.slice(index, index + 10);
  buildTable(itemsList);             //buildtable 

 }
