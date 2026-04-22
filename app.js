
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBdRC-dzZz_5_JeQHcRAI271clt8o1SEA8",
    authDomain: "sunsetroasterrestaurant.firebaseapp.com",
    databaseURL: "https://sunsetroasterrestaurant-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "sunsetroasterrestaurant",
    storageBucket: "sunsetroasterrestaurant.firebasestorage.app",
    messagingSenderId: "642792854175",
    appId: "1:642792854175:web:8e79a568d3850b414c88aa"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const menuCategories = document.querySelectorAll(".menuBtns")
const staffBtn = document.querySelector("#staff");
const staffOverlay = document.getElementById("staff-overlay");
const staffCloseBtn = document.getElementById("closeBtn");
const usernameInput = document.querySelector("#usernameInput")
const passwordInput = document.querySelector("#passwordInput")
const overlayBtn = document.querySelector("#login-btn")
const tableBtn = document.querySelector("#tableEntranceBtn")
const orderBtn = document.querySelector(".order");

const menus = [
    {
        name: "appetizersMenu",
        html: "main-menus/appetizers.html"
    },
    {
        name: "hotstartersMenu",
        html: "main-menus/hotstarters.html"
    },
    {
        name: "maincourseMenu",
        html: "main-menus/maincourses.html"
    },
    {
        name: "sidedishesMenu",
        html: "main-menus/sidedishes.html"
    },
    {
        name: "dessertsMenu",
        html: "main-menus/desserts.html"
    },
    {
        name: "drinksMenu",
        html: "main-menus/drinks.html"
    }
]

const tableId = [
    {
        name: "1",
        id: "07128"
    },
    {
        name: "2",
        id: "07832"
    },
    {
        name: "3",
        id: "07943"
    },
    {
        name: "4",
        id: "07214"
    },
    {
        name: "5",
        id: "07487"
    },
    {
        name: "6",
        id: "07761"
    },
    {
        name: "7",
        id: "07329"
    },
    {
        name: "8",
        id: "07045"
    },
    {
        name: "9",
        id: "07639"
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

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const masaNo = urlParams.get('masa');
    // urlParams.get('masa')
    // document.body.style.overflow = 'hidden';

    if (masaNo) {
        const displayElement = document.getElementById("tableId");
        if (displayElement) {
            displayElement.innerText = "Masa-" + masaNo;
        }
    }
    tableBtn.addEventListener("click", (e) => {
        checkTable(masaNo)
    })
});

function checkTable(masaNo) {
    const tableInput = document.querySelector("#tableEntranceInput")
    const enteredId = tableInput.value.trim();
    const welcomeOverlay = document.querySelector(".welcome-overlay")
    tableId.forEach(table => {
        if (table.name == masaNo) {
            if (table.id === enteredId) {
                welcomeCheck(true);

                setTimeout(function () {
                    welcomeOverlay.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                }, 1100)
            } else {
                welcomeCheck(false);
            }
        }
    })

}

function welcomeCheck(sonuc) {
    const welcomeResult = document.querySelector(".welcomeResult")

    if (sonuc === true) {
        welcomeResult.id = "welcomeSuccessful";
        welcomeResult.textContent = "Masaya başarıyla giriş yapıldı!"

        setTimeout(function () {
            welcomeResult.id = "";
            welcomeResult.textContent = "";
        }, 4000)


    } else {
        welcomeResult.id = "welcomeUnsuccessful";
        welcomeResult.textContent = "Masa ID'si hatalı girildi!"

        setTimeout(function () {
            welcomeResult.id = "";
            welcomeResult.textContent = "";
        }, 3000)

    }
}

window.siparisVer = function(urunAdi, fiyat) {
    // 1. URL'den masa numarasını al (Örn: ?masa=5)
    const urlParams = new URLSearchParams(window.location.search);
    const masaNo = urlParams.get('masa') || "Masa Seçilmedi";

    // 2. Firebase'de 'aktif_siparisler' yoluna referans oluştur
    const siparislerRef = ref(database, 'aktif_siparisler');
    const yeniSiparisRef = push(siparislerRef); // Her siparişe benzersiz ID verir

    // 3. Veriyi gönder
    set(yeniSiparisRef, {
        masa: masaNo,
        urun: urunAdi,
        fiyat: fiyat,
        durum: "Hazırlanıyor",
        zaman: new Date().toLocaleString('tr-TR')
    })
    .then(() => {
        alert("Sipariş Alındı! Masa: " + masaNo + " Ürün: " + urunAdi);
    })
    .catch((error) => {
        console.error("Hata:", error);
    });
};

orderBtn.addEventListener("click", ()=>{
    fetch("orderpage.html")
        .then(response=>{
            if(!response.ok) throw new Error("Dosya yüklenemedi!")
            return response.text();
        })
        .then(html=>{
            document.querySelector(".body-container").innerHTML = html;

            if (!document.querySelector("script[src='order.js']")) {
                const orderScript = document.createElement("script");
                orderScript.src = "order.js";
                document.body.appendChild(orderScript); // Dosyayı body'nin sonuna ekle ve çalıştır
                document.body.style.overflow = 'auto';
            }
        })
        .catch(err=>{
            console.log(err);
        })
})

document.addEventListener("click", (event)=>{
    if(event.target.classList.contains('price-buy')){
        console.log("Çalışıyor")
    }   
})
