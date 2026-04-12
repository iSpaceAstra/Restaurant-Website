
const categoryMenu = document.querySelector("#menu");

categoryMenu.addEventListener("click", (e)=>{
    e.preventDefault();
})






function sayfaYukle(dosyaAdi) {
    // fetch ile dosyayı çağırıyoruz
    fetch(dosyaAdi)
        .then(response => {
            // Dosya bulundu mu kontrol et
            if (!response.ok) throw new Error("Dosya yüklenemedi!");
            return response.text(); // İçeriği metin (HTML) olarak al
        })
        .then(html => {
            // Gelen HTML içeriğini ana sayfadaki body alanına yerleştir
            document.getElementById('content-area').innerHTML = html;
        })
        .catch(error => {
            console.error("Hata:", error);
        });
}