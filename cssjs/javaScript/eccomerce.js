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
    price:500,
    incart:0
    },
    {
    model:"laptop1",
    price:1000,
    incart:0   
    },
    {
    model:"watch1",
    price:200,
    incart:0
    },
    {
    model:"watch2",
    price:300,
    incart:0
    },
    {
    model:"laptop2",
    price:400,
    incart:0   
    },
    {
    model:"earbud1",
    price:600,
    incart:0
    },
    {
    model:"watch3",
    price:700,
    incart:0
    },
    {
    model:"laptop3",
    price:800,
    incart:0   
    },
    {
    model:"phone2",
    price:900,
    incart:0
    },
    {
    model:"laptop4",
    price:1100,
    incart:0
    },
    {
    model:"laptop5",
    price:1200,
    incart:0   
    },
    {
    model:"laptop6",
    price:1300,
    incart:0
    }
]
let items=localStorage.getItem('dataItems');
if(items == null){
    localStorage.setItem('dataItems',JSON.stringify(data));
}
let carts=document.querySelectorAll('.to-cart');
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
    let subTotal=document.querySelector('#subtotal');
    let cartCost=localStorage.getItem('totalCost');
    cartCost=parseInt(cartCost);
    if(cartItems && productContainer){
      Object.values(cartItems).map(item=>{
          productContainer.innerHTML+=`<tr class="added"><td>
          <img src="./images/${item.model}.jpg" alt='${item.model}' style=' width: 100%;
          height: 100%;'></td>
          <td>
          <label for="${item.model}" name='${item.model}' hidden>value</label>
          <input type='number' min=0 value=${item.incart} id="${item.model}" class="inp" oninput="updateItems(),onLoad(data)"></td>
          <td class="chg" style="padding:20px">${item.incart * item.price}.00</td>
          </tr>`;
         
      });
      subTotal.textContent+='$'+cartCost+'.00'  
    }  
}
function updateItems(){
    let inputs = document.querySelectorAll(".inp");
    let totalPrice= document.querySelectorAll(".chg");
    let subTotal=document.querySelector('#subtotal');
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
    let inputs = document.querySelectorAll(".inp");
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
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

function setSuccess(element){
    const inputControl= element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

function contactFormValidator(){
    const form = document.getElementsByClassName('form')[0];
    const username = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});


const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const validateInputs = () => {
    const nameValue = username.value;
    const emailValue = email.value;
    const phoneValue = phone.value;
    const messageValue = message.value;

    if(nameValue === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(phoneValue === '') {
        setError(phone, 'Provide your phone number');
    }else {
        setSuccess(phone);
    }

    if(messageValue === '') {
        setError(message, 'Please enter your message');
    } else {
        setSuccess(message);
    }

};
}
function orderFormValidator(){
    const submit=document.getElementById("submit-button");
    const firstName = document.getElementById('firstname');
    const lastName= document.getElementById('lastname');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const deliveryDate=document.getElementById("date");
    const convinientTime=document.getElementById('time');
    const address=document.getElementById('address');
    const card=document.getElementById('card');
submit.addEventListener('click', e => {
    e.preventDefault();

    validateInputs();
});

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const validateInputs = () => {
const firstNameValue = firstName.value;
const lastNameValue = lastName.value;
const emailValue = email.value;
const phoneValue = phone.value;
const deliveryDateValue=deliveryDate.value;
const convinientTimeValue=convinientTime.value;
const addressValue=address.value;
const confirmation=document.getElementsByClassName('confirmation')[0]
const cardValue=card.value;
var successCounter=0;
 if(firstNameValue === '') {
        setError(firstName, 'firstname is required');
    } else {
        setSuccess(firstName);
        successCounter+=1
    }
     if(lastNameValue === '') {
        setError(lastName, 'lastname is required');
    } else {
        setSuccess(lastName);
        successCounter+=1
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
        successCounter+=1
    }

    if(phoneValue === '') {
        setError(phone, 'Provide your phone number');
    }else {
        setSuccess(phone);
        successCounter+=1
    }
     if(deliveryDateValue === '') {
        setError(deliveryDate, 'delivery date is required');
    } else {
        setSuccess(deliveryDate);
            successCounter+=1
    }
     if(convinientTimeValue === '') {
        setError(convinientTime, 'delivery time is required');
    } else {
        setSuccess(convinientTime);
        successCounter+=1
    }
     if(addressValue === '') {
        setError(address, 'address is required');
    } else {
        setSuccess(address);
        successCounter+=1
    }
    if(cardValue === '' ){
        setError(card,'please enter your credit card number')
    }else{
        setSuccess(card);
    }
    submit.addEventListener('click',()=>{
        if(successCounter == 7)
    confirmation.textContent=`Your order is being shipped thank you for 
    buying with us`;
    localStorage.removeItem("productsInCart");
    localStorage.removeItem("totalCost");
})
}
}
function showFaqAnswer(){
    const faqAnswer=["some answer1","some answer2","some answer3","some answer4","some answer5"]
    const answer=document.getElementsByClassName('answer');
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
}

load();
toggleButtonDisplay();