<template>
    <a :href="`https://twitter.com/${author.name}`" v-if="!author.isAnon">@{{ author.name }}</a>
    <span v-else>{{ author.name }}</span>
</template>

<script>
    export default {
        name: 'author-link',
        props: ['author'],
    };
</script>
