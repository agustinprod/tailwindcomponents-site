<template>
    <div class="rounded overflow-hidden shadow mb-6 px-6 pt-6 pb-6 bg-white text-black border-t-4 border-teal group">

        <router-link :to="`/component/${component.slug}`" class="font-sans text-teal-dark hover:text-teal text-xl">
            {{ component.name }}
            <small class="text-xs text-grey">by <author-link class="text-teal-darker" :author="component.author" /> &bull; {{ component.ago }}</small>
        </router-link>

        <p class="my-4 text-grey-darker italic" v-text="component.description"></p>

        <component-render :component="component" />


        <div class="flex justify-between mt-3">
            <div>
                <router-link :to="`/tag/${tag.slug}`" class="pill" v-for="tag in component.tags" v-text="tag.name" :key="tag.slug"></router-link>
            </div>
            <router-link :to="`/component/${component.slug}`" class="font-sans text-teal-light">
                See component details
            </router-link>
        </div>
    </div>
</template>

<script>
    import ComponentRender from './ComponentRender';

    export default {
        name: 'tailwind-component',
        props: ['component'],
        components: {
            ComponentRender,
        },
    };
</script>
