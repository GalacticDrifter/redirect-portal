<template>
    <b-container >
        <h2 class="my-3 px-2">Admin Data</h2>
        <Grid :data="participants"
            :columns="gridColumns">
        </Grid>
    </b-container>
</template>

<script>
import Grid from '@/components/Grid'

export default {
  name: 'DataGrid',
  data () {
    return {
        gridColumns: [
            {
                key: 'index',
                sortable: true
            }, {
                key: 'id',
                sortable: true
            }, {
                key: 'name',
                sortable: true
            }, {
                key: 'visited',
                sortable: true
            }, {
                key: 'visitdate',
                label: 'Date',
                sortable: true
            }
        ]
    }
  },
  components: {
      Grid
  },
  mounted () {
      this.$store.dispatch('loadParticipants')
  },
  computed: {
    participants () {
      return this.$store.getters.loadedParticipants
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
