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

const orderBtn = document.querySelector("#order-buton")
orderBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    console.log("Başarılı")
})

function siparisVer(urunAdi, fiyat) {
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