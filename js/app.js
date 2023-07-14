let productData = [
  {
    id: 1,
    name: "پیتزای ویژه",
    image: "assets/images/pizza.png",
    price: 100000,
    categoryID: 1,
    backgroundColor: "#FFC979",
    textNameColor: "#C02002",
    boxShadowColor: "rgba(255,201,121,0.58)",
    description: "پیتزای ویژه و مخصوص گوشت 100% بخور نفست بالا نیاد",
    future: {
      گوشت: "100%",
      قارچ: "زیاد",
      پنیر: "گودا",
    },
  },
  {
    id: 2,
    name: "چلوگوشت",
    image: "assets/images/chologosht.png",
    price: 100000,
    categoryID: 3,
    backgroundColor: "#757575",
    textNameColor: "#81FF00",
    boxShadowColor: "rgba(117,117,117,0.4)",
    description: "چلوگوشت اعلاء گوشت گاو قرمز با برنج اصیل ایرانی",
    future: {
      برنج: "ایرانی اصل",
      سالاد: "شیرازی",
    },
  },
  {
    id: 3,
    name: "ماسالا",
    image: "assets/images/sharabNab.png",
    price: 60000,
    categoryID: 2,
    backgroundColor: "#F0421C",
    textNameColor: "#FFCC40",
    boxShadowColor: "rgba(194,26,26,0.3)",
    description: "شراب ناب کاشون شنیدی؟؟ همینه ها",
    future: {
      میوه: "انگور قرمز",
    },
  },
  {
    id: 4,
    name: "پیتزای ویژه",
    image: "assets/images/pizza.png",
    price: 100000,
    categoryID: 1,
    backgroundColor: "#FFC979",
    textNameColor: "#C02002",
    boxShadowColor: "rgba(255,201,121,0.58)",
    description: "پیتزای ویژه و مخصوص گوشت 100% بخور نفست بالا نیاد",
    future: {
      گوشت: "100%",
      قارچ: "زیاد",
      پنیر: "گودا",
    },
  },
  {
    id: 5,
    name: "چلوگوشت",
    image: "assets/images/chologosht.png",
    price: 100000,
    categoryID: 3,
    backgroundColor: "#757575",
    textNameColor: "#81FF00",
    boxShadowColor: "rgba(117,117,117,0.4)",
    description: "چلوگوشت اعلاء گوشت گاو قرمز با برنج اصیل ایرانی",
    future: {
      برنج: "ایرانی اصل",
      سالاد: "شیرازی",
    },
  },
  {
    id: 6,
    name: "رد موهیتو",
    image: "assets/images/sharabNab.png",
    price: 60000,
    categoryID: 2,
    backgroundColor: "#F0421C",
    textNameColor: "#FFCC40",
    boxShadowColor: "rgba(194,26,26,0.3)",
    description: "شراب ناب کاشون شنیدی؟؟ همینه ها",
    future: {
      میوه: "انگور قرمز",
    },
  },
];

const categoresData = [
  { id: 0, category: "همه", categoryImage: "../assets/images/chologosht.png" },
  { id: 1, category: "پیتزا", categoryImage: "../assets/images/pizza.png" },
  {
    id: 2,
    category: "نوشیدنی",
    categoryImage: "../assets/images/sharabNab.png",
  },
  {
    id: 3,
    category: "چلویی",
    categoryImage: "../assets/images/chologosht.png",
  },
];

let cart = [];
const $ = document;
const prodRight = $.querySelector(".prod-right");
const prodLeft = $.querySelector(".prod-left");
const productList = $.getElementById("product-list");
const CategoryBtn = $.querySelector(".category-btn");
const categores = $.querySelector(".categores");
const categoresOverley = $.querySelector(".categores-overley");
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
const price = $.getElementById("price");
const header = $.querySelector(".header");
const detailsProdoctContainer = $.querySelector(".details-prodoct-container");

