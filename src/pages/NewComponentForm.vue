<template>
    <form @submit.prevent="submit" class="pb-8">
        <div class="m-3 bg-white shadow appearance-none rounded">
            <h1 class="font-sans p-3">Submit a component</h1>
            <div class="flex px-3 items-center">
                <h3 class="font-mono text-grey-dark font-light" :class="{ 'text-red' : this.errors.html }">Source</h3>
                <p class="text-grey text-xs ml-3">(Control + Space to get autocomplete options)</p>
            </div>

            <div class="code-container bg-black">
                <code-editor :source="component.html" @change="refresh"></code-editor>
            </div>

            <h3 class="p-3 font-mono text-grey-dark font-light" :class="{ 'text-red' : this.errors.html }">Preview</h3>

            <component-render :component="component" />

            <div class="bg-grey-lighter pb-4">
                <div class="m-4 flex flex-col">
                    <label for="name" class="mb-3 font-bold text-black text-sm" :class="{ 'text-red' : this.errors.name }">Give a name to your component</label>
                    <input type="text" id="name" v-model="component.name" class="form-control" placeholder="The better the name, the easier to find it">
                </div>

                <div class="m-4 flex flex-col">
                    <label for="description" class="mb-3 font-bold text-black text-sm">Describe what it is</label>
                    <textarea type="text" id="description" v-model="component.description" class="form-control" placeholder="(optional)"></textarea>
                </div>
                <div class="m-4 flex flex-col">
                    <label for="description" class="mb-3 font-bold text-black text-sm">Tag it</label>
                    <multiselect
                        :options="tags"
                        :multiple="true"
                        trackBy="name"
                        label="name"
                        v-model="component.tags"
                    />
                </div>

                <div class="m-4 flex flex-col">
                    <label for="username" class="mb-3 font-bold text-black text-sm">Your twitter handle <span class="text-grey font-normal">(optional)</span></label>
                    <input type="text" id="username" v-model="component.username" class="form-control" placeholder="@yourtwitterhandle or post as anonymous">
                </div>

                <div class="flex justify-between mr-4 mt-8 p-4 items-center">
                    <p class="text-grey text-sm">Components will be reviewed before appearing on the site</p>
                    <button class="button button-blue p-4">Submit my component</button>
                </div>
            </div>

        </div>
    </form>
</template>

<script>
    import axios from 'axios';
    import Multiselect from 'vue-multiselect';
    import CodeEditor from '../components/CodeEditor';
    import ComponentRender from '../components/ComponentRender';

    export default {
        data() {
            return {
                component: {
                    name: '',
                    description: '',
                    html: '',
                    tags: [],
                    username: '',
                },
                tags: [],
                errors: {},
            };
        },

        async created() {
            const response = await axios.get('api/tags');
            this.tags = response.data.data;
        },

        methods: {
            refresh(newCode) {
                this.component.html = newCode;
            },

            submit() {
                axios.post('api/components', {
                    name: this.component.name,
                    description: this.component.description,
                    html: this.component.html,
                    tags: this.component.tags.map(item => item.name),
                    username: this.component.username,
                }).then(response => this.$router.push(`/component/${response.data.data.slug}`))
                .catch((error) => {
                    this.errors = error.response.data.errors;
                });
            },
        },

        components: {
            CodeEditor,
            Multiselect,
            ComponentRender,
        },
    };
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
    .multiselect__input {
        width: auto;
    }
</style>
