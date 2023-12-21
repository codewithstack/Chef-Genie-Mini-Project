const box = document.querySelector(".box");
const btn = document.querySelector(".searchbtn");
const search = document.querySelector(".search");
const back = document.querySelector(".searchback");
const ingredients = document.querySelector(".ingredients");
const icon = document.querySelector(".fa-magnifying-glass");
btn.addEventListener("click",()=>{
    search.classList.contains('active');
    ingredients.classList.contains('items-hide');
    if(search.classList.contains('active')){
        box.value = ''
    }
    else{
        search.classList.add('active');
        box.focus();
    }
    if(ingredients.classList.contains('items-hide')){
        box.value = ''
    }
    else{
        ingredients.classList.add('items-hide');
        box.focus();
    }
    icon.classList.remove('fa-beat');
      
    
});
back.addEventListener("click",()=>{
    box.value = '';
    search.classList.remove('active');
    ingredients.classList.remove('items-hide');
    if(!icon.classList.contains('fa-bounce')){
        icon.classList.add('fa-beat')
    }
});

