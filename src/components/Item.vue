<template>
    <div id="item-container">
        <div id="information">
            <h1>Item: {{ item.name }}</h1>
            <h1 v-if="edit">Quantity: {{ item.quantity }}</h1>
            <h1 v-else >Quantity: <input v-model.number="quantity" type="number" name="quantity" id="quantity"><button @click="confirmEditAction">Confirmar</button></h1>
        </div>
        <div id="actions">
            <p v-if="!item.status" @click="editItemQuantityAction">M</p>
            <p @click="removeItemAction">X</p>
            <p @click="editItemStatusAction">C</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Item',

        data() {
            return {
                edit: true,
                quantity: 1
            }
        },

        props: {
            item: {
                type: Object
            }
        },

    methods: {
        removeItemAction() {
            this.$emit('removeItemAction', this.item)
        },

        editItemStatusAction() {
            this.$emit('editItemStatusAction', this.item)
        },

        editItemQuantityAction() {
            this.edit = !this.edit
        },

        confirmEditAction() {
            this.$emit('editItemQuantityAction', this.item, this.quantity)
            this.edit = !this.edit
        }
    }
}
</script>


<style scoped>
    div {
            display: flex;
    }

    #item-container {
        width: 93%;
        align-items: center;
        color: #FFF;
        background-color: #101010;
        border: none;
        padding: 20px 50px;
        border-radius: 46px;
        box-shadow: inset 12px 12px 17px #090909,
            inset -12px -12px 17px #171717;
    }

    #information {
        width: 75%;
        align-items: center;
        justify-content: space-between;
    }

    #actions {
        width: 25%;
        justify-content: space-around;
        align-items: center;
    }

    p {
        transition: 0.3s;
    }

    p:hover{
        cursor: pointer;
        color: #FCBA03;
    }

    h1 {
        display: flex;
        align-items: center;;
    }

    input {
        width: 100px;
        height: 30px;
        border-radius: 10px;
        border: none;
        background-color: #9e9e9e;
        color: 000s;
        text-align: center;
        margin-left: 50px;
        font-size: 32px;
    }

    button {
        margin-left: 50px;
    }
</style>