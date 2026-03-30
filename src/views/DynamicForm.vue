<script setup>
import { ref, computed } from "vue";

const selectedChef = ref(
  JSON.parse(localStorage.getItem("selectedChef") || "null"),
);
const selectedMenuItem = ref(
  JSON.parse(localStorage.getItem("selectedMenuItem") || "null"),
);
const formData = ref({});

const fields = computed(() => {
  return selectedMenuItem.value?.fields || [];
});

const updateField = (key, value) => {
  formData.value[key] = value;
};

const goBack = () => {
  window.location.hash = "#/menu-item";
};

const goNext = () => {
  // 驗證必填欄位
  for (const field of fields.value) {
    if (field.required && !formData.value[field.key]) {
      alert(
        `Please fill in ${field.label}. / Bitte füllen Sie ${field.label} aus.`,
      );
      return;
    }
  }

  localStorage.setItem("formData", JSON.stringify(formData.value));
  window.location.hash = "#/receipt";
};
</script>

<template>
  <section class="page">
    <div class="art-card">
      <h1 class="title">{{ selectedMenuItem.title }}</h1>
      <p class="subtitle">{{ selectedMenuItem.description }}</p>

      <div class="form-fields">
        <div v-for="field in fields" :key="field.key" class="form-group">
          <label :for="field.key">{{ field.label }}</label>

          <!-- Text input -->
          <input
            v-if="field.type === 'text'"
            :id="field.key"
            v-model="formData[field.key]"
            type="text"
            :required="field.required"
            @input="updateField(field.key, $event.target.value)"
          />

          <!-- Textarea -->
          <textarea
            v-else-if="field.type === 'textarea'"
            :id="field.key"
            v-model="formData[field.key]"
            :required="field.required"
            @input="updateField(field.key, $event.target.value)"
          ></textarea>

          <!-- Number input -->
          <input
            v-else-if="field.type === 'number'"
            :id="field.key"
            v-model.number="formData[field.key]"
            type="number"
            :min="field.min"
            :max="field.max"
            :required="field.required"
            @input="updateField(field.key, $event.target.value)"
          />

          <!-- Range slider -->
          <div v-else-if="field.type === 'range'" class="range-group">
            <input
              :id="field.key"
              v-model.number="formData[field.key]"
              type="range"
              :min="field.min"
              :max="field.max"
              :required="field.required"
              @input="updateField(field.key, $event.target.value)"
            />
            <span>{{ formData[field.key] || field.min }}</span>
          </div>

          <!-- Percentage slider -->
          <div v-else-if="field.type === 'percentage'" class="percentage-group">
            <input
              :id="field.key"
              v-model.number="formData[field.key]"
              type="range"
              min="0"
              max="100"
              :required="field.required"
              @input="updateField(field.key, $event.target.value)"
            />
            <span>{{ formData[field.key] || 0 }}%</span>
          </div>

          <!-- Boolean checkbox -->
          <input
            v-else-if="field.type === 'boolean'"
            :id="field.key"
            v-model="formData[field.key]"
            type="checkbox"
            :required="field.required"
            @change="updateField(field.key, $event.target.checked)"
          />

          <!-- Select dropdown -->
          <select
            v-else-if="field.type === 'select'"
            :id="field.key"
            v-model="formData[field.key]"
            :required="field.required"
            @change="updateField(field.key, $event.target.value)"
          >
            <option value="">Select / Auswählen</option>
            <option
              v-for="option in field.options"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>

          <!-- Radio buttons -->
          <div v-else-if="field.type === 'radio'" class="radio-group">
            <label
              v-for="option in field.options"
              :key="option"
              class="radio-option"
            >
              <input
                v-model="formData[field.key]"
                type="radio"
                :name="field.key"
                :value="option"
                :required="field.required"
                @change="updateField(field.key, $event.target.value)"
              />
              {{ option }}
            </label>
          </div>

          <!-- Checkbox group -->
          <div v-else-if="field.type === 'checkbox'" class="checkbox-group">
            <label
              v-for="option in field.options"
              :key="option"
              class="checkbox-option"
            >
              <input
                v-model="formData[field.key]"
                type="checkbox"
                :value="option"
                :required="field.required"
                @change="
                  updateField(
                    field.key,
                    $event.target.checked
                      ? [...(formData[field.key] || []), option]
                      : (formData[field.key] || []).filter((v) => v !== option),
                  )
                "
              />
              {{ option }}
            </label>
          </div>
        </div>
      </div>

      <div class="nav-buttons">
        <button class="back-btn" @click="goBack">Back / Zurück</button>
        <button class="next-btn" @click="goNext">Next / Weiter</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.form-fields {
  margin: 2rem 0;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.range-group,
.percentage-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.range-group input,
.percentage-group input {
  flex: 1;
}

.radio-group,
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.radio-option,
.checkbox-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
