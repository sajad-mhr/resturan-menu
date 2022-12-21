let productData = [
  {
    id: 1,
    name: "پیتزای ویژه",
    image: "assets/images/pizza.png",
    price: 100000,
    categoryID: 1,
    description: ["گوشت 30%", "پنیر مازارلا"],
  },
  {
    id: 2,
    name: "قهوه ترک",
    image: "assets/images/Coffee.png",
    price: 30000,
    categoryID: 2,
  },
  {
    id: 3,
    name: "قهوه اسپرسو",
    image: "assets/images/Coffee.png",
    price: 30000,
    categoryID: 2,
  },
  {
    id: 4,
    name: "کاپوچینو",
    image: "assets/images/Coffee.png",
    price: 30000,
    categoryID: 2,
  },
  {
    id: 5,
    name: "کافه لاته",
    image: "assets/images/Coffee.png",
    price: 30000,
    categoryID: 2,
  },
  {
    id: 6,
    name: "پیتزا پپرونی",
    image: "assets/images/pizzaIMG.png",
    price: 120000,
    categoryID: 1,
  },
  {
    id: 7,
    name: "آیس کافی",
    image: "assets/images/Coffee.png",
    price: 40000,
    categoryID: 2,
  },
];

const categoresData = [
  { id: 0, category: "همه" },
  { id: 1, category: "پیتزا" },
  { id: 2, category: "نوشیدنی" },
];

let cart = [];
const $ = document;
const prodRight = $.querySelector(".prod-right");
const prodLeft = $.querySelector(".prod-left");
const productList = $.getElementById("product-list");
const CategoryBtn = $.querySelector(".category-btn");
const categores = $.querySelector(".categores");
const categoryItem = $.querySelector(".category-item");
const scrollDiv = $.querySelector(".scroll-div");
const priceCalcContainer = $.querySelector(".price-calc-container");
const totalPriceElem = $.getElementById("total-price");
const totalPriceCartElem = $.getElementById("total-price-cart");
const openCartBtn = $.getElementById("go-to-cart");
const overleyModal = $.querySelector(".overley");
const backBtn = $.querySelector(".back-btn");
const cartContainerModal = $.querySelector(".cart-container");
const form = $.getElementById("form");
const phoneNumberInput = $.getElementById("phone-number");
const successContainer = $.querySelector(".success-container");
const timer = $.querySelector(".time");
const overleyDetails = $.querySelector(".overley-details");
const title = $.getElementById("title");
const imageProd = $.getElementById("image-prod");
const description = $.getElementById("description");
const price = $.getElementById("price");
const detailsAddCart = $.querySelector(".details-add-cart");
const header = $.querySelector(".header");


function renderData(right, left, data) {
  data.forEach(function (item) {
    let product = `
    <div class="product-card">
    <div style="display:flex;flex-direction:column" onclick="openDetailsProduct(${
      item.id
    })">
    <span class="product-name">${item.name}</span>
    <img class="product-img" src="${item.image}" alt=""  />
    </div>
            <div class="add-to-card-container show" data-id=${item.id}>
              <button class="add-to-card" onclick="addToCart(${item.id})">
                <img src="./assets/icons/cartIcon.svg" alt="" />
              </button>
              <span class="price">${item.price.toLocaleString(
                "en-US"
              )} تومان</span>
            </div>
    </div>
    `;
    if (item.id % 2 == 0) {
      left.insertAdjacentHTML("beforeend", product);
    } else {
      right.insertAdjacentHTML("beforeend", product);
    }
  });
}

function renderCategory(catrgoryData, wrapper) {
  catrgoryData.forEach(function (item) {
    let element = `
    <span class="category-item" onclick="byCategories(${item.id})">${item.category}</span>
    `;
    wrapper.insertAdjacentHTML("beforeend", element);
  });
}
renderCategory(categoresData, categores);

function byCategories(categoryId) {
  prodLeft.innerHTML = "";
  prodRight.innerHTML = "";
  let filteredData = productData.filter(function (item) {
    return item.categoryID === categoryId;
  });
  categores.classList.remove("show");
  categores.classList.add("hidden");
  $.body.style.overflowY = "scroll";
  renderData(prodRight, prodLeft, filteredData);
  if (categoryId === 0) {
    renderData(prodRight, prodLeft, productData);
  }
}

function setToLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
// Get shopping cart in local storage
function getFromLocalStorage() {
  let getCart = JSON.parse(localStorage.getItem("cart"));
  if (getCart) {
    cart = getCart;
    priceCalculate(cart);
  } else {
    cart = [];
  }
  if (cart.length === 0) {
    closeCart();
    priceCalcContainer.classList.remove("show");
    priceCalcContainer.classList.add("hidden");
    productList.classList.remove("margining");
  }
  createCartItems(cart);
}

function openDetailsProduct(prodId) {
  description.innerHTML = "";
  detailsAddCart.innerHTML = "";
  let productFind = productData.find(function (item) {
    return item.id === prodId;
  });
  let desc = productFind.description;
  if (desc) {
    desc.forEach(function (item) {
      let liElem = `<li>${item}</li>`;
      description.insertAdjacentHTML("beforeend", liElem);
    });
  } else {
    description.innerHTML = "فاقد توضیحات";
  }
  title.innerHTML = productFind.name;
  price.innerHTML = productFind.price.toLocaleString("en-US") + " تومان ";
  imageProd.setAttribute("src", productFind.image);
  $.body.style.overflowY = "hidden";
  overleyDetails.classList.remove("hidden-overlay-details");
  overleyDetails.classList.add("show-overlay-details");
  let element = `
  <button class="details-add-cart-btn show" onclick="addToCartInDetails(${productFind.id})">
  <img src="./assets/icons/cartIcon.svg" alt="" />
</button>
<div class="details-counter hidden">
  <button onclick="increase(${productFind.id})"><span>+</span></button>
  <span class="quantity">1 عدد</span>
  <button onclick="decrease(${productFind.id})"><span>-</span></button>
</div>
  `;

  detailsAddCart.insertAdjacentHTML("beforeend", element);
  hasInCart(prodId, cart);
}

function hasInCart(prodId, cart) {
  let has = cart.some(function (item) {
    return item.id === prodId;
  });

  const detailsAddToCartBtn = $.querySelector(".details-add-cart-btn");
  const detailsCounter = $.querySelector(".details-counter");
  if (has) {
    detailsAddToCartBtn.className = "details-add-cart-btn hidden";
    detailsCounter.className = "details-counter show";
    const quantity = $.querySelector(".quantity");
    let finder = cart.find(function (item) {
      return item.id === prodId;
    });
    quantity.innerHTML = `${finder.productQty} عدد`;
  } else {
    detailsAddToCartBtn.className = "details-add-cart-btn show";
    detailsCounter.className = "details-counter hidden";
  }
}

function addToCartInDetails(prodId) {
  const detailsAddToCartBtn = $.querySelector(".details-add-cart-btn");
  const detailsCounter = $.querySelector(".details-counter");
  detailsAddToCartBtn.classList.remove("show");
  detailsAddToCartBtn.classList.add("hidden");
  detailsCounter.classList.remove("hidden");
  detailsCounter.classList.add("show");
  const quantity = $.querySelector(".quantity");
  quantity.innerHTML = "1 عدد";
  let findProduct = productData.filter(function (item) {
    return item.id === prodId;
  });
  findProduct.forEach(function (item) {
    let productObject = {
      id: item.id,
      productName: item.name,
      productImage: item.image,
      productPrice: item.price,
      productQty: 1,
    };
    cart.push(productObject);
  });

  setToLocalStorage(cart);
  priceCalculate(cart);
  createCartItems(cart);
}

function updateQuantity(qty, prodId) {
  const detailsAddToCartBtn = $.querySelector(".details-add-cart-btn");
  const detailsCounter = $.querySelector(".details-counter");
  const quantity = $.querySelector(".quantity");
  quantity.innerHTML = `${qty} عدد`;
  if (qty === 0) {
    detailsCounter.className = "details-counter hidden";
    detailsAddToCartBtn.className = "details-add-cart-btn show";
    removeProduct(prodId);
  }
}
function updateQuantity_2(qty, prodId) {
  const quantity = $.querySelector(".quantity_2");
  quantity.innerHTML = `${qty} عدد`;
  if (qty === 0) {
    removeProduct(prodId);
  }
 
}

