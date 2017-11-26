<template>
    <codemirror
            ref="editor"
            :code="source"
            :options="editorOptions"
            @change="onChange"
    ></codemirror>
</template>

<script>
    /* eslint-disable no-unused-vars,import/no-extraneous-dependencies,func-names,no-const-assign,no-plusplus,eqeqeq,prefer-template,prefer-arrow-callback,max-len */

    import { codemirror, CodeMirror } from 'vue-codemirror';
    import TailwindClasses from '../tailwind-classes';

    require('codemirror/addon/hint/show-hint.js');
    require('codemirror/addon/hint/xml-hint.js');
    require('codemirror/addon/hint/html-hint.js');
    require('codemirror/mode/htmlmixed/htmlmixed.js');

    const orig = CodeMirror.hint.html;

    CodeMirror.hint.html = function (cm) {
        const inner = orig(cm) || { from: cm.getCursor(), to: cm.getCursor(), list: [] };

        const list = TailwindClasses;
        const cursor = cm.getCursor();
        const currentLine = cm.getLine(cursor.line);
        let start = cursor.ch;
        let end = start;
        while (end < currentLine.length && /[\w$]+/.test(currentLine.charAt(end))) ++end;
        while (start && /[\w|\-$]+/.test(currentLine.charAt(start - 1))) --start;
        const curWord = start != end && currentLine.slice(start, end);
        const regex = new RegExp('^' + curWord, 'i');

        const autocompleteOptions = (!curWord ? list : list.filter(function (item) {
            return item.match(regex);
        })).sort();

        inner.list = autocompleteOptions;

        return inner;
    };

    export default {
        props: ['source'],
        data() {
            return {
                editorOptions: {
                    tabSize: 4,
                    mode: 'text/html',
                    lineNumbers: true,
                    foldGutter: true,
                    height: 'auto',
                    theme: 'monokai',
                    extraKeys: { 'Ctrl-Space': 'autocomplete' },
                    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                },
            };
        },

        methods: {
            onChange(newCode) {
                this.$emit('change', newCode);
            },
        },

        components: {
            codemirror,
        },
    };
</script>


<style>
    .CodeMirror {
    }
    .CodeMirror-hints {
        position: absolute;
        z-index: 10;
        overflow: hidden;
        list-style: none;

        margin: 0;
        padding: 2px;

        -webkit-box-shadow: 2px 3px 5px rgba(0,0,0,.2);
        -moz-box-shadow: 2px 3px 5px rgba(0,0,0,.2);
        box-shadow: 2px 3px 5px rgba(0,0,0,.2);
        border-radius: 3px;
        border: 1px solid silver;

        background: white;
        font-size: 90%;
        font-family: monospace;

        max-height: 20em;
        overflow-y: auto;
    }

    .CodeMirror-hint {
        margin: 0;
        padding: 0 4px;
        border-radius: 2px;
        white-space: pre;
        color: black;
        cursor: pointer;
    }

    li.CodeMirror-hint-active {
        background: #08f;
        color: white;
    }
</style>
