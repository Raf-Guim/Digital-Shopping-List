<template>
    <form action="">
        <div id="name-container">
            <label for="item">Item:</label>
            <input v-model="name" type="text" name="item" id="item" placeholder="Item">
        </div>
        <div id="quantity-container">
            <label for="quantity">Quantity:</label>
            <input v-model.number="quantity" type="number" name="quantity" id="quantity">
        </div>
        <div id="button-container">
            <button @click="addItemAction($event)" type="submit">Adicionar</button>
        </div>
        <!--  -->
    </form>
</template>

<script>
    export default {
        name: 'ItemForm',
        data() {
            return {
                name: '',
                quantity: 1
            }
        },
        methods: {
            addItemAction(e) {
                e.preventDefault()
                this.$emit('addItemAction', this.name, this.quantity)
            }
        }
    }
</script>

<style scoped>
    form {
        width: 100%;
        display: flex;
        align-items: center;
        column-gap: 25px;
        margin: 75px 50px 0px 50px;
    }

    form #name-container, form #quantity-container {
        width: 25%;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }

    #button-container {
        align-self: flex-end;
    }

    #button-container button {
        padding: 10px 20px !important;
        font-size: 1em;
        transition: 0.3s;
    }
    
    #button-container button:hover {
        cursor: pointer;
        color: #FCBA03;
    }

    input, button {
        color: #FFF;
        background-color: #101010;
        border: none;
        padding: 10px 10px;
        border-radius: 46px;
        box-shadow: inset 12px 12px 17px #090909,
            inset -12px -12px 17px #171717;
    }

</style>