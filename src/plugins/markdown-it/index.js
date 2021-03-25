import Vue from 'vue';
let iterator = require('markdown-it-for-inline');
let hljs = require('highlight.js');
let mk = require('@iktakahiro/markdown-it-katex');
let todo = require('markdown-it-todo');

const markdownIt = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>';
            } catch (__) {
                console.log(__);
            }
        }

        return '<pre class="hljs"><code>' + markdownIt.utils.escapeHtml(str) + '</code></pre>';
    }
})
    .use(iterator, 'url_new_win', 'link_open', function (tokens, idx) {
        let aIndex = tokens[idx].attrIndex('target');

        if (aIndex < 0) {
            tokens[idx].attrPush(['target', '_blank']);
        } else {
            tokens[idx].attrs[aIndex][1] = '_blank';
        }
    })
    .use(mk)
    .use(todo);
Vue.prototype.$MarkdownIt = markdownIt;
