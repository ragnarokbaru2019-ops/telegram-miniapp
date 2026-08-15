const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();


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


const cart = {
    bakso_urat: 0,
    bakso_telur: 0,
    mie_ayam: 0
};


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
// CHECKOUT
// ==============================

function checkout() {

    console.log("CHECKOUT DIKLIK");

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


    console.log("ITEMS:", items);
    console.log("TOTAL:", total);


    if (items.length === 0) {

        tg.showAlert(
            "Keranjang masih kosong!"
        );

        return;

    }


    const order = {

        type: "bakso_order",

        items: items,

        total: total

    };


    console.log(
        "DATA ORDER:",
        JSON.stringify(order)
    );


    tg.sendData(
        JSON.stringify(order)
    );

}


// ==============================
// SAAT HALAMAN SELESAI
// ==============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Mini App siap"
        );


        const checkoutButton =
            document.getElementById(
                "checkout-button"
            );


        if (!checkoutButton) {

            console.error(
                "TOMBOL CHECKOUT TIDAK DITEMUKAN"
            );

            return;

        }


        checkoutButton.addEventListener(
            "click",
            function () {

                console.log(
                    "TOMBOL LANJUT ORDER DIKLIK"
                );

                checkout();

            }
        );


        updateDisplay();

    }
);


// Untuk tombol + / -
window.increase = increase;
window.decrease = decrease;