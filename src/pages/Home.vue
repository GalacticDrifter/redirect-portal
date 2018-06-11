<template>
  <div class="jumbotron headerbar">
      <b-container>
        <div class="col-md-12 text-center" v-if="!purlProblem">
          <h2>Thank you,</h2>
          <h2>You are being redirected to: <i>{{redirectTarget}}</i></h2>
          <br>
          <i class="fa fa-spinner fa-spin fa-3x"></i>
        </div>

        <div class="col-md-12 text-center" v-if="purlProblem">
          <h2>Oh No!</h2>
          <h2>Something is wrong with your URL Param!</h2>
          <p class="lead">Try again?</p>
        </div>
      </b-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      purlProblem: false,
      redirectTarget: 'Google' // Name for the website you are redirecting to
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  mounted () {
    this.getUserAndUpdate()
  },
  methods: {
    getUserAndUpdate () {
      let id = this.$route.query.u;
      if (id) {
        this.$store.dispatch('updateUserVisit', {id: id})
          .then((data) => {
            this.redirectUser()
          })
      } else {
        // I am redirecting the user regardless if the PURL was incorrect, but if you want to show a warning for invalid PURLs then:
        // comment out this.redirectUser() and set this.purlProblem = true in this block.
        this.redirectUser()
        this.purlProblem = false
      }
    },
    redirectUser () {
      window.location.href = 'http://google.com' // set the redirect target URL
    }
  }
}
</script>

<style scoped>
  .headerbar {
      margin-top: 3rem;
      padding: 1rem 2rem;
      border-radius: 0px;
      background: #FFF; /* #f5f5f5; */
  }
</style>
