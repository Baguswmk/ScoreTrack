<template>
  <div class="relative w-full">
    <!-- Prefix Icon -->
    <div class="absolute inset-y-0 left-0 flex items-center pl-3">
      <slot name="prefix" />
    </div>

    <!-- Input -->
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="['w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500', inputClass, 'pl-10']"
    />
  </div>
</template>

<script setup>
defineProps({
  id: String,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  modelValue: String,
  inputClass: {
    type: String,
    default: '',
  },
});

defineEmits(['update:modelValue']);
</script>
