<script setup>
const name = localStorage.getItem("art_name") || "Not provided";
const email = localStorage.getItem("art_email") || "Not provided";

const selectedChef = JSON.parse(localStorage.getItem("selectedChef") || "null");
const answers = JSON.parse(localStorage.getItem("answers") || "{}");

const submitOrder = () => {
  // 建立訂單物件
  const order = {
    id: Date.now(),
    customer: {
      name,
      email,
    },
    order: {
      chefId: selectedChef?.id,
      chefTitle: selectedChef?.title,
      answers,
    },
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
  localStorage.removeItem("selectedChef");
  localStorage.removeItem("answers");

  alert("Order submitted successfully! / Bestellung erfolgreich eingereicht!");
  window.location.hash = "#/orders";
};

const goBack = () => {
  window.location.hash = "#/chef-detail";
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
        <p><strong>Chef:</strong> {{ selectedChef?.title }}</p>
      </div>

      <div class="receipt-section">
        <h2>Answers</h2>
        <div class="answer-item">
          <strong>{{ selectedChef?.question1.title }}:</strong>
          <span>{{ answers.question1 }}%</span>
        </div>
        <div class="answer-item">
          <strong>{{ selectedChef?.question2.title }}:</strong>
          <span>{{ answers.question2 }}</span>
        </div>
        <div class="answer-item">
          <strong>{{ selectedChef?.question3.title }}:</strong>
          <span>{{ answers.question3 }}</span>
        </div>
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
