<script setup>
const name = localStorage.getItem("art_name") || "Not provided";
const email = localStorage.getItem("art_email") || "Not provided";

const basis = localStorage.getItem("combo_basis") || "Not selected";
const ingredients =
  localStorage.getItem("combo_ingredients") || "Not selected yet";
const topping = localStorage.getItem("combo_topping") || "Not selected";

const calmSpicy = Number(localStorage.getItem("sauce_calm_spicy") || 50);
const monochromeColorful = Number(
  localStorage.getItem("sauce_monochrome_colorful") || 50,
);
const sweetSalty = Number(localStorage.getItem("sauce_sweet_salty") || 50);

const submitOrder = () => {
  // 建立訂單物件
  const order = {
    id: Date.now(),
    name,
    email,
    basis,
    ingredients,
    topping,
    calmSpicy,
    monochromeColorful,
    sweetSalty,
    createdAt: new Date().toLocaleString(),
  };

  // 從 localStorage 取得現有訂單
  const existingOrders = JSON.parse(localStorage.getItem("art_orders")) || [];

  // 添加新訂單
  existingOrders.push(order);

  // 保存回 localStorage
  localStorage.setItem("art_orders", JSON.stringify(existingOrders));

  // 清除當前訂單數據
  localStorage.removeItem("art_name");
  localStorage.removeItem("art_email");
  localStorage.removeItem("combo_basis");
  localStorage.removeItem("combo_ingredients");
  localStorage.removeItem("combo_topping");
  localStorage.removeItem("sauce_calm_spicy");
  localStorage.removeItem("sauce_monochrome_colorful");
  localStorage.removeItem("sauce_sweet_salty");

  alert("Order submitted successfully! / Bestellung erfolgreich eingereicht!");
  window.location.hash = "#/";
};

const goBack = () => {
  window.location.hash = "#/combo/sauce";
};

const goHome = () => {
  window.location.hash = "#/";
};
</script>

<template>
  <section class="page">
    <div class="art-card receipt-page">
      <h1 class="title">Receipt</h1>
      <p class="subtitle">Zusammenfassung / Summary</p>

      <div class="receipt-section">
        <h2>User Info</h2>
        <p><strong>Name:</strong> {{ name }}</p>
        <p><strong>Email:</strong> {{ email }}</p>
      </div>

      <div class="receipt-section">
        <h2>Order</h2>
        <p><strong>Basis:</strong> {{ basis }}</p>
        <p><strong>Ingredients:</strong> {{ ingredients }}</p>
        <p><strong>Topping:</strong> {{ topping }}</p>
      </div>

      <div class="receipt-section">
        <h2>Secret Sauce</h2>
        <p><strong>Calm → Spicy:</strong> {{ calmSpicy }}%</p>
        <p><strong>Monochrome → Colorful:</strong> {{ monochromeColorful }}%</p>
        <p><strong>Sweet → Salty:</strong> {{ sweetSalty }}%</p>
      </div>

      <div class="nav-buttons">
        <button class="back-btn" @click="goBack">Back / Zurück</button>
        <button class="submit-btn" @click="submitOrder">
          Submit Order / Bestellung einreichen
        </button>
        <button class="next-btn" @click="goHome">Home / Start</button>
      </div>
    </div>
  </section>
</template>
