<script setup lang="ts">
import { ref } from 'vue';
import DynamicFormField from './components/DynamicFormField.vue'
import { FormField } from './types';



const fieldDefinition = {
  type: 'list',
  name: 'testArray',
  itemDefinition: {
    type: 'number',
    name: 'arrayEntry',
    
  }
} as FormField

const context = ref({
  testArray: undefined
})
</script>

<template>
</template>

<style scoped>

</style>
