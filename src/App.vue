<script setup>
import { ref, computed, watch } from 'vue';
import Header from './components/Header.vue';
import Button from './components/Button.vue';
import { calculateTotalToPay } from './helpers';

// States
const quantity = ref(10000);
const months = ref(6);
const total = ref(0);
const monthlyPayment = computed(() => {
  return total.value / months.value;
});

// constants
const MIN = 0;
const MAX = 20000;
const STEP = 100;

// Functions
const currencyFormat = (value) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(value);
};

const handleChangeDecrement = () => {
  const newValue = quantity.value - STEP;
  if (newValue < MIN) {
    alert('Cantidad no es válida');
    return;
  }

  quantity.value = newValue;
};

const handleChangeIncrement = () => {
  const newValue = quantity.value + STEP;
  if (newValue > MAX) {
    alert('Cantidad no es válida');
    return;
  }

  quantity.value = newValue;
};

// Observadores: Los watches son Parecidos al useEffect en React
watch(
  [quantity, months],
  () => {
    total.value = calculateTotalToPay(quantity.value, months.value);
  }
  // { immediate: true } // Ejecuta lo que está en la función al cargar
);
</script>

<template>
  <div class="my-20 max-w-lg mx-auto bg-white shadow p-10">
    <Header />

    <div class="flex justify-between mt-10">
      <Button @fn="handleChangeDecrement" :operator="'-'" />
      <Button @fn="handleChangeIncrement" :operator="'+'" />
    </div>

    <div class="my-5">
      <input
        type="range"
        class="w-full bg-gray-200 accent-lime-500 hover:accent-lime-600"
        :min="MIN"
        :max="MAX"
        :step="STEP"
        v-model.number="quantity"
      />
      <p class="text-center my-10 text-5xl font-extrabold text-indigo-600">
        {{ currencyFormat(quantity) }}
      </p>

      <h2 class="text-2xl font-extrabold text-gray-500 text-center">
        Elige un <span class="text-indigo-600">Plazo</span> a pagar
      </h2>

      <select
        class="w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500 mt-5"
        v-model.number="months"
      >
        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>
      </select>
    </div>

    <div v-if="total > 0" class="my-5 space-y-3 bg-gray-50 p-5">
      <h2 class="text-2xl font-extrabold text-gray-500 text-center">
        Resumen <span class="text-indigo-600">de pagos</span>
      </h2>

      <p class="text-xl text-gray-500 text-center font-bold">
        {{ months }} Meses
      </p>
      <p class="text-xl text-gray-500 text-center font-bold">
        Total a pagar: {{ currencyFormat(total) }}
      </p>
      <p class="text-xl text-gray-500 text-center font-bold">
        Mensuales: {{ currencyFormat(monthlyPayment) }}
      </p>
    </div>

    <p v-else class="text-center">Añade una cantidad y un plazo a pagar</p>
  </div>
</template>
