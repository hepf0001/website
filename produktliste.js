window.addEventListener("DOMContentLoaded", init);

const produktURL = "https://kea-alt-del.dk/t7/api/products?limit=50&start=10";
//const imagePath = `https://kea-alt-del.dk/t7/images/webp/640/${productid}.webp`;

let produktTemplate;
let produktContainer;

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

    /*
    beerClone.querySelector(".beer_abv_data").textContent = beer.abv;
    */
    produktClone.querySelector(".produkt_price").textContent = `Pris: ${produkt.price} kr.`;

    /*
    if (beer.method.twist) {
      beerClone.querySelector(".beer_twist").classList.remove("hide");
      beerClone.querySelector(".beer_article").classList.add("twist");
    }
    */
    if (produkt.discount) {
      console.log("Produkt", produkt);
      produktClone.querySelector(".produkt_price").classList.add("line_trough");
      produktClone.querySelector(".produkt_discount").classList.remove("hide");
      produktClone.querySelector(".produkt_discount").textContent = `-${produkt.discount}%`;
      produktClone.querySelector(".produkt_price_discount").classList.remove("hide");
      produktClone.querySelector(".produkt_price_discount").textContent = `Ny pris: ${produkt.price} kr.`;
    }

    /*
    if (beer.abv >= 5.5) {
      beerClone.querySelector(".beer_strong").classList.remove("hide");
      beerClone.querySelector(".beer_article").classList.add("strong");
    } else if (beer.abv <= 4.4) {
      beerClone.querySelector(".beer_article").classList.add("mild");
    }
    */
    if (produkt.soldout) {
      console.log("Produkt", produkt);
      produktClone.querySelector(".soldout").classList.remove("hide");
    }

    produktContainer.appendChild(produktClone);
  });
}
