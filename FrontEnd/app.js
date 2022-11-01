let music_content = document.getElementById('EcommerceContainer');
let cart_element = document.querySelector('.header .cart-holder');
let body = document.querySelector('body');
let musicDivision = document.getElementById('music-content');
let merchDivision = document.getElementById('merch-content')
cart_element.addEventListener('click',showCart);
music_content.addEventListener('click',addToCart);

let cart = new Map();

function addToCart(e){
    e.preventDefault();
    
    if(e.target.classList.contains('btn-cart')){
        const parent = e.target.parentElement.parentElement;
        let div = document.createElement('div');
        let id = String(parent.id);
        let price= String(e.target.parentElement.firstElementChild.innerHTML);
        let imgSrc = String(parent.children[1].firstElementChild.getAttribute('src'));
        let heading= parent.firstElementChild.innerHTML;
        let text = document.createTextNode(`Your product ${parent.firstElementChild.innerHTML} has been added`);
        cart.set(id, {price:price,text:heading,img:imgSrc});
        // console.log(imgSrc)
        div.appendChild(text);
        div.style.position = 'fixed';
        div.style.bottom='0';
        div.style.right='0';
        // div.style.width='20%';
        div.style.fontSize='17px';
        div.style.fontWeight='bold';
        div.style.padding='30px 40px';
        div.style.backgroundColor = '#56CCF2';
        div.style.margin = '30px';
        div.style.borderRadius = '5px';       
        document.body.appendChild(div);
        setTimeout(()=>{div.style.display='none'},2000);


    }

}

function showCart(e){
    e.preventDefault();
    console.log(e);
    let total = 0;
    let innerHTML = `<section id='cartTab'class='container' style='display:block'>
    <h2>CART</h2>
    <button class="cancel">X</button>
    <div class="cart-row cart-header">
    <span class="cart-item cart-column">ITEM</span>
    <span class="cart-price cart-column">PRICE</span>
    <span class="cart-quantity cart-column">QUANTITY</span>
    </div>
    <div class='cart-items'>`
    console.log(cart);
    for(let item of cart){
        // console.log(item[0])
        innerHTML +=`
        <div id='cart${item[0]}' class="cart-row">
            <span class='cart-item cart-column'>
                <img class ='cart-img' src='${item[1].img}' alt='lie'>
                 <span>${item[1].text}</span>
            </span>
            <span class='cart-price cart-column'>
                ${item[1].price}
            </span>
            <span class='cart-quantity cart-column'>
                <input type='text' id='quant' value='1'>
                <button class='remove-btn'>REMOVE</button>
            </span>
        </div>
        `;
        console.log(parseFloat(item[1].price.slice(1)))
        total = total+ parseFloat(item[1].price.slice(1));
    }
    // console.log(total.toFixed(2))

    innerHTML +=`</div>
                <div class='cart-total'>
                <span>
                <span class='total-title'><strong>Total</strong></span>
                $<span id='total-value'>${total.toFixed(2)}</span>
                </span>
                </div>
                <div>
                <button class='purchase-btn'>Purchase</button>
                </div>
                </div>`
    body.innerHTML =body.innerHTML+innerHTML;

}

document.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();
    axios.get("http://localhost:3000/admin/products").then(obj =>{
        for(let i of obj.data){
            let j =1;
            console.log(i);
            if(i.title.indexOf('Album') !== -1){
                musicDivision.innerHTML +=  `<div id="${i.title}" class="album">
            <h2>${i.title}</h2>
            <div class="img-container">
                <img src="${i.imageURL}" alt="Lite teesko">
                
            </div>
            <div class="prod-details">
            <span class="price">$${i.price}</span>
            <button class="btn-cart">ADD TO CART</button>
            </div>
            
        </div>`
            }
            else{
                merchDivision.innerHTML +=  `<div id="merch${j++}" class="merch">
                <h2>${i.title}</h2>
                <div class="img-container">
                    <img class='img' src="${i.imageURL}" alt="Lite teesko">
                    
                </div>
                <div class="prod-details">
                <span class="price">$${i.price}</span>
                <button class="btn-cart">ADD TO CART</button>
                </div>
                
        </div>`
            }
            
        }
    });

})

/* <div id="album1" class="album">
                <h2>Album 1</h2>
                <div class="img-container">
                    <img src="https://prasadyash2411.github.io/ecom-website/img/Album%201.png" alt="Lite teesko">
                    
                </div>
                <div class="prod-details">
                <span class="price">$12.99</span>
                <button class="btn-cart">ADD TO CART</button>
                </div>
                
            </div> */