function increase(prodId) {
  cart.forEach(function (item) {
    if (item.id === prodId) {
      item.productQty++;
      updateQuantity(item.productQty, prodId);
    }
  });
  setToLocalStorage(cart);
  priceCalculate(cart);
}

function decrease(prodId) {
  cart.forEach(function (item) {
    if (item.id === prodId) {
      item.productQty--;
      updateQuantity(item.productQty, prodId);
    }
  });
  setToLocalStorage(cart);
  priceCalculate(cart);
}

function increase_2(prodId) {
  cart.forEach(function (item) {
    if (item.id === prodId) {
      item.productQty++;
      updateQuantity_2(item.productQty, prodId);
    }
  });
  setToLocalStorage(cart);
  priceCalculateInCart(cart);
}

function decrease_2(prodId) {
  cart.forEach(function (item) {
    if (item.id === prodId) {
      item.productQty--;
      updateQuantity_2(item.productQty, prodId);
    }
  });
  setToLocalStorage(cart);
  priceCalculateInCart(cart);
}

CategoryBtn.addEventListener("click", function () {
  categores.classList.toggle("hidden");
  if (categores.className === "categores") {
    $.body.style.overflow = "hidden";
  } else {
    $.body.style.overflow = "scroll";
  }
});

function createCartItems(cart) {
  scrollDiv.innerHTML = "";
  cart.forEach(function (item) {
    let cartElem = `
    <div class="cart-item">
    <div class="image">
      <img src="${item.productImage}" alt="" />
      <div class="name-qty-container">
        <span>${item.productName}</span>
        <div class="qty-con-cart">
        <button onclick="increase_2(${item.id})"><span>+</span></button>
        <span class="quantity_2">${item.productQty} عدد</span>
        <button onclick="decrease_2(${
          item.id
        })"><span>-</span></button>
        </div>
      </div>
    </div>
    <div class="price-container">
      <span>${item.productPrice.toLocaleString("en-US")} تومان </span>
      <img onclick="removeProduct(${
        item.id
      })" style="filter: drop-shadow( 0 0 10px rgba(0, 0, 0, .7));" src="./assets/icons/trash3-fill.svg" alt="">
    </div>
  </div>
        `;
    scrollDiv.insertAdjacentHTML("beforeend", cartElem);
  });
}

function addToCart(prodId) {
  let findProduct = productData.filter(function (item) {
    return item.id === prodId;
  });

  let hasInCart = cart.some(function (item) {
    return item.id === prodId;
  });

  if (hasInCart) {
    cart.forEach(function (item) {
      if (item.id === prodId) {
        item.productQty++;
      }
    });
  } else {
    findProduct.forEach(function (item) {
      let productObject = {
        id: item.id,
        productName: item.name,
        productImage: item.image,
        productPrice: item.price,
        productQty: 1,
      };
      cart.push(productObject);
    });
  }
  setToLocalStorage(cart);
  priceCalculate(cart);
  createCartItems(cart);
}

function priceCalculate(cart) {
  priceCalcContainer.classList.remove("hidden");
  priceCalcContainer.classList.add("show");
  productList.classList.add("margining");
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].productPrice * cart[i].productQty;
  }
  totalPriceElem.innerHTML = total.toLocaleString("en-US") + " تومان ";
  totalPriceCartElem.innerHTML = total.toLocaleString("en-US") + " تومان ";
  if (cart.length === 0) {
    priceCalcContainer.classList.remove("show");
    priceCalcContainer.classList.add("hidden");
    productList.classList.remove("margining");
  }
  createCartItems(cart);
}
function priceCalculateInCart(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].productPrice * cart[i].productQty;
  }
  totalPriceCartElem.innerHTML = total.toLocaleString("en-US") + " تومان ";
  createCartItems(cart);
}

