const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const url = `https://kea-alt-del.dk/t7/api/products/${id}`;

fetch("https://kea-alt-del.dk/t7/api/products/" + id)
  .then((Response) => Response.json())
  .then((data) => showProduct(data));

function showProduct(produkt) {
  console.log("produkt", produkt);
  document.querySelector(".produkt_image").src = `https://kea-alt-del.dk/t7/images/webp/640/${produkt.id}.webp`;
  document.querySelector(".produkt_image").alt = `Picture of ${produkt.productdisplayname} `;

  document.querySelector(".produkt_brandname").textContent = produkt.brandname;
  document.querySelector(".produkt_productdisplayname").textContent = produkt.productdisplayname;
  document.querySelector(".produkt_price").textContent = `Pris: ${produkt.price} kr.`;
  //document.querySelector(".produkt_description").textContent = produkt.productdisplayname;
}
