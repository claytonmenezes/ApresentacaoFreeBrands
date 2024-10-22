<script setup>
import { ref, watch, useModel, onMounted } from 'vue';
import { cn } from "@/lib/utils";

const props = defineProps({
  defaultValue: { type: [String, Number], required: false },
  modelValue: { type: [String, Number], required: false },
  class: { type: null, required: false },
  mask: { type: String, required: false }, // Propriedade para a máscara (opcional)
});

const emits = defineEmits(["update:modelValue"]);

const modelValue = useModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

// Criando um estado local para o valor visual
const displayValue = ref(modelValue.value || '');

// Função para aplicar máscara
const applyMask = (value, mask) => {
  if (!value || !mask) return value;

  let maskedValue = '';
  let i = 0;
  let j = 0;

  while (i < mask.length && j < value.length) {
    if (mask[i] === '#') {
      maskedValue += value[j];
      j++;
    } else {
      maskedValue += mask[i];
    }
    i++;
  }

  return maskedValue;
};

// Aplicar máscara quando o componente é montado
onMounted(() => {
  if (props.mask && modelValue.value) {
    displayValue.value = applyMask(modelValue.value.replace(/\D/g, ''), props.mask);
  } else {
    displayValue.value = modelValue.value;
  }
});

// Watch para aplicar a máscara conforme o usuário digita e atualizar o valor original
watch(displayValue, (newValue) => {
  if (props.mask) {
    const rawValue = newValue?.replace(/\D/g, '') || null;
    emits("update:modelValue", rawValue);
    displayValue.value = applyMask(rawValue, props.mask);
  } else {
    emits("update:modelValue", newValue);
  }
});

// Watch para atualizar a visualização quando o valor original mudar externamente
watch(modelValue, (newValue) => {
  if (props.mask) {
    displayValue.value = applyMask(newValue?.replace(/\D/g, ''), props.mask);
  } else {
    displayValue.value = newValue;
  }
});
</script>

<template>
  <input
    v-model="displayValue"
    :class="
      cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  />
</template>
