<template>
    <iframe :srcdoc="code" class="w-full" ref="code"></iframe>
</template>

<script>
    export default {
        name: 'component-render',
        props: ['component'],

        computed: {
            code() {
                const styles = document.querySelectorAll('style');
                let style = '<style>html, body { min-height: 100%; height: 100% }';

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

                return `<div class="twcomponents-container">${style}${this.component.html}</div>`;
            },
        },
    };
</script>

<style scoped>

</style>
