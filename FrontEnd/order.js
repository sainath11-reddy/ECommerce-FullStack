const ordersList = document.querySelector('#EcommerceContainer .orders-list')
document.addEventListener('DOMContentLoaded',(e)=>{
    axios.get('http://localhost:3000/orders-list').then(res =>{
        console.log(res.data)
        let innerHTML='';
        for(let obj of res.data){
            innerHTML +=`<div class='orders' id ='${obj.id}'>
                        <h3>Ordered on ${obj.products[0]['order-item'].createdAt}`;
            
            for(let prod of obj.products){
                innerHTML +=`<div class='products'>
                <span class='prod-container'>
                <img src='${prod.imageURL}' alt='lyt'>
                <span class='details'>
                <span class='order-title'>${prod.title}</span>
                <span class='price'>${prod.price}</span>
                </span>
                </span>
                
                </div>`
            }
                innerHTML +='</div>'
                
              
        }
        ordersList.innerHTML =innerHTML;
    })
})