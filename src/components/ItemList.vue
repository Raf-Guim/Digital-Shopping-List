<template>
    <div id="list-container">
        <div id="list">
            <ul>
                <h1>{{ title }}:</h1>
                <Item @editItemQuantityAction="editItemQuantityAction" @editItemStatusAction="editItemStatusAction" @removeItemAction="removeItemAction" v-for=" item in listItems" :item="item" :key="listItems"></Item>
            </ul>
        </div>
    </div>
</template>

<script>
    import Item from './Item.vue'

    export default {
        name: 'ItemList',

        components: {
            Item
        },

        props: {
            listItems: {
                type: Array
            },

            title: {
                type: String
            }
        },

        methods: {
            removeItemAction(item) {
                this.$emit('removeItemAction', item)
            },

            editItemStatusAction(item) {
                this.$emit('editItemStatusAction', item)
            },

            editItemQuantityAction(item, quantity) {
                this.$emit('editItemQuantityAction', item, quantity)
            }
        }
    }
</script>

<style>
    #list {
        margin: 75px 50px;
        min-height: 150px;
    }
    #list-container ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        row-gap: 35px;
    }
</style>