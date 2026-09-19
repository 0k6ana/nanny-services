<script setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

import { useAuthStore } from '../stores/auth'

const props = defineProps({
  mode: {
    type: String,
    default: 'login',
  },
})

const emit = defineEmits(['success'])

const authStore = useAuthStore()
const errorMessage = ref('')
const schema = yup.object({ name: yup .string() .when([], { is: () => props.mode === 'register', then: (schema) => schema .min(2, 'Ім’я має містити щонайменше 2 символи') .required('Ім’я обов’язкове'), otherwise: (schema) => schema.notRequired(), }), email: yup .string() .email('Введіть коректний email') .required('Email обов’язковий'), password: yup .string() .min(6, 'Пароль має містити щонайменше 6 символів') .required('Пароль обов’язковий'), })

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [name, nameAttrs] = defineField('name')

const submit = handleSubmit(async (values) => { errorMessage.value = ''
try { if (props.mode === 'register') {
  await authStore.register( values.name, values.email, values.password ) }
  else
   { await authStore.login(values.email, values.password) }
    emit('success') } catch (error) { errorMessage.value = error.message } })
</script>

<template>
  <form class="auth-form" @submit="submit">
    <h2>
      {{ mode === 'register' ? 'Registration' : 'Log In' }}
    </h2>

    <p class="auth-description">
      {{
        mode === 'register'
          ? 'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.'
          : 'Welcome back! Please enter your credentials to access your account and continue your babysitter search.'
      }}
    </p>
    <label
  v-if="mode === 'register'"
  class="auth-field"
>
  <input
    v-model="name"
    v-bind="nameAttrs"
    type="text"
    placeholder="Name"
    autocomplete="name"
  />

  <span v-if="errors.name" class="auth-error">
    {{ errors.name }}
  </span>
</label>
    <label class="auth-field">
      <input
        v-model="email"
        v-bind="emailAttrs"
        type="email"
        placeholder="Email"
        autocomplete="email"
      />

      <span v-if="errors.email" class="auth-error">
        {{ errors.email }}
      </span>
    </label>

    <label class="auth-field">
      <input
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        placeholder="Password"
        autocomplete="current-password"
      />

      <span v-if="errors.password" class="auth-error">
        {{ errors.password }}
      </span>
    </label>

    <p v-if="errorMessage" class="auth-error auth-error-general">
      {{ errorMessage }}
    </p>

    <button
      class="auth-submit"
      type="submit"
      :disabled="isSubmitting"
    >
      {{ mode === 'register' ? 'Sign Up' : 'Log In' }}
    </button>
  </form>
</template>
<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
}

.auth-form h2 {
  margin: 0 0 14px;

  color: #191a2a;

  font-size: 32px;
  font-weight: 600;
  line-height: 1.2;
}

.auth-description {
  margin: 0 0 30px;

  color: #85858d;

  font-size: 13px;
  line-height: 1.35;
}

.auth-field {
  display: flex;
  flex-direction: column;

  margin-bottom: 14px;
}

.auth-field input {
  width: 100%;
  height: 41px;

  padding: 0 13px;

  border: 1px solid #e2e2e5;
  border-radius: 9px;

  background: #ffffff;

  color: #191a2a;
  font-family: inherit;
  font-size: 13px;

  outline: none;
  box-sizing: border-box;
}

.auth-field input::placeholder {
  color: #24242d;
  opacity: 1;
}

.auth-field input:focus {
  border-color: #bdbdc3;
}

.auth-error {
  margin-top: 5px;

  color: #ff3b3b;

  font-size: 11px;
  line-height: 1.2;
}

.auth-error-general {
  margin: 0 0 5px;
}

.auth-submit {
  width: 100%;
  height: 41px;

  margin-top: 2px;

  border: none;
  border-radius: 22px;

  background: #ff3b3b;
  color: #ffffff;

  font-family: inherit;
  font-size: 13px;
  font-weight: 500;

  cursor: pointer;
}

.auth-submit:hover {
  background: #f33434;
}

.auth-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .auth-form h2 {
    font-size: 28px;
  }

  .auth-description {
    font-size: 12px;
  }
}
</style>
