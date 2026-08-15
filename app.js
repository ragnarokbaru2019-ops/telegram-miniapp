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


// ================================
// TAMBAH PRODUK
// ================================

function increase(product) {

    cart[product] = cart[product] + 1;

    updateDisplay();

}


// ================================
// KURANGI PRODUK
// ================================

function decrease(product) {

    if (cart[product] > 0) {

        cart[product] = cart[product] - 1;

    }

    updateDisplay();

}


// ================================
// UPDATE TAMPILAN
// ================================

function updateDisplay() {

    document.getElementById("qty-bakso_urat").innerText =
        cart.bakso_urat;

    document.getElementById("qty-bakso_telur").innerText =
        cart.bakso_telur;

    document.getElementById("qty-mie_ayam").innerText =
        cart.mie_ayam;


    let total = 0;

    let html = "";


    // Bakso Urat
    if (cart.bakso_urat > 0) {

        let subtotal =
            cart.bakso_urat * products.bakso_urat.price;

        total = total + subtotal;

        html += `
            <div class="cart-row">
                <span>
                    Bakso Urat × ${cart.bakso_urat}
                </span>

                <strong>
                    $${subtotal}
                </strong>
            </div>
        `;

    }


    // Bakso Telur
    if (cart.bakso_telur > 0) {

        let subtotal =
            cart.bakso_telur * products.bakso_telur.price;

        total = total + subtotal;

        html += `
            <div class="cart-row">
                <span>
                    Bakso Telur × ${cart.bakso_telur}
                </span>

                <strong>
                    $${subtotal}
                </strong>
            </div>
        `;

    }


    // Mie Ayam
    if (cart.mie_ayam > 0) {

        let subtotal =
            cart.mie_ayam * products.mie_ayam.price;

        total = total + subtotal;

        html += `
            <div class="cart-row">
                <span>
                    Mie Ayam × ${cart.mie_ayam}
                </span>

                <strong>
                    $${subtotal}
                </strong>
            </div>
        `;

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


// ================================
// CHECKOUT
// ================================

function checkout() {

    let items = [];

    let total = 0;


    if (cart.bakso_urat > 0) {

        items.push({
            product: "Bakso Urat",
            quantity: cart.bakso_urat,
            price: 4
        });

        total = total + (cart.bakso_urat * 4);

    }


    if (cart.bakso_telur > 0) {

        items.push({
            product: "Bakso Telur",
            quantity: cart.bakso_telur,
            price: 4
        });

        total = total + (cart.bakso_telur * 4);

    }


    if (cart.mie_ayam > 0) {

        items.push({
            product: "Mie Ayam",
            quantity: cart.mie_ayam,
            price: 3
        });

        total = total + (cart.mie_ayam * 3);

    }


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


    tg.sendData(
        JSON.stringify(order)
    );

}


// ================================
// UNTUK onclick DI HTML
// ================================

window.increase = increase;
window.decrease = decrease;
window.checkout = checkout;

document
    .getElementById("checkout-button")
    .addEventListener("click", checkout);

// Jalankan pertama kali
updateDisplay();

