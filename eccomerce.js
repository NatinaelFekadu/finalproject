function toggleButtonDisplay(){
    const toggleButton=document.getElementById("toggle-button");
    const navBar=document.getElementsByClassName("item-4")[0]
    const navBar2=document.getElementsByClassName("item-3")[0]
    if (navBar){
    toggleButton.addEventListener("click",()=>{
    navBar.classList.toggle("active");
    })
    }
    else if(navBar2){
    toggleButton.addEventListener("click",()=>{
    navBar2.classList.toggle("active");
    })

}
}
const search=document.getElementById('filter');
function productSearch(){
    search.addEventListener('input',filterList);
}
function filterList(){
    const filter=search.value.toLowerCase();
    const productNames=document.querySelectorAll('.detail__name');
    productNames.forEach((item) =>{
        let text=item.textContent;
        if(text.toLocaleLowerCase().includes(filter.toLocaleLowerCase())){
            item.parentElement.parentElement.style.display='';
        }else{
            item.parentElement.parentElement.style.display='none';
        }
    })

}


var data=[{
    model:"phone1",
    price:91,
    incart:0
    },
    {
    model:"laptop1",
    price:2499,
    incart:0   
    },
    {
    model:"watch1",
    price:39,
    incart:0
    },
    {
    model:"watch2",
    price:28,
    incart:0
    },
    {
    model:"laptop2",
    price:1331,
    incart:0   
    },
    {
    model:"earbud1",
    price:19,
    incart:0
    },
    {
    model:"watch3",
    price:61,
    incart:0
    },
    {
    model:"laptop3",
    price:980,
    incart:0   
    },
    {
    model:"phone2",
    price:999,
    incart:0
    },
    {
    model:"laptop4",
    price:729,
    incart:0
    },
    {
    model:"laptop5",
    price:699,
    incart:0   
    },
    {
    model:"laptop6",
    price:1530,
    incart:0
    }
]
let items=localStorage.getItem('dataItems');
if(items == null){
    localStorage.setItem('dataItems',JSON.stringify(data));
}
let carts=document.querySelectorAll('.btn');
    let cartItems=localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
for(let i=0; i < carts.length; i++){
    carts[i].addEventListener("click",()=>{
        let items=localStorage.getItem('dataItems');
        items=JSON.parse(items);
        if(items[i].incart > 0){
            alert("product already in cart");    
        }else{
        setItems(data[i]),
        totalPrice(data[i])
        items[i].incart+=1;
        localStorage.setItem('dataItems',JSON.stringify(items));
        }
    })
}
function setItems(product){
    let cartItems=localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
    if(cartItems != null){
        if(cartItems[product.model] == undefined){
            cartItems={
                ...cartItems,
                [product.model]:product
            }
        }
        cartItems[product.model].incart+=1;
    }
    else{
        product.incart=1;
        cartItems={
            [product.model]:product
        }
    }
        localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}
function totalPrice(product){
    let cartCost=localStorage.getItem('totalCost');
    if(cartCost != null){
        cartCost=parseInt(cartCost);
        localStorage.setItem('totalCost',cartCost + product.price)
    }
    else{
        localStorage.setItem('totalCost',product.price);
    }

}

