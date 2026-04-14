
const menuCategories = document.querySelectorAll(".menuBtns")
const staffBtn = document.querySelector("#staff");
const staffOverlay = document.getElementById("staff-overlay");
const staffCloseBtn = document.getElementById("closeBtn");
const usernameInput = document.querySelector("#usernameInput")
const passwordInput = document.querySelector("#passwordInput")
const overlayBtn = document.querySelector("#login-btn")

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

const loginData = {
    username: "SunsetRoaster",
    password: "124aBc"
}

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

staffBtn.addEventListener("click", ()=>{
    staffOverlay.classList.remove('hidden');
    console.log("Çalıştı")
    document.body.style.overflow = 'hidden';
})

staffCloseBtn.addEventListener("click", ()=>{
    staffOverlay.classList.add('hidden');
    console.log("Çalıştı")
    document.body.style.overflow = 'auto';
})

window.addEventListener("click", (e)=>{
    if(e.target === staffOverlay){
        staffOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
})

overlayBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    login(usernameInput.value.trim(),passwordInput.value.trim());
    
})

function login(username, password){
    if(username === loginData.username && password === loginData.password){
        loginCheck(true);
    }else{
        loginCheck(false);
    }
}

function loginCheck(sonuc){
    const loginCheckDiv = document.querySelector(".login-control")
    const div = document.createElement("div");
    if(sonuc===true){
        div.id = "successful"
        div.textContent = "Giriş Başarılı Yönlendiriliyorsunuz..."
        loginCheckDiv.append(div);
    }else{
        div.id = "err"
        div.textContent = "Kullanıcı Adınız veya Şifreniz Hatalı !"
        loginCheckDiv.append(div);
    }

    setTimeout(function(){
        div.remove();
    },3500);

}