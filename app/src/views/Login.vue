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
        name: 'userName',
        label: 'User Name'
      },
      {
        type: 'password',
        name: 'password',
        label: 'Password'
      }
    ],
    password: '',
    userName: '',
  }),
  methods: {
    setData(field) {
      this[field.name] = field.value
    },
    forgot() {
      alert('You snooze you loze!!! I\'m joking, it will be developed in future!')
    },
    login() {
      // Your login logic here
      this.$router.push('dashboard')
    },
    signUp() {
      this.$router.push('signup')
    }
  },
}
</script>

<template>
  <FormComponent title="Login" :fields="fields" @inputChange="setData" @submitEvent="login">
    <template v-slot:buttons>
      <a href="#" class="text-body-2 font-weight-regular" @click="forgot">Forgot Password?</a>
      <v-btn type="submit" color="primary" block class="mt-2">Sign in</v-btn>
    </template>
    <template v-slot:links>
      <div class="mt-2">
        <p class="text-body-2">Don't have an account? <a href="#" @click="signUp">Sign Up</a></p>
      </div>
    </template>
  </FormComponent>
</template>