function displayCart(){
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);    
    let productContainer=document.querySelector('.products-container');
    let subTotal=document.querySelector('#sub-total');
    let cartCost=localStorage.getItem('totalCost');
    cartCost=parseInt(cartCost);
    if(cartItems && productContainer){
      Object.values(cartItems).map(item=>{
          productContainer.innerHTML+=`<tr class="added"><td class='new-data w-50'>
          <img class='product-img p-md-3 img-fluid' src="src/images/${item.model}.jpg" alt='${item.model}' style=': 100%;
          height: 100%;'></td>
          <td class='new-data'>
          <label for="${item.model}" name='${item.model}' hidden>value</label>
          <input class='new-value form-control mt-md-5' type='number' min=0 value=${item.incart} id="${item.model}" oninput="updateItems(),onLoad(data)">
          </td>
          <td class="chg p-md-5">${item.incart * item.price}.00</td>
          </tr>`;
         
      });
      subTotal.textContent+='$'+cartCost+'.00'  
    }  
}
function updateItems(){
    let inputs = document.querySelectorAll(".new-value");
    let totalPrice= document.querySelectorAll(".chg");
    let subTotal=document.querySelector('#sub-total');
    let subtotal=0;
    for(let i=0; i < inputs.length; i++){
        for(let j=0; j<data.length;j++){
            if(data[j].model==inputs[i].id){
                const price=data[j].price;
                totalPrice[i].textContent=inputs[i].value * price+".00";
                }
            else{
                continue;
            }
        }
    }
    for(let i=0;i<totalPrice.length;i++){
        subtotal+=parseInt(totalPrice[i].textContent);
    }
    subTotal.textContent='sub total: $'+subtotal+'.00';
    localStorage.setItem("totalCost",subtotal);
}
function onLoad(products){
    let inputs = document.querySelectorAll(".new-value");
    let cartItems=localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
    for(let i=0;i<inputs.length;i++){
        for(let j=0; j<data.length;j++){
            if(products[j].model == inputs[i].id){
               cartItems[products[j].model].incart=inputs[i].value;
            }else{
                continue;
            }
        }
        localStorage.setItem("productsInCart",JSON.stringify(cartItems));
    }
}


function setError(element, message){
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.input-field__error');

    errorDisplay.innerText = message;
    element.classList.add('is-invalid');
    element.classList.remove('is-valid')
}

function setSuccess(element){
    const inputControl= element.parentElement;
    const errorDisplay = inputControl.querySelector('.input-field__error');

    errorDisplay.innerText = '';
    element.classList.add('is-valid');
    element.classList.remove('is-invalid');
};

