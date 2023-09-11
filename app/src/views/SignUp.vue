<script>
import FormComponent from '@/components/Form.vue'

export default {
  components: {
    FormComponent
  },
  data: () => ({
    fields: [
      {
        type: 'text',
        name: 'firstName',
        label: 'First Name'
      },
      {
        type: 'text',
        name: 'lastName',
        label: 'Last Name'
      },
      {
        type: 'email',
        name: 'email',
        label: 'E-mail'
      },
      {
        type: 'password',
        name: 'password',
        label: 'Password'
      },
      {
        type: 'password',
        name: 'confirmPassword',
        label: 'Confirm Password'
      }
    ],
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }),
  methods: {
    setData(field) {
      this[field.name] = field.value
    },
    login() {
      // Your login logic here
      this.$router.push('/')
    },
    register() {
      this.$router.push('/')
    }
  },
}
</script>

<template>
  <FormComponent title="Register" :fields="fields" @inputChange="setData" @submitEvent="register">
    <template v-slot:buttons>
      <v-btn type="submit" color="primary" block class="mt-2">Sign up</v-btn>
    </template>
    <template v-slot:links>
      <div class="mt-2">
        <p class="text-body-2">Do you have an account? <a href="#" @click="login">Log In</a></p>
      </div>
    </template>
  </FormComponent>
</template>