<script setup>
import { ref } from "vue";
import Header from './components/Header.vue';

const quantity = ref(10000);

const MIN = 0;
const MAX = 20000
const STEP = 100;

function handleChange(e) {
  quantity.value = Number(e.target.value);
}
</script>

<template>
  <div class="my-20 max-w-lg mx-auto bg-white shadow p-10">
    <Header />

    <div class="my-5">
      <input
        type="range"
        class="w-full bg-gray-200 accent-lime-500 hover:accent-lime-600"
        :min="MIN"
        :max="MAX"
        :step="STEP"
        @input="handleChange"
        :value="quantity"
      />
      {{ quantity }}
      <p v-text="quantity"></p>
    </div>
  </div>
</template>
