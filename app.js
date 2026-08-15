const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

document.querySelector(".masuk").addEventListener("click", function () {
    alert("Menu Pemasukan");
});

document.querySelector(".keluar").addEventListener("click", function () {
    alert("Menu Pengeluaran");
});