<template>
    <iframe :srcdoc="code" class="w-full resize" ref="code"></iframe>
</template>

<script>
    export default {
        name: 'component-render',
        props: ['component'],

        computed: {
            code() {
                const styles = document.querySelectorAll('style, link');
                let style = '';

                for (let i = 0; i < styles.length; i += 1) {
                    style += styles[i].outerHTML;
                }

                const tryToCalculateHeight = () => {
                    requestAnimationFrame(() => {
                        if (
                            !this.$refs.code ||
                            !this.$refs.code.contentWindow ||
                            !this.$refs.code.contentWindow.document ||
                            !this.$refs.code.contentWindow.document.body ||
                            !this.$refs.code.contentWindow.document.body.innerHTML
                        ) {
                            tryToCalculateHeight();
                        } else {
                            this.$refs.code.height = `${this.$refs.code.contentWindow.document.body.scrollHeight}px`;

                            // external images will cause a reflow
                            // TODO: Investigate alternatives
                            setTimeout(() => {
                                tryToCalculateHeight();
                            }, 200);
                        }
                    });
                };

                tryToCalculateHeight();

                return `<html><head>${style}</head><body><div class="twcomponents-container">${this.component.html}</div></body></html>`;
            },
        },
    };
</script>

<style scoped>

</style>
