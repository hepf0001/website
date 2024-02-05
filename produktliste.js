window.addEventListener("DOMContentLoaded", init);

const produktURL = "https://kea-alt-del.dk/t7/api/products?limit=50&start=10";
//const imagePath = `https://kea-alt-del.dk/t7/images/webp/640/${productid}.webp`;

let produktTemplate;
let produktContainer;

function init() {
  console.log("init");

  produktTemplate = document.querySelector(".produkt_template");
  console.log("produkt_template", produktTemplate);

  produktContainer = document.querySelector(".produkt_container");
  console.log("produkt_container", produktContainer);

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
    console.log("Produkt", produkt);
    produktClone = produktTemplate.cloneNode(true).content;

    produktClone.querySelector(".a").href = `produkt.html?id=${produkt.id}`;

    produktClone.querySelector(".produkt_image").src = `https://kea-alt-del.dk/t7/images/webp/640/${produkt.id}.webp`;
    produktClone.querySelector(".produkt_image").alt = `Picture of ${produkt.productdisplayname} `;

    produktClone.querySelector(".produkt_brandname").textContent = produkt.brandname;
    produktClone.querySelector(".produkt_productdisplayname").textContent = produkt.productdisplayname;
    produktClone.querySelector(".produkt_price").textContent = `Oprindelig pris: ${produkt.price} kr.`;

    produktClone.querySelector(".produkt_price_discount").textContent = ` ${produkt.price} kr.`;

    produktClone.querySelector(".produkt_discount").textContent = `-${produkt.discount}%`;

    produktContainer.appendChild(produktClone);
  });
}
