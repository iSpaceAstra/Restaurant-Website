
const menuCategories = document.querySelectorAll(".menuBtns")
    
const menus = [
    {
        name: "appetizersMenu",
        html: "appetizer.html"
    },
    {
        name: "hotstartersMenu",
        html: "hotstarter.html"
    },
    {
        name: "maincourseMenu",
        html: "maincourse.html"
    },
    {
        name: "sidedishesMenu",
        html: "sidedish.html"
    },
    {
        name: "dessertsMenu",
        html: "dessert.html"
    },
    {
        name: "drinksMenu",
        html: "drink.html"
    }
]

menuCategories.forEach(menu=>{
    menu.addEventListener("click", function(e){
        e.preventDefault();
        const selectedId = this.id;
        menus.forEach((menu)=>{
            if(menu.name === selectedId){
                const url = menu.html
                sayfaYukle(url);
            }
        })
    })
})


function sayfaYukle(dosyaAdi){
    fetch(dosyaAdi)
        .then((response)=>{
            if(!response.ok) throw new Error("Dosya yüklenemedi!");
            return response.text();
        })
        .then(html=>{
            document.querySelector(".body-container").innerHTML = html;
        })
        .catch(err=>{
            console.log(err);
        })
}
