<template>
    <h1><a href="#">Digital Shopping List</a></h1>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<style scoped>
h1 {
    height: 15vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.5em;
    font-weight: 300;
    background-color: #181818;
    padding: 15px 0;
}

a {
    color: #fff;
    text-decoration: none;
    transition: .3s;
}

a:hover {
    color: #FCBA03;
}
</style>