function openCart() {
  overleyModal.classList.remove("hidden-overlay");
  overleyModal.classList.add("show-overlay");
  cartContainerModal.classList.remove("hidden-modal");
  cartContainerModal.classList.add("show-modal");
  priceCalcContainer.classList.remove("show");
  priceCalcContainer.classList.add("hidden");
  productList.classList.remove("margining");
  window.scrollTo(0, 0);
  phoneNumberInput.focus();
  $.body.style.overflow = "hidden";
}
function closeCart() {
  overleyModal.classList.remove("show-overlay");
  overleyModal.classList.add("hidden-overlay");
  cartContainerModal.classList.remove("show-modal");
  cartContainerModal.classList.add("hidden-modal");
  priceCalcContainer.classList.remove("hidden");
  priceCalcContainer.classList.add("show");
  productList.classList.add("margining");
  phoneNumberInput.value = "";
  $.body.style.overflow = "scroll";
}

Number(phoneNumberInput.value);
function phoneNumberValid() {
  if (
    !phoneNumberInput.value.trim() ||
    phoneNumberInput.value.trim().length < 11 ||
    isNaN(phoneNumberInput.value.trim())
  ) {
    phoneNumberInput.style.border = "2px solid red";
  } else {
    phoneNumberInput.style.border = "2px solid green";
  }
}

function submitForm(event) {
  event.preventDefault();
  if (
    !phoneNumberInput.value.trim() ||
    phoneNumberInput.value.length < 11 ||
    isNaN(phoneNumberInput.value.trim())
  ) {
    phoneNumberInput.style.border = "2px solid red";
    phoneNumberInput.value = "";
  } else {
    console.log(phoneNumberInput.value);
    phoneNumberInput.style.border = "2px solid green";
    localStorage.removeItem("cart");
    phoneNumberInput.value = "";
    cartContainerModal.classList.remove("show-modal");
    cartContainerModal.classList.add("hidden-modal");
    successContainer.classList.remove("hidden");
    successContainer.classList.add("show");
    backBtn.style.display = "none";
    console.log(cart);
    if (cartContainerModal.className === "cart-container hidden-modal") {
      let timerCount = 10;
      timer.innerHTML = timerCount + " ثانیه";
      setInterval(function () {
        timer.innerHTML = --timerCount + " ثانیه";
        if (timerCount === 0) {
          window.location.reload();
        }
      }, 1000);
    }
  }
}

function removeProduct(prodId) {
  let getCart = JSON.parse(localStorage.getItem("cart"));
  cart = getCart;

  let findIndexProduct = cart.findIndex(function (prod) {
    return prod.id === prodId;
  });
  cart.splice(findIndexProduct, 1);
  setToLocalStorage(cart);
  createCartItems(cart);
  priceCalculate(cart);
  if (cart.length === 0) {
    closeCart();
    priceCalcContainer.classList.remove("show");
    priceCalcContainer.classList.add("hidden");
    productList.classList.remove("margining");
    localStorage.removeItem("cart");
  }
}

function changeQty(prodId) {
  let getCart = JSON.parse(localStorage.getItem("cart"));
  cart = getCart;
  cart.forEach(function (item) {
    if (item.id === prodId) {
      item.productQty++;
    }
  });
}
const detailsBackBtn = $.querySelector(".details-back-btn");
function backFromDetailsBtn() {
  overleyDetails.classList.remove("show-overlay-details");
  overleyDetails.classList.add("hidden-overlay-details");
  if (overleyDetails.className === "overley-details hidden-overlay-details") {
    $.body.style.overflowY = "scroll";
  }
}

renderData(prodRight, prodLeft, productData);
phoneNumberInput.addEventListener("keyup", phoneNumberValid);
form.addEventListener("submit", submitForm);
openCartBtn.addEventListener("click", openCart);
backBtn.addEventListener("click", closeCart);
detailsBackBtn.addEventListener("click", backFromDetailsBtn);
window.addEventListener("load", getFromLocalStorage);

prodLeft.addEventListener("click", function () {
  categores.classList.add("hidden");
});
prodRight.addEventListener("click", function () {
  categores.classList.add("hidden");
});
header.addEventListener("click", function () {
  categores.classList.add("hidden");
});

{
  /* <div class="product-counter hidden">
<div class="count-right">
  <button class="counter-btn increase">+</button>
  <button class="counter-btn decrease">-</button>
</div>
<div class="count-left">
  <span class="quantity">159 عدد</span>
</div>
</div> */
}
