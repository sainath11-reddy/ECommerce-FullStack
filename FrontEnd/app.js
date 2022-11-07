let music_content = document.getElementById('EcommerceContainer');
let cart_element = document.querySelector('.header .cart-holder');
let body = document.querySelector('body');
let musicDivision = document.getElementById('music-content');
let merchDivision = document.getElementById('merch-content');
let pageButtonDOM = document.querySelector('#EcommerceContainer .page-btn-section');
let cartItemsDiv = document.querySelector('#cartTab .cart-items');
let cartPageButtons = document.querySelector('#cartTab .page-btn-section');
let purchaseButton = document.querySelector('#cartTab .purchase-btn');
cart_element.addEventListener('click',showCart);
music_content.addEventListener('click',addToCart);

let currentPage = 1;
let currentCartPage = 1;
let pageButtons ;
let cart = new Map();
    
function addToCart(e){
    e.preventDefault();
    
    if(e.target.classList.contains('btn-cart')){
        const parent = e.target.parentElement.parentElement;
        console.log(parent)
        let div = document.createElement('div');
        let id = parseInt(parent.id);
        let price= String(e.target.parentElement.firstElementChild.innerHTML);
        let imgSrc = String(parent.children[1].firstElementChild.getAttribute('src'));
        let heading= parent.firstElementChild.innerHTML;
        let text = document.createTextNode(`Your product ${parent.firstElementChild.innerHTML} has been added`);
        // cart.set(id, {price:price,text:heading,img:imgSrc});

        axios.post('http://localhost:3000/cart',{productId: id, completed:false} ).then(res =>{
            console.log(res);
        })
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



async function showCart(e){
    e.preventDefault();
    let parentElement = cartItemsDiv.parentElement;
    // console.log(e);
    let total = 0;
    let innerHTML='';
    // let innerHTML = `<section id='cartTab'class='container' style='display:block'>
    // <h2>CART</h2>
    // <button class="cancel">X</button>
    // <div class="cart-row cart-header">
    // <span class="cart-item cart-column">ITEM</span>
    // <span class="cart-price cart-column">PRICE</span>
    // <span class="cart-quantity cart-column">QUANTITY</span>
    // </div>
    // <div class='cart-items'>`
    // console.log(cartItemsDiv);
    
    let cart = await axios.get(`http://localhost:3000/cart?page=${currentCartPage}`);
    console.log(cart.data);
    let page = cart.data.page;
    for(let item of cart.data.products){
        console.log(item[0])
        innerHTML +=`
        <div id='cart${item.id}' class="cart-row">
            <span class='cart-item cart-column'>
                <img class ='cart-img' src='${item.imgURL}' alt='lie'>
                 <span>${item.title}</span>
            </span>
            <span class='cart-price cart-column'>
                ${item.price}
            </span>
            <span class='cart-quantity cart-column'>
                <input type='text' id='quant' value='1'>
                <button class='remove-btn'>REMOVE</button>
            </span>
        </div>
        `;
        total = total+ parseFloat(item.price);
    }
    console.log(total.toFixed(2));

    // innerHTML +=`</div>
    //             <div class='cart-total'>
    //             <span>
    //             <span class='total-title'><strong>Total</strong></span>
    //             $<span id='total-value'>${total.toFixed(2)}</span>
    //             </span>
    //             </div>
    //             <div>
    //             <button class='purchase-btn'>Purchase</button>
    //             </div>
    //             </div>`
    cartItemsDiv.innerHTML=innerHTML;
    
    parentElement.children[4].firstElementChild.children[1].innerHTML =total.toFixed(2);
    // (document.createTextNode());
    let pageBtninnerHTML =`` ;
    if(cart.data.hasPreviouspage){
        pageBtninnerHTML = `<btn class='page-btn'>${page-1}</btn>'`
    }
    pageBtninnerHTML+=`<btn class='page-btn current'>${page}</btn>`
    if(cart.data.hasNextPage){
        pageBtninnerHTML+=`<btn class='page-btn'>${page+1}</btn>`
    }
    cartPageButtons.innerHTML=pageBtninnerHTML;
    parentElement.classList.remove('notNow');

}

document.addEventListener('DOMContentLoaded',IndexPage);

cartPageButtons.addEventListener('click', (e)=>{
    if(e.target.classList.contains('page-btn')){
        if(!e.target.classList.contains('current')){
            currentCartPage = e.target.firstChild.data;
            showCart(e);
        }
    }
})

function IndexPage(e){
    
    e.preventDefault();
    axios.get(`http://localhost:3000/admin/products?page=${currentPage}`).then(obj =>{
        console.log(currentPage);
        let page = +obj.data.page || 1;
        let musicInnerHTML = ``;
        let merchInnerHTML =``;
        musicDivision.parentElement.classList.add('notNow')
        merchDivision.parentElement.classList.add('notNow')
        for(let i of obj.data.products){
            let j =1;
            // console.log(i);
            if(i.title.indexOf('Album') !== -1){
                musicDivision.parentElement.classList.remove('notNow');
                musicInnerHTML +=  `<div id="${i.id}" class="album">
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
                merchDivision.parentElement.classList.remove('notNow');
                merchInnerHTML +=  `<div id="${i.id}" class="merch">
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
        musicDivision.innerHTML = musicInnerHTML;
        merchDivision.innerHTML = merchInnerHTML;
        pageButtons = ``
        if(obj.data.hasPrevious){
            pageButtons+= `<button class='page-btn'>${page-1}</button>`
        }
        pageButtons+=`<button class='page-btn current'  >${page}</button>`
        if(obj.data.hasNextPage){
            pageButtons+=`<button class='page-btn'>${page+1}</button>`;
        }
        pageButtonDOM.innerHTML = pageButtons;

    }).catch(err => console.log(currentPage));

}


pageButtonDOM.addEventListener('click',(e)=>{
    // e.preventDefault();
    if(e.target.classList.contains('page-btn')){
        currentPage = e.target.firstChild.data;
        console.log(e);
        IndexPage(e);

    }
})

purchaseButton.addEventListener('click',()=>{
    axios.get(`http://localhost:3000/orders`).then(res =>{
        if(res.data.success){
            console.log(res);
            let div = document.createElement('div');
            let text = document.createTextNode(`Your order placed successfully. Your orderID is ${res.data.orderid}`);
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

        else{
            let div = document.createElement('div');
            let text = document.createTextNode(` ${res.data.error}`);
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

