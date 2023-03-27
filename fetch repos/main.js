let myInput = document.querySelector(".get_repos input");
let myButton = document.querySelector(".get_repos .get_button");
let myData = document.querySelector(".show_data");

myButton.onclick = function(){
    get_repos();
}
function get_repos(){
    if (myInput.value === ""){
        myData.innerHTML="<span>User Name can not be Empty , Please Retry GitHub User Name</span>";
    }
    else{
    fetch(`https://api.github.com/users/${myInput.value}/repos`).then((res) => res.json())
    .then((res)=>{
        myData.innerHTML='';
        res.forEach(repo => {
            // create repos name 
            let myDiv = document.createElement("div");
            let data = document.createTextNode(repo.name);
            myDiv.appendChild(data);

            // create visit link for every repo
            let repoLink = document.createElement('a');
            let linkText = document.createTextNode("Visit");
            repoLink.href =`https://github.com/${myInput.value}/${repo.name}`;
            repoLink.setAttribute("target" , "_blank");
            repoLink.appendChild(linkText);
            myDiv.appendChild(repoLink);

            // shows stars number foreach repo
            let stars = document.createElement("span");
            let starsText = document.createTextNode(`stars ${repo.stargazers_count}`);
            stars.appendChild(starsText);
            myDiv.appendChild(stars);
            
            // make name for repo div to get css styling freely
            myDiv.className ="repo-box";

            myData.appendChild(myDiv);

        });
        // return res;
    })

    }
}