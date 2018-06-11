<template>
  <b-container>
    <b-row v-if="error">
      <b-col offset-3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col offset-3>
        <b-card class="my-3">
          <b-card-body >
            <b-container>
              <h2>Sign In</h2>
              <form @submit.prevent="onSignin">
                <b-row class="my-3">
                  <b-col>
                    <b-form-input
                      name="email"
                      placeholder="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      required></b-form-input>
                  </b-col>
                </b-row>
                <b-row class="my-3">
                  <b-col>
                    <b-form-input
                      name="password"
                      placeholder="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required></b-form-input>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-button type="submit" variant="success" :disabled="loading" :loading="loading">
                      Sign in
                    </b-button>
                  </b-col>
                </b-row>
              </form>
            </b-container>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/admin')
        }
      }
    },
    methods: {
      onSignin () {
        this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
