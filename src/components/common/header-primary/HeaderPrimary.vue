<template>
    <header class="header-primary">
        <img src="./img/main-logo.svg" alt="beyond" class="logo" />
        <h1>{{ pagetitle }}</h1>
        <div class="fifty"></div>
    </header>
</template>
<script>
export default {
    data() {
        return {
            pagetitle: 'Tech Lunch',
        };
    },
};
</script>
<style scoped>
header {
    background-color: #FEF200;
    color: #000;
    overflow: hidden;
    padding: 40px 20px 80px;
    text-align: center;
    h1 {
        text-align: center;
        margin: 20px 0 0 0;
        font-family: "Lightning-Handmade-CAPS", "Gotham", "Impact", "Arial Black", sans-serif;
        font-size: 72px;
        font-weight: 900;
        text-transform: uppercase;
    }
    .logo {
        height: 32px;
        max-width: 134px;
    }
}
</style>
