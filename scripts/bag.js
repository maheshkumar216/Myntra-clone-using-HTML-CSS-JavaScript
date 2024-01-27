const CONVENIENCE_FEES = 99;
let bagItemObjects;
onLoad();

function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
}
function displayBagSummary() {
  let bagSummaryElement = document.querySelector(".bag-summary");
  let totalItem = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItemObjects.forEach((bagItem) => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

  bagSummaryElement.innerHTML = `
    <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">₹${totalMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">₹99</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">₹${finalPayment}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>
  `;
}

function loadBagItemObjects() {
  console.log(bagItems);
  bagItemObjects = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
}

function displayBagItems() {
  let containerElement = document.querySelector(".bag-item-container");
  let inner_html = "";
  bagItemObjects.forEach((bagItems) => {
    inner_html += generateItemHtml(bagItems);
  });
  containerElement.innerHTML = inner_html;
}
function removeFromBag(itemId) {
  bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagCount();
  displayBagItems();
  displayBagSummary();
}

function generateItemHtml(item) {
  return `<div class="left-part">
  <img src="${item.image}" alt="item image" class="bag-item-image" />
</div>

<div class="right-part">
  <div class="${item.company}">ADIDAS</div>
  <div class="product-name">${item.item_name}</div>
  <div class="price-container">
    <span class="current-price">Rs ${item.current_price}</span>
    <span class="original-price">Rs ${item.original_price}</span>
    <span class="discount">(${item.discount_percentage}% OFF)</span>
  </div>
  <div class="return-policy">>${item.return_period} days return available</div>
  <div class="delivery-details">
    <span class="delivery-by-text">delivery by</span>
    <span class="delievery-date">${item.delivery_date}</span>
  </div>
  <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
  </div>`;
}