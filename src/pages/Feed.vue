<template>
    <div>
        <div class="container mx-auto flex flex-col items-center">
            <input type="search" class="shadow appearance-none border rounded w-1/2 py-2 px-3 text-grey-darker" placeholder="Search a component..." v-model="query" @keyup="search">

            <div class="flex flex-wrap mt-2 min-h-6 justify-center">
                <router-link :to="`/tag/${tag.slug}`" class="pill mb-2" v-for="tag in tags" :key="tag.slug" v-text="tag.name"></router-link>
            </div>
        </div>

        <div class="container mx-auto mt-6">
            <h2 class="text-center text-grey font-light text-md mb-3 font-sans" v-if="!tag">Latest components</h2>
            <h2 class="text-center text-grey font-light text-md mb-3 font-sans" v-else-if="query">Search results for '{{ query }}'</h2>
            <h2 class="text-center text-grey font-light text-md mb-3 font-sans" v-else>Tag: {{ tag }}</h2>

            <spinner line-fg-color="#f6993f" v-if="loading"></spinner>

            <transition name="fade" >
                <div class="flex flex-col" v-if="!loading">
                    <tailwind-list-component :component="c" v-for="c in components" :key="c.id"/>
                </div>
            </transition>

            <div v-if="!loading && components.length === 0" class="text-center text-grey-dark mt-6">No results</div>

            <div class="flex justify-center mt-3" v-if="tag">
                <router-link v-if="links.prev" :to="`/tag/${tag}/${meta.current_page - 1}`" class="button button-orange mr-6">Prev</router-link>
                <router-link v-if="links.next" :to="`/tag/${tag}/${meta.current_page + 1}`" class="button button-orange">Next</router-link>
            </div>

            <div class="flex justify-center mt-3" v-else>
                <router-link v-if="links.prev" :to="`/${meta.current_page - 1}`" class="button button-orange mr-6">Prev</router-link>
                <router-link v-if="links.next" :to="`/${meta.current_page + 1}`" class="button button-orange">Next</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Spinner from 'vue-simple-spinner';
    import TailwindListComponent from '../components/TailwindListComponent';

    let timeout = false;

    export default {
        data() {
            return {
                components: [],
                tags: [],
                links: {},
                meta: {},
                tag: false,
                query: '',
                loading: true,
            };
        },

        metaInfo() {
            return {
                title: this.tag || 'Latest components',
                meta: [
                    {
                        name: 'description',
                        content: 'A repository for community components using Tailwind CSS, buttons, cards, forms, inputs, layouts and more',
                    },
                ],
            };
        },

        watch: {
            // eslint-disable-next-line object-shorthand
            '$route'(to) {
                this.load(to.params.page || 1, to.params.tag || '');
                window.scrollTo(0, 0);
            },
        },


        created() {
            this.load(this.$route.params.page || 1, this.$route.params.tag || '');

            axios.get('api/tags').then((response) => {
                this.tags = response.data.data;
            });
        },

        methods: {

            load(page, tag) {
                this.tag = tag;

                this.loading = true;

                return axios.get(`api/components?page=${page}&tag=${tag}&q=${this.query}`).then((response) => {
                    this.components = response.data.data;
                    this.links = response.data.links;
                    this.meta = response.data.meta;
                    this.loading = false;
                });
            },

            search() {
                if (timeout) {
                    clearTimeout(timeout);
                }

                timeout = setTimeout(() => this.load(1, ''), 500);
            },
        },

        components: {
            TailwindListComponent,
            Spinner,
        },
    };
</script>
