<template>
  <section>
    <b-card style="border-radius: 0px;background: #f5f5f5;">
      <b-card-body style="padding:0px;">
        <b-row>
          <b-col>
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search" />
              <b-input-group-append>
                <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col class="text-right">
          <p style="margin-bottom:0px;line-height: 1.3;"><b>Redirects:</b> {{visitedCount}}</p>
          <p style="margin-bottom:0px;line-height: 1.3;"><b>Rows:</b> {{data.length}}</p>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-table striped bordered responsive small :filter="filter" :items="data" :fields="columns" class="tableStyle"></b-table>
  </section>
</template>


<script>
export default {
  name: 'grid',
  data () {
    let sortOrders = {}
    this.columns.forEach(key => {
      sortOrders[key] = 1
    })
    return {
      filter: null,
      sortKey: ''
    }
  },
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  computed: {
    visitedCount () {
      let count = 0;
      this.data.forEach(i => {
        if (i.visited) {
          count++
        }
      })
      return count
    },
    filteredData () {
      let sortKey = this.sortKey
      let filterKey = this.filterKey && this.filterKey.toLowerCase()
      let order = this.sortOrders[sortKey] || 1
      let data = this.data
      if (filterKey) {
        data = data.filter(row => {
          return Object.keys(row).some(key => {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort((a, b) => {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy (key) {
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
}
</script>
