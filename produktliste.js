window.addEventListener("DOMContentLoaded", init);

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

const produktURL = "https://kea-alt-del.dk/t7/api/products?category=" + category;
//const imagePath = `https://kea-alt-del.dk/t7/images/webp/640/${productid}.webp`;

let produktTemplate;
let produktContainer;

function calculateDiscountedPrice(originalPrice, discountPercentage) {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = originalPrice - discountAmount;
  return discountedPrice.toFixed(2); // Runder til to decimaler
}

function init() {
  produktTemplate = document.querySelector(".produkt_template");

  produktContainer = document.querySelector(".produkt_container");

  fetch(produktURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      showProdukt(json);
    });
}

function showProdukt(produktJSON) {
  let produktClone;

  produktJSON.forEach((produkt) => {
    produktClone = produktTemplate.cloneNode(true).content;

    produktClone.querySelector("a").href = `produkt.html?id=${produkt.id}`;

    produktClone.querySelector(".produkt_image").src = `https://kea-alt-del.dk/t7/images/webp/640/${produkt.id}.webp`;
    produktClone.querySelector(".produkt_image").alt = `Picture of ${produkt.productdisplayname} `;

    produktClone.querySelector(".produkt_brandname").textContent = produkt.brandname;
    produktClone.querySelector(".produkt_productdisplayname").textContent = produkt.productdisplayname;

    produktClone.querySelector(".produkt_price").textContent = `Pris: ${produkt.price} kr.`;

    if (produkt.discount) {
      console.log("Produkt", produkt);
      produktClone.querySelector(".produkt_price").classList.add("line_trough");
      produktClone.querySelector(".produkt_discount").classList.remove("hide");
      produktClone.querySelector(".produkt_discount").textContent = `-${produkt.discount}%`;
      produktClone.querySelector(".produkt_price_discount").classList.remove("hide");
      //produktClone.querySelector(".produkt_price_discount").textContent = `Ny pris: ${produkt.price} kr.`;
      produktClone.querySelector(".produkt_price_discount").textContent = `Ny pris: ${calculateDiscountedPrice(produkt.price, produkt.discount)} kr.`;
    }

    if (produkt.soldout) {
      console.log("Produkt", produkt);
      produktClone.querySelector(".soldout").classList.remove("hide");
      produktClone.querySelector(".produkt_image").classList.add("filter");
    }

    produktContainer.appendChild(produktClone);
  });
}
