const returnBtn = document.querySelector("#getback");

returnBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    returnMain("index.html")
})

function returnMain(url){
    fetch(url)
        .then(response=>{
            if(!response.ok) throw new Error("Dosya bulunamadı!");
            return response.text();
        })
        .then(html=>{
            setTimeout(function(){
                document.querySelector("body").innerHTML = html;
            },2000);
        })
        .catch(err=>{
            console.log(err);
        })
}