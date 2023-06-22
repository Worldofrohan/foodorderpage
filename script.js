 //alert("Welcome to Food express");
const btnCart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
cart.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
    });

document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
    loadContent();
}
function loadContent(){
    // REmove food items from cart
    let bntRemove=document.querySelectorAll('.cart-remove');
    bntRemove.forEach((btn)=> {
        btn.addEventListener('click',removeItem);
    });
    
    //Product Itemchange Event

    let qtyElements=document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input)=> {
        input.addEventListener('change',changeQty);
    });


//product Cart

let cartBtns=document.querySelectorAll('.add-cart');
cartBtns.forEach((btns)=> {
    btns.addEventListener('click',addCart);
});

 updateTotal();
}
//Remove Item
function removeItem(){
    if(confirm('Are you sure to Remove')){
    let title= this.parentElement.querySelector('.cart-food-title').innerHTML;
    itemList=itemList.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadContent();
    }
}

//change quantity
function changeQty(){
 if(isNaN(this.value) || this.value<1){
    this.value=1;
 }
 loadContent();
}

let itemList=[];


//Add cart
function addCart(){
 let food=this.parentElement;
 let title= food.querySelector('.food-title').innerHTML;
 let price= food.querySelector('.food-price').innerHTML;
 let imgsrc= food.querySelector('.food-image').src;

let newProduct={title,price,imgsrc}

//Check Product already exist in cart

if(itemList.find((el)=>el.title==newProduct.title))
{
    alert("Product already added in Cart");
    return;
}
else{
    itemList.push(newProduct);
}
let newProductElement= createCartProduct(title,price,imgsrc);
let element=document.createElement('div');
element.innerHTML=newProductElement;
let cartBasket=document.querySelector('.cart-content');
cartBasket.append(element);
loadContent();
}

function createCartProduct(title,price,imgsrc){

    return `
    <div class="cart-box">
    <img src= "${imgsrc}" class="cart-img">
    <div class="detail-box">
        <div class="cart-food-title">${title}</div>
        <div class="price-box">
            <div class="cart-price">${price}</div>
            <div class="cart-amt">${price}</div>
        </div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <ion-icon name="trash" class="cart-remove"></ion-icon>
        </div>
     `;   
}

function updateTotal()
{
    const cartItems=document.querySelectorAll('.cart-box');
    const totalValue=document.querySelector('.total-price');

    let total=0;

    cartItems.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
   let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
    let qty=product.querySelector('.cart-quantity').value;
    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="Rs."+(price*qty);

    }); 

    totalValue.innerHTML='RS.'+total;

    //Add Product Count in Cart Icon

    const cartCount=document.querySelector('.cart-count');
    let count=itemList.length;
    cartCount.innerHTML=count;

    if (count==0){
        cartCount.style.display='none';
    }
    else{
        cartCount.style.display='block';
    }

    }



