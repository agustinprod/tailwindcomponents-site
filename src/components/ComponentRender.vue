<template>
    <iframe :srcdoc="code" class="w-full resize max-h-4/5-screen" ref="code" seamless></iframe>
</template>

<script>
    /* eslint-disable no-useless-escape */

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
                            /* Trigger max height directly to avoid the
                            * infinitely resizing on elements with screen relative sizes
                            */

                            if (this.component.html.indexOf('screen') > 0) {
                                this.$refs.code.height = '9999px';
                                return;
                            }

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

                const disableLinks = `<script>
                    Array.prototype.slice.call(document.getElementsByTagName(\'a\')).forEach(function() {
                        this.onclick = function() { return false; }
                     });
                <\/script>`;

                return `<html>
                    <head>
                        ${style}
                    </head>
                    <body>
                        <div class="twcomponents-container">${this.component.html}</div>
                        ${disableLinks}
                    </body>
                </html>`;
            },
        },
    };
</script>