function renderData(right, left, data) {
  data.forEach(function (item) {
    let product = `
    <div class="product-card" 
    style="background-image: url(${item.image});
    background-repeat: no-repeat;
    background-color:${item.backgroundColor};
    box-shadow: 0px 0px 10px 5px ${item.boxShadowColor};
    "
    >
    <span class="product-name" style="color:${item.textNameColor}">${
      item.name
    }</span>
    
            <div class="add-to-card-container show">
            <div data-id=${item.id} style="display:none" class="added-to-card">
            <img src="./assets/images/Vector 1.png" alt="" />
            </div>
              <button data-id=${
                item.id
              } class="add-to-card" onclick="openDetailsProduct(${item.id})">
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
    <div class="category-item" onclick="byCategories(${item.id})">
    <img class="category-image" src="${item.categoryImage}" alt="">
    <span class="category-name">${item.category}</span>
  </div>

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
  categoresOverley.classList.remove("show");
  categoresOverley.classList.add("hidden");
  $.body.style.overflowY = "scroll";
  renderData(prodRight, prodLeft, filteredData);
  if (categoryId === 0) {
    renderData(prodRight, prodLeft, productData);
  }
  cart.forEach((c) => {
    let isCart = cart.some((item) => {
      return item.id === c.id;
    });
    console.log(isCart);
    if (isCart) {
      const addedToCard = $.querySelectorAll(".added-to-card");
      const addToCardBtn = $.querySelectorAll(".add-to-card");
      addToCardBtn.forEach((btn) => {
        if (Number(btn.dataset.id) === c.id) {
          btn.style.display = "none";
        }
      });

      addedToCard.forEach((add) => {
        if (Number(add.dataset.id) === c.id) {
          add.style.display = "flex";
        }
      });
    }
  });
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
  detailsProdoctContainer.innerHTML = "";
  let productFind = productData.find(function (item) {
    return item.id === prodId;
  });
  console.log(productFind);

  $.body.style.overflowY = "hidden";
  overleyDetails.classList.remove("hidden-overlay-details");
  overleyDetails.classList.add("show-overlay-details");
  let li = "";
  for (const key in productFind.future) {
    if (productFind.future.hasOwnProperty(key)) {
      var value = productFind.future[key];
      // console.log("Key: " + key + ", Value: " + value);
      li += `<li>${key}: ${value}</li>`;
    }
  }
  let element = `
<div class="info-section">
          <div class="title-product">
            <span>${productFind.name}</span>
            <ul>
            ${li}
            </ul>
          </div>
          <img src="${productFind.image}" alt="">
        </div>
        <span class="desc">${productFind.description}</span>
        <div class="btn-to-cart-container">
          <span style="color:#C10000" class="price">${productFind.price.toLocaleString(
            "en-US"
          )} تومان ناقابل</span>
          <span style="display:none;color:#C10000" class="added">به سبد خرید اضافه شد</span>
          <button id="details-add-cart-btn" onclick="addToCart(${
            productFind.id
          })">افزودن به سبد خرید</button>
           <div class="details-counter hidden">
             <button onclick="increase(${productFind.id})">+</button>
             <span class="quantity">1 عدد</span>
             <button onclick="decrease(${productFind.id})">-</button>
           </div>
          </div>
    
`;
  detailsProdoctContainer.insertAdjacentHTML("beforeend", element);
  hasInCart(prodId, cart);
}

overleyDetails.addEventListener("click", (e) => {
  if (e.target.className === "overley-details show-overlay-details") {
    overleyDetails.classList.remove("show-overlay-details");
    overleyDetails.classList.add("hidden-overlay-details");
    $.body.style.overflowY = "scroll";
  }
});
function hasInCart(prodId, cart) {
  const detailsAddToCartBtn = $.getElementById("details-add-cart-btn");
  const detailsCounter = $.querySelector(".details-counter");
  const price = $.querySelector(".price");
  const added = $.querySelector(".added");
  const addedToCard = $.querySelectorAll(".added-to-card");
  const addToCardBtn = $.querySelectorAll(".add-to-card");
  let has = cart.some(function (item) {
    return item.id === prodId;
  });

  if (has) {
    detailsAddToCartBtn.style.display = "none";
    detailsCounter.className = "details-counter show";
    price.style.display = "none";
    added.style.display = "block";
    const quantity = $.querySelector(".quantity");

    addToCardBtn.forEach((btn) => {
      if (Number(btn.dataset.id) === prodId) {
        btn.style.display = "none";
      }
    });

    addedToCard.forEach((add) => {
      if (Number(add.dataset.id) === prodId) {
        add.style.display = "flex";
      }
    });

    let finder = cart.find(function (item) {
      return item.id === prodId;
    });
    quantity.innerHTML = `${finder.productQty} عدد`;
  } else {
    detailsAddToCartBtn.style.display = "flex";
    detailsCounter.className = "details-counter hidden";
    price.style.display = "block";
    added.style.display = "none";
  }
}

function updateQuantity(qty, prodId) {
  const detailsAddToCartBtn = $.getElementById("details-add-cart-btn");
  const detailsCounter = $.querySelector(".details-counter");
  const quantity = $.querySelector(".quantity");
  const price = $.querySelector(".price");
  const added = $.querySelector(".added");

  const addedToCard = $.querySelectorAll(".added-to-card");
  const addToCardBtn = $.querySelectorAll(".add-to-card");

  quantity.innerHTML = `${qty} عدد`;
  if (qty === 0) {
    detailsCounter.className = "details-counter hidden";
    detailsAddToCartBtn.style.display = "flex";
    added.style.display = "none";
    price.style.display = "block";
    addToCardBtn.forEach((btn) => {
      if (Number(btn.dataset.id) === prodId) {
        btn.style.display = "flex";
      }
    });

    addedToCard.forEach((add) => {
      if (Number(add.dataset.id) === prodId) {
        add.style.display = "none";
      }
    });
    removeProduct(prodId);
  }
}
function updateQuantity_2(qty, prodId) {
  const quantity = $.querySelector(".quantity_2");

  const addedToCard = $.querySelectorAll(".added-to-card");
  const addToCardBtn = $.querySelectorAll(".add-to-card");

  quantity.innerHTML = `${qty} عدد`;
  if (qty === 0) {
    removeProduct(prodId);
    addToCardBtn.forEach((btn) => {
      if (Number(btn.dataset.id) === prodId) {
        btn.style.display = "flex";
      }
    });

    addedToCard.forEach((add) => {
      if (Number(add.dataset.id) === prodId) {
        add.style.display = "none";
      }
    });
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
  categoresOverley.classList.remove("hidden");
  if (categoresOverley.className === "categores-overley") {
    $.body.style.overflow = "hidden";
  } else {
    $.body.style.overflow = "scroll";
  }
});

categoresOverley.addEventListener("click", (e) => {
  if (e.target.className === "categores-overley") {
    categoresOverley.classList.remove("show");
    categoresOverley.classList.add("hidden");
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
        <button onclick="decrease_2(${item.id})"><span>-</span></button>
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
  const detailsAddToCartBtn = $.getElementById("details-add-cart-btn");
  const detailsCounter = $.querySelector(".details-counter");
  const quantity = $.querySelector(".quantity");
  const price = $.querySelector(".price");
  const added = $.querySelector(".added");
  const addedToCard = $.querySelectorAll(".added-to-card");
  const addToCardBtn = $.querySelectorAll(".add-to-card");

  price.style.display = "none";
  added.style.display = "block";
  quantity.innerHTML = "1 عدد";
  detailsAddToCartBtn.style.display = "none";
  detailsCounter.className = "details-counter show";

  addToCardBtn.forEach((btn) => {
    if (Number(btn.dataset.id) === prodId) {
      btn.style.display = "none";
    }
  });

  addedToCard.forEach((add) => {
    if (Number(add.dataset.id) === prodId) {
      add.style.display = "flex";
    }
  });

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
  const addedToCard = $.querySelectorAll(".added-to-card");
  const addToCardBtn = $.querySelectorAll(".add-to-card");
   addToCardBtn.forEach((btn) => {
      if (Number(btn.dataset.id) === prodId) {
        btn.style.display = "flex";
      }
    });

    addedToCard.forEach((add) => {
      if (Number(add.dataset.id) === prodId) {
        add.style.display = "none";
      }
    });
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
window.addEventListener("load", getFromLocalStorage);

window.addEventListener("load", () => {
  cart.forEach((c) => {
    let isCart = cart.some((item) => {
      return item.id === c.id;
    });
    console.log(isCart);
    if (isCart) {
      const addedToCard = $.querySelectorAll(".added-to-card");
      const addToCardBtn = $.querySelectorAll(".add-to-card");
      addToCardBtn.forEach((btn) => {
        if (Number(btn.dataset.id) === c.id) {
          btn.style.display = "none";
        }
      });

      addedToCard.forEach((add) => {
        if (Number(add.dataset.id) === c.id) {
          add.style.display = "flex";
        }
      });
    }
  });
});
