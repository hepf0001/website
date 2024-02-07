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

  if (produkt.discount) {
    console.log("Produkt", produkt);
    document.querySelector(".produkt_price").classList.add("line_trough");
    document.querySelector(".produkt_discount").classList.remove("hide");
    document.querySelector(".produkt_discount").textContent = `-${produkt.discount}%`;
    document.querySelector(".produkt_price_discount").classList.remove("hide");
    document.querySelector(".produkt_price_discount").textContent = `Ny pris: ${produkt.price} kr.`;
  }

  if (produkt.soldout) {
    console.log("Produkt", produkt);
    document.querySelector(".soldout").classList.remove("hide");
    document.querySelector(".produkt_image").classList.add("filter");
  }
}
