<template>
  <div id="app">
    <NavBar />
    <div id="main-container">
      <ItemForm @addItemAction="addItemAction" />
      <ItemList @editItemQuantityAction="editItemQuantityAction" @editItemStatusAction="editItemStatusAction" @removeItemAction="removeItemAction" :listItems="this.listNotDone" :title="this.titleNotDone" />
      <ItemList @editItemStatusAction="editItemStatusAction" @removeItemAction="removeItemAction" :listItems="this.listDone" :title="this.titleDone" />
    </div>
    <Footer />
  </div>
</template>

<script>
  import axios from 'axios'

  import NavBar from './components/NavBar.vue'
  import ItemForm from './components/ItemForm.vue'
  import ItemList from './components/ItemList.vue'
  import Footer from './components/Footer.vue'

  export default {
    name: 'App',
    components: {
      NavBar,
      ItemForm,
      ItemList,
      Footer
    },

    data() {
      return {
        listNotDone: [],
        listDone: [],
        titleDone: 'Bought',
        titleNotDone: 'To buy',
        name: '',
        quantity: 1
      }
    },

    mounted() {
      this.getLists()
    },

    methods: {
      getLists() {
        this.listDone = []
        this.listNotDone = []
        axios.get('http://localhost:3000/backend/project/item')
          .then(response => {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].status == 1) {
                this.listDone.push(response.data[i])
              }
              else {
                this.listNotDone.push(response.data[i])
              }

            }
          })
          .catch(error => {
            console.error(error);
          });
      },

      addItem(name, quantity) {
        axios.post('http://localhost:3000/backend/project/item', {
          name: name,
          quantity: quantity
        })
          .then(response => {
            this.getLists()
          })
          .catch(error => {
            console.error(error);
          });
      },

      deleteItem(itemName) {
        axios.delete(`http://localhost:3000/backend/project/item/${itemName}`)
          .then(response => {
            this.getLists()
          })
          .catch(error => {
            console.error(error);
            // Handle the error if needed
          });
      },

      editItem(item, quantity) {
        axios.put(`http://localhost:3000/backend/project/item/${item.name}`, {
          quantity: quantity
        })
          .then(response => {
            this.getLists()
          })
          .catch(error => {
            console.error(error);
          });
      },

      addItemAction(name, quantity) {
        // this.name = name
        // this.quantity = quantity
        this.addItem(name, quantity)
      },

      removeItemAction(item) {
        this.deleteItem(item.name)
      },

      editItemStatusAction(item) {
        this.editItem(item, null)
      },

      editItemQuantityAction(item, quantity) {
        this.editItem(item, quantity)
      }

    }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  #app {
    height: 100vh;
    background-color: #222;
    color: #FFF;
  }

  #main-container {
    height: 75vh;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
