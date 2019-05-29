<template>
    <div id="wrap">
        <Header></Header>
        <Container v-for="n in 40"></Container>
    </div>
</template>

<script>
    import Header from './Header';
    import Container from './Container';

    export default {
        name: 'Wrap',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        components: {
            Header,
            Container
        }
    }
</script>

<style>

</style>
