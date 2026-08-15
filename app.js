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


function increase(product) {

    if (cart[product] !== undefined) {
        cart[product]++;
        updateDisplay();
    }

}


function decrease(product) {

    if (cart[product] !== undefined && cart[product] > 0) {
        cart[product]--;
        updateDisplay();
    }

}


function updateDisplay() {

    let total = 0;

    document.getElementById("qty-bakso_urat").innerText =
        cart.bakso_urat;

    document.getElementById("qty-bakso_telur").innerText =
        cart.bakso_telur;

    document.getElementById("qty-mie_ayam").innerText =
        cart.mie_ayam;


    let html = "";


    for (const key in cart) {

        const quantity = cart[key];

        if (quantity > 0) {

            const product = products[key];

            const subtotal =
                product.price * quantity;

            total += subtotal;


            html += `
                <div class="cart-row">
                    <span>
                        ${product.name} × ${quantity}
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


function checkout() {

    let orderItems = [];
    let total = 0;


    for (const key in cart) {

        const quantity = cart[key];

        if (quantity > 0) {

            const product = products[key];

            orderItems.push({
                product: product.name,
                quantity: quantity,
                price: product.price
            });

            total += product.price * quantity;

        }

    }


    if (orderItems.length === 0) {

        tg.showAlert(
            "Keranjang masih kosong!"
        );

        return;

    }


    const order = {

        type: "bakso_order",

        items: orderItems,

        total: total

    };


    tg.sendData(
        JSON.stringify(order)
    );

}

window.increase = increase;
window.decrease = decrease;
window.checkout = checkout;