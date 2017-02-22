<template>
    <div id="app">
        <header-primary></header-primary>
        <router-view></router-view>
    </div>
</template>
<script>
import HeaderPrimary from './components/common/header-primary/HeaderPrimary';

export default {
    name: 'app',
    components: {
        HeaderPrimary,
    },
};
</script>
<style>
@import "./assets/css/normalize.css";
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: #fff;
}
</style>
