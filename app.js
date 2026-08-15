const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();


// ==============================
// PRODUK
// ==============================

const products = {

    bakso_urat: {
        name: "Bakso Urat",
        price: 4
    },

    bakso_telur: {
        name: "Bakso Telur",
        price: 4
    },

    mie_ayam: {
        name: "Mie Ayam",
        price: 3
    }

};


// ==============================
// CART
// ==============================

const cart = {

    bakso_urat: 0,
    bakso_telur: 0,
    mie_ayam: 0

};


// ==============================
// PAYMENT
// ==============================

let selectedPayment = null;


// ==============================
// TAMBAH
// ==============================

function increase(product) {

    cart[product]++;

    updateDisplay();

}


// ==============================
// KURANG
// ==============================

function decrease(product) {

    if (cart[product] > 0) {

        cart[product]--;

    }

    updateDisplay();

}


// ==============================
// UPDATE CART
// ==============================

function updateDisplay() {

    document.getElementById("qty-bakso_urat").innerText =
        cart.bakso_urat;

    document.getElementById("qty-bakso_telur").innerText =
        cart.bakso_telur;

    document.getElementById("qty-mie_ayam").innerText =
        cart.mie_ayam;


    let total = 0;

    let html = "";


    for (const key in cart) {

        if (cart[key] > 0) {

            const product = products[key];

            const subtotal =
                cart[key] * product.price;

            total += subtotal;


            html += `
                <div class="cart-row">

                    <span>
                        ${product.name} × ${cart[key]}
                    </span>

                    <strong>
                        $${subtotal}
                    </strong>

                </div>
            `;

        }

    }


    if (html === "") {

        html = `
            <p class="empty">
                Keranjang masih kosong
            </p>
        `;

    }


    document.getElementById("cart-items").innerHTML =
        html;


    document.getElementById("total").innerText =
        "$" + total;

}


// ==============================
// AMBIL DATA ORDER
// ==============================

function getOrderData() {

    let items = [];

    let total = 0;


    for (const key in cart) {

        if (cart[key] > 0) {

            const product = products[key];


            items.push({

                product: product.name,

                quantity: cart[key],

                price: product.price

            });


            total +=
                cart[key] * product.price;

        }

    }


    return {
        items: items,
        total: total
    };

}


// ==============================
// LANJUT ORDER
// ==============================

function checkout() {

    const orderData =
        getOrderData();


    // Keranjang kosong

    if (orderData.items.length === 0) {

        alert("Pilih menu terlebih dahulu.");

        return;

    }


    // Tampilkan pembayaran

    const paymentSection =
        document.getElementById(
            "payment-section"
        );


    paymentSection.style.display =
        "block";


    // Scroll ke pembayaran

    paymentSection.scrollIntoView({
        behavior: "smooth"
    });

}


// ==============================
// PILIH PEMBAYARAN
// ==============================

function selectPayment(payment) {

    selectedPayment =
        payment;


    document
        .querySelectorAll(".payment-option")
        .forEach(function(button) {

            button.classList.remove(
                "selected"
            );

        });


    const selectedButton =
        document.querySelector(
            `[data-payment="${payment}"]`
        );


    if (selectedButton) {

        selectedButton.classList.add(
            "selected"
        );

    }


    console.log(
        "Metode pembayaran:",
        selectedPayment
    );

}


// ==============================
// KONFIRMASI ORDER
// ==============================

function confirmOrder() {

    const orderData =
        getOrderData();


    if (orderData.items.length === 0) {

        alert(
            "Keranjang masih kosong."
        );

        return;

    }


    if (!selectedPayment) {

        alert(
            "Silakan pilih metode pembayaran."
        );

        return;

    }


    const order = {

        type: "bakso_order",

        items: orderData.items,

        total: orderData.total,

        payment: selectedPayment

    };


    console.log(
        "DATA ORDER:",
        JSON.stringify(order)
    );


    // Kirim ke Telegram Bot

    if (
        typeof tg.sendData === "function"
    ) {

        tg.sendData(
            JSON.stringify(order)
        );

    } else {

        console.error(
            "Telegram WebApp sendData tidak tersedia"
        );

    }

}


// ==============================
// SAAT HALAMAN SELESAI
// ==============================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "Mini App siap"
        );


        const checkoutButton =
            document.getElementById(
                "checkout-button"
            );


        const confirmButton =
            document.getElementById(
                "confirm-order"
            );


        if (checkoutButton) {

            checkoutButton.addEventListener(
                "click",
                checkout
            );

        }


        if (confirmButton) {

            confirmButton.addEventListener(
                "click",
                confirmOrder
            );

        }


        // Tombol pembayaran

        document
            .querySelectorAll(
                ".payment-option"
            )
            .forEach(function(button) {

                button.addEventListener(
                    "click",
                    function() {

                        const payment =
                            this.dataset.payment;

                        selectPayment(
                            payment
                        );

                    }
                );

            });


        updateDisplay();

    }
);


// ==============================
// GLOBAL
// ==============================

window.increase =
    increase;

window.decrease =
    decrease;