function contactFormValidator(){
    const username = document.querySelectorAll('.form-control')[0];
    const email = document.querySelectorAll('.form-control')[1];
    const phone =document.querySelectorAll('.form-control')[2];
    const message = document.querySelectorAll('.form-control')[3];
    var contactButton=document.getElementById('contact-button');
    var successCounter=0;
 contactButton.addEventListener('click', e => {
    e.preventDefault();

    validateInputs();
    successCounter=0;
    });



const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const validateInputs = () => {
    var nameValue = username.value;
    var emailValue = email.value;
    var phoneValue = phone.value;
    var messageValue = message.value;

    if(nameValue === '') {
        setError(username, 'Username is required');
    }else {
        setSuccess(username);
        successCounter+=1;
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
        successCounter+=1;
    }

    if(phoneValue === '') {
        setError(phone, 'Provide your phone number');
    }else {
        phoneValue=parseInt(phoneValue);
        if(phoneValue){
            setSuccess(phone);
            successCounter+=1;
        }else{
            setError(phone,"provide valid phone number");
        }
    }

    if(messageValue === '') {
        setError(message, 'Please enter your message');
    } else {
        setSuccess(message);
        successCounter+=1;
    }
    if(successCounter >= 4){
        const response=document.querySelector('.form__response');
        response.textContent=`Response recorded, we will try
        to reach your concern as soon as possible`;
        response.style.fontSize="30px";

    }
   


};
}
function orderFormValidator(){
    const submit=document.getElementById("submit-button");
    const firstName = document.querySelectorAll('.form-control')[0];
    const lastName= document.querySelectorAll('.form-control')[1];
    const email =  document.querySelectorAll('.form-control')[2];
    const phone =  document.querySelectorAll('.form-control')[3];
    const deliveryDate= document.querySelectorAll('.form-control')[4];
    const convinientTime= document.querySelectorAll('.form-control')[5];
    const address= document.querySelectorAll('.form-control')[7];
    const card= document.querySelectorAll('.form-control')[8];
    var orderSuccessCounter=0;
submit.addEventListener('click', e => {
    e.preventDefault();

    validateInputs();
    orderSuccessCounter=0;
});

const isValidEmail = email => {
    const format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return format.test(String(email).toLowerCase());
}
const validateInputs = () => {
const firstNameValue = firstName.value;
const lastNameValue = lastName.value;
const emailValue = email.value;
var phoneValue = phone.value;
const deliveryDateValue=deliveryDate.value;
const convinientTimeValue=convinientTime.value;
const addressValue=address.value;
const confirmation=document.getElementsByClassName('information__confirmation')[0]
var cardValue=card.value;
 if(firstNameValue === '') {
        setError(firstName, 'firstname is required');
    } else {
        setSuccess(firstName);
        orderSuccessCounter+=1
    }
     if(lastNameValue === '') {
        setError(lastName, 'lastname is required');
    } else {
        setSuccess(lastName);
        orderSuccessCounter+=1
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
        orderSuccessCounter+=1
    }

    if(phoneValue === '') {
        setError(phone, 'Provide your phone number');
    }else {
        phoneValue=parseInt(phoneValue);
        if(phoneValue){
            setSuccess(phone);
            orderSuccessCounter+=1;
        }else{
            setError(phone,"provide a valid phone number");
        }
    }
     if(deliveryDateValue === '') {
        setError(deliveryDate, 'delivery date is required');
    } else {
        setSuccess(deliveryDate);
            orderSuccessCounter+=1
    }
     if(convinientTimeValue === '') {
        setError(convinientTime, 'delivery time is required');
    } else {
        setSuccess(convinientTime);
        orderSuccessCounter+=1
    }
     if(addressValue === '') {
        setError(address, 'address is required');
    } else {
        setSuccess(address);
        orderSuccessCounter+=1
    }
    if(cardValue === '' ){
        setError(card,'please enter your credit card number')
    }else {
        cardValue=parseInt(cardValue);
        if(cardValue){
            setSuccess(card);
            orderSuccessCounter+=1;
        }else{
            setError(card,"provide a valid credit card number");
        }
    }
    if(orderSuccessCounter >= 8){
        confirmation.textContent=`Your order is being shipped thank you for 
        buying with us`;
        confirmation.style.fontSize="30px";
        localStorage.removeItem("productsInCart");
        localStorage.removeItem("totalCost");
        localStorage.removeItem('dataItems');
        orderSuccessCounter=0;
    }
}
}
function showFaqAnswer(){
    const faqAnswer=[
    "Usualy it takes up to 30 minutes, but depends on your address.",
    "Currently payment can be made using credit card only.",
    "The price shown in home page for each product is a final price.",
    "Yes, we are planning to provide other products as well.",
    "You can only cancel your order before the payment is done. "]
    const answer=document.getElementsByClassName('question-list__answer');
    const faqButton=document.getElementsByClassName('display');
    for(let i=0;i<answer.length;i++){
        faqButton[i].addEventListener('click',()=>{
            answer[i].textContent=faqAnswer[i]
        }
        )
    }
}
function placeOrder(){
    const orderButton=document.getElementById('order-button');
    if(cartItems == null){
        orderButton.disabled=true;
    }else{
        orderButton.disabled=false;
    }

}

function load(){
    try {
        displayCart();
    } catch{}
    try {
        contactFormValidator();
    } catch {}
    try {
        orderFormValidator();
    } catch{}
    try {
        productSearch();
    } catch{}
    try {
        showFaqAnswer();
    } catch{}
     try {
        placeOrder();
    } catch{}
    backTop();
    toggleButtonDisplay();
}
function backTop(){
    const scrollTop=document.querySelector('.top');
    scrollTop.addEventListener('click',()=>{
        window.scrollTo(0,0);
    })
}

load();
