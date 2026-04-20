
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
        html: "main-menus/appetizer.html"
    },
    {
        name: "hotstartersMenu",
        html: "main-menus/hotstarter.html"
    },
    {
        name: "maincourseMenu",
        html: "main-menus/maincourse.html"
    },
    {
        name: "sidedishesMenu",
        html: "main-menus/sidedish.html"
    },
    {
        name: "dessertsMenu",
        html: "main-menus/dessert.html"
    },
    {
        name: "drinksMenu",
        html: "main-menus/drink.html"
    }
]

const loginData = {
    username: "SunsetRoaster",
    password: "124aBc"
}

menuCategories.forEach(menu => {
    menu.addEventListener("click", function (e) {
        e.preventDefault();
        const selectedId = this.id;
        menus.forEach((menu) => {
            if (menu.name === selectedId) {
                const url = menu.html
                sayfaYukle(url);
            }
        })
    })
})


function sayfaYukle(dosyaAdi) {
    fetch(dosyaAdi)
        .then((response) => {
            if (!response.ok) throw new Error("Dosya yüklenemedi!");
            return response.text();
        })
        .then(html => {
            document.querySelector(".body-container").innerHTML = html;
        })
        .catch(err => {
            console.log(err);
        })
}

staffBtn.addEventListener("click", () => {
    staffOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
})

staffCloseBtn.addEventListener("click", () => {
    staffOverlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
})

window.addEventListener("click", (e) => {
    if (e.target === staffOverlay) {
        staffOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
})

overlayBtn.addEventListener("click", (e) => {
    e.preventDefault();
    login(usernameInput.value.trim(), passwordInput.value.trim());

})

function login(username, password) {
    if (username === loginData.username && password === loginData.password) {
        loginCheck(true);
    } else {
        loginCheck(false);
    }
}

function loginCheck(sonuc) {
    const div = document.querySelector(".notification")
    if (sonuc === true) {
        div.id = "successful"
        div.textContent = "Giriş Başarılı Yönlendiriliyorsunuz..."
        setTimeout(function () {
            goAdminisator("adminisatorpage.html")
        }, 3500)
    } else {
        div.id = "err"
        div.textContent = "Kullanıcı Adınız veya Şifreniz Hatalı!"
    }

    setTimeout(function () {
        div.remove();
    }, 7500);

}

function goAdminisator(url) {
    fetch(url)
        .then((response) => {
            if (!response.ok) throw new Error("Dosya yüklenemedi!");
            return response.text();
        })
        .then(html => {
            document.querySelector("body").innerHTML = html;
            
            if (!document.querySelector("script[src='admin.js']")) {
                 const adminScript = document.createElement("script");
                 adminScript.src = "admin.js";
                 document.body.appendChild(adminScript); // Dosyayı body'nin sonuna ekle ve çalıştır
                 document.body.style.overflow = 'auto';
             }

        })
        .catch((err) => {
            console.log(err);
        })
}

document.addEventListener("DOMContentLoaded", function() {
        const urlParams = new URLSearchParams(window.location.search);
        const masaNo = urlParams.get('masa');

        if (masaNo) {
            const displayElement = document.getElementById("tableId");
            if (displayElement) {
                displayElement.innerText = masaNo;
            }
        }
    });

