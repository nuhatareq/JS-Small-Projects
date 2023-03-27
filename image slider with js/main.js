let imgs = Array.from(document.querySelectorAll(".imgs-container img"));
let slidCount = imgs.length;
let currentImg = 1;

// add slide number text 
let slideNumber = document.getElementById("slide-number");

let prevButton = document.getElementById("prev");
let nextButton = document.getElementById("next");
let bullets = document.getElementById('bullet');

prevButton.onclick = prevImg;
nextButton.onclick = nextImg;

// create bullets ul 
let theMainUl = document.createElement('ul');
 theMainUl.setAttribute('id' , 'get-ul');
 for (let i=0; i< slidCount ; i++){
    let liData = document.createElement('li');
    liData.setAttribute('data-index',i);
    liData.appendChild(document.createTextNode(i+1));
    theMainUl.appendChild(liData);
 }
bullets.appendChild(theMainUl);

// get ul 
let theUL = document.getElementById('get-ul');
let listOfLi = Array.from(document.querySelectorAll('#get-ul li'));
for(let i =0 ; i< listOfLi.length ;i++){
    listOfLi[i].onclick = function(){
        currentImg =  parseInt(this.getAttribute('data-index'));
        checker();
    }
}
checker();

function checker(){
    // set slide number
    slideNumber.textContent=`slide ${currentImg} of ${slidCount}`;
    removeActive();
    // set active class on current slide and bullet
    imgs[currentImg - 1].classList.add('active');
    listOfLi[currentImg - 1].classList.add('active');

    if (currentImg == 1){
        prevButton.classList.add('disable');
    } else{
        prevButton.classList.remove('disable');
    }

    if (currentImg == slidCount){
        nextButton.classList.add('disable');
    }  else {
        nextButton.classList.remove('disable');
    } 

}

// remove all active img and bullets
function removeActive(){
    imgs.forEach((img) => {
        img.classList.remove('active');
    })
    listOfLi.forEach((li) => {
        li.classList.remove('active');
    })
}
// get next img
function nextImg (){
    if(nextButton.classList.contains('disable')){
        return false;
    }
    else{
        currentImg++;
    }
       checker();
}
// get prev img
function prevImg (){
    if(prevButton.classList.contains('disable')){
        return false;
    }
    else{
        currentImg--;
    }
       checker();
}
