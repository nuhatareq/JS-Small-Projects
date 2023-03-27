// start game and remove the screen of the start game
let yourName ;
document.querySelector(".start-game span").onclick = function(){
    // enter the name of the player
    yourName = prompt("Enter your name");
    // check if the user enter a name or not 
    if (yourName === null || yourName === ""){
            document.querySelector(".info-container .name span").innerHTML = "Unknown";

    }
    else{
            document.querySelector(".info-container .name span").innerHTML = yourName;
    }
    // remove face screen and start the game
    document.querySelector(".start-game").remove();
}

// duration for every thing
let duration = 1000;

// get blocks into array
let allBlocks = document.querySelector(".blocks-container");
let arrOfBlocks = Array.from(allBlocks.children);

// get indexes to use them in shuffling 
let arrOfIndexs = [...arrOfBlocks.keys()];

//shuffle photos
shuffledPhotos(arrOfIndexs);

// what will happen for each click (the senario of the game)
arrOfBlocks.forEach((block , index) => {
    block.style.order = arrOfIndexs[index];
    block.addEventListener("click" , function(){
        addFlipped(block);
    })
})

// add flipp class to the block
function addFlipped(block){
    block.classList.add("is-flipped");
    let fliterdPhotos = arrOfBlocks.filter(blocks => blocks.classList.contains("is-flipped"));
    if (fliterdPhotos.length === 2){
        stopClicking();
        matchedPhotos(fliterdPhotos[0],fliterdPhotos[1]);
        for(let i=0; i< arrOfBlocks.length ;i++){
            if (arrOfBlocks[i].classList.contains("matched") && i === arrOfBlocks.length-1){
                let endGame = document.createElement("div");
                let endMsg = document.createElement('span');
                endGame.classList.add('end-screen');
                endMsg.innerHTML=`${yourName} you win the Game`;
                endGame.appendChild(endMsg);
                document.body.append(endGame);
            }
        }
    }
}

// stop the cusor for doing any thing till the duration end
function stopClicking(){
    allBlocks.classList.add("stop-clicking");
    setTimeout(() => {
        allBlocks.classList.remove("stop-clicking");
    }, duration);
}

// check if photos matches
function matchedPhotos(block1 , block2){
    // to increase number of wrong tries
   let tryElemet = document.querySelector(".tries span");

   // check using attr of data-photo value
   if(block1.dataset.photo === block2.dataset.photo){
// clear flipped to make it easy of checker to not confuse the compiler 
    block1.classList.remove("is-flipped");
    block2.classList.remove("is-flipped");
// add match class to set it not available to flip again
    block1.classList.add("matched");
    block2.classList.add("matched");
   }
   else {
    tryElemet.innerHTML = parseInt(tryElemet.innerHTML) + 1;
    // clear flipped to try another photos
    setTimeout(()=> {
      block1.classList.remove("is-flipped");
      block2.classList.remove("is-flipped");
  
    },duration)
   }
}

// shuffling arrays
function shuffledPhotos(arr){
    let current = arr.length , temp , random;
    while (current > 0){
        // generate random number in thr range of indexes so we * in current
        random = Math.floor(Math.random()*current);
        current--;
        //1)  save current elemnt in memory
        temp = arr[current];
        //2) replace the elemnt by random number
        arr[current]= arr[random];
        //3) but saved value at the random value matched (swaped numbers)
        arr[random] = temp;
    }
    return arr;
}

