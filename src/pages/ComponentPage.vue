<template>
    <div v-if="component" class="pb-8">
        <div class="m-3 bg-white shadow appearance-none rounded">
            <h2 class="p-4 bg-grey-lighter text-teal-dark font-sans">{{ component.name }} <small class="text-sm text-grey">by <author-link :author="component.author" /></small></h2>
            <p class="p-4 my-4 text-grey-darker rounded bg-grey-lighter m-4" v-text="component.description" v-if="component.description"></p>

            <div class="flex px-3 items-center">
                <h3 class="font-mono text-grey-dark font-light">Source</h3>
                <p class="text-grey text-xs ml-3">(Control + Space to get autocomplete options)</p>
            </div>
            <div class="code-container bg-black">
                <code-editor :source="component.html" @change="refresh"></code-editor>
            </div>

            <component-render :component="component" />

        </div>


        <div class="container mx-auto mt-2 flex justify-between mt-3">
            <div>
                <router-link :to="`/tag/${tag.slug}`" class="pill" v-for="tag in component.tags" v-text="tag.name" :key="tag.slug"></router-link>
            </div>

            <div class="text-grey text-xs">
                {{ component.ago }}
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import CodeEditor from '../components/CodeEditor';
    import ComponentRender from '../components/ComponentRender';

    export default {
        data() {
            return {
                component: null,
            };
        },

        metaInfo() {
            return {
                title: this.component ? `${this.component.name} by ${this.component.author.name}` : null,
                meta: [
                    {
                        name: 'description',
                        content: (this.component ? `Tailwind CSS Component using utilities to make a '${this.component.name}' by ${this.component.author.name}. ${this.component.description}` : null),
                    },
                ],
            };
        },

        async created() {
            const response = await axios.get(`api/components/${this.$route.params.slug}`);

            this.component = response.data.data;
        },

        methods: {
            refresh(newCode) {
                this.component.html = newCode;
            },
        },

        components: {
            CodeEditor,
            ComponentRender,
        },
    };
</script>

