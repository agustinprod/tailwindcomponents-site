<template>
    <div class="rounded overflow-hidden shadow mb-6 px-6 pt-6 pb-6 bg-white text-black hover:shadow-lg">

        <router-link :to="`/component/${component.slug}`" class="font-sans text-teal-dark hover:text-teal text-xl">
            {{ component.name }}
            <small class="text-xs text-grey">by <author-link class="text-teal-darker" :author="component.author" /> &bull; {{ component.ago }}</small>
        </router-link>

        <p class="my-4 text-grey-darker italic" v-text="component.description"></p>

        <div class="flex">
            <div class="w-1/2 hidden lg:block">
                <pre class="language-html"><code v-text="component.html"></code></pre>
            </div>
            <div class="w-full w-1/2:lg bg-grey-lighter flex justify-center items-center p-4" v-html="component.html"></div>
        </div>

        <div class="flex justify-between mt-3">
            <div>
                <router-link :to="`/tag/${tag.slug}`" class="pill" v-for="tag in component.tags" v-text="tag.name" :key="tag.slug"></router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tailwind-component',
        props: ['component'],
    };
</script>
