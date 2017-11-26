<template>
    <div id="app" class="flex flex-col min-h-screen border-t-2 border-teal">

        <router-link to="/" class="container mx-auto my-8 flex flex-col justify-center items-center font-sans">
            <h1 class="text-4xl sm:text-5xl text-teal-dark font-thin tracking-tight sm:tracking-wide">Tailwind<span class="text-orange">Components</span></h1>
            <p class="text-sm text-grey-dark tracking-wide">A repository for community components</p>
        </router-link>


        <div class="pb-8">
            <router-view />
        </div>

        <router-link to="/new" class="hidden sm:block absolute pin-t pin-r m-4 bg-transparent hover:bg-orange text-teal-dark font-semibold hover:text-white py-2 px-4 border border-teal hover:border-transparent rounded">
            Submit your own
        </router-link>

        <div class="text-center text-grey text-xs mt-auto mb-3 px-3">
            <p>
                Made with ❤️ by <a class="text-grey-darker" href="https://twitter.com/killgt">@killgt</a> @ Málaga, Spain &bull;
                Tailwind is a Utility Framework by
                <a href="https://twitter.com/adamwathan">@adamwathan</a>,
                <a href="https://twitter.com/reinink">@reinink</a>,
                <a href="https://twitter.com/davidhemphill">@davidhemphill</a> and
                <a href="https://twitter.com/steveschoger">@steveschoger</a>
                &bull;
                Check the docs @ <a class="text-grey-darker" href="https://tailwindcss.com/">tailwindcss.com</a>
            </p>
            <p>This is open source project, check the source at <a href="https://github.com/killgt/tailwindcomponents">github.com</a></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app',

        data() {
            return {
            };
        },


        components: {
        },
    };
</script>

<style lang="sass">
    @import './assets/sass/main'

    .fade-enter-active, .fade-leave-active
        transition: opacity .5s, transform .5s

    .fade-enter, .fade-leave-to
        opacity: 0
        transform: translateY(50px)

</style>
