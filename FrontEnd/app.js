let music_content = document.getElementById('EcommerceContainer');

music_content.addEventListener('click',addToCart);

function addToCart(e){
    e.preventDefault();
    
    if(e.target.classList.contains('btn-cart')){
        const parent = e.target.parentElement.parentElement;
        let div = document.createElement('div');
        let text = document.createTextNode(`Your product ${parent.firstElementChild.innerHTML} has been added`);
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