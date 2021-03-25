<template>
    <div class="page-index">
        <div class="layout-head">
            <a class="logo" href="index.html?menu=index">
                <img class="chensuiyi" src="@src/assets/images/logo.png" />
                <!-- <img class="self" src="@src/assets/images/self.png" /> -->
                <div class="logo-text">yipack-cli（易打包）</div>
                <div class="logo-tips">专注于打造项目快速开发生态圈</div>
            </a>
            <div class="entry">
                <div v-if="screenWidth < 1200" class="square menu bg-contain" :style="{ backgroundImage: 'url(' + require('@src/assets/images/menu.png') + ')' }" @click="on_toggleMenu()"></div>
            </div>
        </div>
        <div class="layout-menu" :class="{ active: screenWidth < 1200 && isShowMenu === 'yes' }">
            <div class="menu-lists">
                <div v-for="(menu, index) in menuArray" :key="index" class="menu-line" :class="{ active: menu.targetName === menuName }">
                    <div class="menu-item iconfont" :href="menu.href + '?menu=' + menu.tag" @click="switchMenu(menu)">
                        {{ menu.targetName }}
                    </div>
                </div>
            </div>
        </div>
        <div class="layout-main">
            <div class="comp-book-panel" :class="{ active: screenWidth < 800 && isShowMenu === 'yes' }">
                <!-- 通用书籍面板 -->
                <div v-for="(book, bookIndex) in bookArray" :key="bookIndex" class="books" :class="{ active: book.targetName === bookName }">
                    <div class="book-title fx" :class="{ active: book.targetName === bookName }" @click="switchBook(book)">{{ book.targetName }}</div>
                    <div v-for="(dir, dirIndex) in dirArray" :key="dirIndex" class="dirs" :class="{ active: dir.targetName === dirName }">
                        <div class="dir-title fx" :class="{ active: dir.targetName === dirName }" @click="switchDir(dir)">{{ dir.targetName }}</div>
                        <div v-for="(chapter, chapterIndex) in chapterArray" :key="chapterIndex" class="chapters" :class="{ active: chapter.targetName === chapterName }">
                            <div v-if="chapter.order !== 99999" class="chapter-title" :title="chapter.targetName" :class="{ active: chapter.targetName === chapterName }" @click="switchChapter(chapter)">{{ chapter.targetName }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="layout-content" class="layout-content">
                <div class="markdown-body" v-html="markdownContent"></div>
            </div>
        </div>

        <div class="layout-mask"></div>
    </div>
</template>

<script>
// 自动导入开始（勿动）------------------------------------------------------
let Tool = require('@src/utils/tool.js');
// 菜单数组
let menuObject = {};
let menuArray = [];
let RImport = require.context('@src/markdown', true, /.+\.md$/);
RImport.keys().map((path, pathIndex) => {
    let pathNames = path.replace('./', '').replace('.md', '').split('/');
    let pathLength = pathNames.length;
    if (pathLength < 3 || pathLength > 4) {
        return;
    }
    // 名称数组
    let namesArray = [
        {
            level: 'menu'
        },
        {
            level: 'book'
        },
        {
            level: 'dir'
        },
        {
            level: 'chapter'
        }
    ];
    pathNames.forEach((item, index) => {
        let res = Tool.getMarkdownName(item);
        namesArray[index].originName = item;
        namesArray[index].targetName = res.name;
        namesArray[index].order = res.order;
    });
    // 名称对象
    let namesObject = _.keyBy(namesArray, 'level');

    // 菜单
    if (!menuObject[namesObject.menu.targetName]) {
        menuObject[namesObject.menu.targetName] = {
            targetName: namesObject.menu.targetName,
            originName: namesObject.menu.originName,
            order: namesObject.menu.order,
            books: {}
        };
    }

    // 书籍
    let books = menuObject[namesObject.menu.targetName].books;
    if (!books[namesObject.book.targetName]) {
        books[namesObject.book.targetName] = {
            targetName: namesObject.book.targetName,
            originName: namesObject.book.originName,
            order: namesObject.dir.order,
            dirs: {}
        };
    }

    // 目录
    let dirs = books[namesObject.book.targetName].dirs;
    if (pathLength === 3) {
        if (!dirs[namesObject.dir.targetName]) {
            dirs[namesObject.dir.targetName] = {
                targetName: namesObject.dir.targetName,
                originName: namesObject.dir.originName,
                order: namesObject.dir.order,
                file: namesObject.dir.originName + '.md'
            };
        }
    }

    if (pathLength === 4) {
        if (!dirs[namesObject.dir.targetName]) {
            dirs[namesObject.dir.targetName] = {
                targetName: namesObject.dir.targetName,
                originName: namesObject.dir.originName,
                order: namesObject.dir.order,
                chapters: {}
            };
        }

        // 章节
        let chapters = dirs[namesObject.dir.targetName].chapters;
        if (!chapters[namesObject.chapter.targetName]) {
            chapters[namesObject.chapter.targetName] = {
                targetName: namesObject.chapter.targetName,
                originName: namesObject.chapter.originName,
                order: namesObject.chapter.order,
                file: namesObject.chapter.originName + '.md'
            };
        }
    }
});
// 自动导入结束（勿动）------------------------------------------------------
export default {
    name: 'Index',
    data() {
        return {
            menuObject: {},
            menuArray: [],
            menuName: '',
            bookObject: {},
            bookArray: [],
            bookName: '',
            dirObject: {},
            dirArray: [],
            dirName: '',
            chapterObject: {},
            chapterArray: [],
            chapterName: '',
            markdownContent: ''
        };
    },

    created() {
        this.menuObject = menuObject;
        this.menuArray = _.sortBy(this.menuObject, ['order']);
        this.menuName = this.menuArray[0].targetName;
        this.init();
    },
    mounted() {
        this.$nextTick(() => {
            _.delay(this.calcScreenWidth, 1000);
        });
        window.addEventListener('resize', _.debounce(this.calcScreenWidth, 300));
    },
    methods: {
        init() {
            this.resetMenu();
            let query = this.$route.query;
            if (query.menuName !== undefined && query.bookName !== undefined && query.dirName !== undefined && query.chapterName !== undefined) {
                this.menuName = query.menuName;
                this.bookName = query.bookName;
                this.dirName = query.dirName;
                this.chapterName = query.chapterName;
                this.bookObject = this.menuObject[this.menuName].books;
                this.bookArray = _.sortBy(this.bookObject, ['order']);
                this.dirObject = this.bookObject[this.bookName].dirs;
                this.dirArray = _.sortBy(this.dirObject, ['order']);
                this.chapterObject = this.dirObject[this.dirName].chapters;
                this.chapterArray = _.sortBy(this.chapterObject, ['order']);
            }
            this.renderMarkdown();
        },
        calcScreenWidth() {
            let width = window.innerWidth;
            this.YiMutation({ path: 'screenWidth', data: width });
            if (width >= 1200) {
                this.YiMutation({ path: 'isShowMenu', data: 'no' });
            }
        },
        on_toggleMenu() {
            let data = this.isShowMenu === 'yes' ? 'no' : 'yes';
            this.YiMutation({ path: 'isShowMenu', data: data });
        },
        resetMenu() {
            this.bookObject = this.menuObject[this.menuName].books;
            this.bookArray = _.sortBy(this.bookObject, ['order']);
            this.bookName = this.bookArray[0].targetName;
            this.dirObject = this.bookObject[this.bookName].dirs;
            this.dirArray = _.sortBy(this.dirObject, ['order']);
            this.dirName = this.dirArray[0].targetName;
            this.chapterObject = this.dirObject[this.dirName].chapters;
            this.chapterArray = _.sortBy(this.chapterObject, ['order']);
            this.chapterName = this.chapterArray[0].targetName;
        },
        switchMenu(menu) {
            this.menuName = menu.targetName;
            this.bookObject = this.menuObject[this.menuName].books;
            this.bookArray = _.sortBy(this.bookObject, ['order']);
            this.bookName = this.bookArray[0].targetName;
            this.dirObject = this.bookObject[this.bookName].dirs;
            this.dirArray = _.sortBy(this.dirObject, ['order']);
            this.dirName = this.dirArray[0].targetName;
            this.renderChapter();
            this.setRouteParams();
            this.renderMarkdown();
        },
        switchBook(book) {
            this.bookName = book.targetName;
            this.dirObject = this.bookObject[this.bookName].dirs;
            this.dirArray = _.sortBy(this.dirObject, ['order']);
            this.dirName = this.dirArray[0].targetName;
            this.renderChapter();
            this.setRouteParams();
            this.renderMarkdown();
        },
        switchDir(dir) {
            this.dirName = dir.targetName;
            this.renderChapter();
            this.setRouteParams();
            this.renderMarkdown();
        },
        switchChapter(chapter) {
            this.chapterName = chapter.targetName;
            this.setRouteParams();
            this.renderMarkdown();
        },
        renderChapter() {
            if (this.dirObject[this.dirName].chapters) {
                this.chapterObject = this.dirObject[this.dirName].chapters;
                this.chapterArray = _.sortBy(this.chapterObject, ['order']);
                this.chapterName = this.chapterArray[0].targetName;
            } else {
                this.chapterObject = {};
                this.chapterArray = [];
                this.chapterName = '';
            }
        },
        setRouteParams() {
            if (this.screenWidth < 1200) {
                this.YiMutation({ path: 'isShowMenu', data: 'no' });
            }
            this.$router.push({
                query: {
                    menuName: this.menuName,
                    bookName: this.bookName,
                    dirName: this.dirName,
                    chapterName: this.chapterName
                }
            });
        },
        renderMarkdown() {
            this.$nextTick(() => {
                try {
                    let menu = this.menuObject[this.menuName];
                    let book = menu.books[this.bookName];
                    let dir = book.dirs[this.dirName];
                    if (dir.chapters) {
                        let chapter = dir.chapters[this.chapterName];
                        let file = require('@src/markdown/' + `${menu.originName}/${book.originName}/${dir.originName}/${chapter.file}`);
                        this.markdownContent = this.$MarkdownIt.render(file);
                    } else {
                        let file = require('@src/markdown/' + `${menu.originName}/${book.originName}/${dir.file}`);
                        this.markdownContent = this.$MarkdownIt.render(file);
                    }
                } catch (err) {
                    console.log(err);
                    this.markdownContent = '文件未找到，请确认地址正确......';
                }
            });
        }
    }
};
</script>

<style lang="scss">
.page-index {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .layout-mask {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(255, 255, 255, 0.6);
        z-index: 8;
        display: none;
    }
    .layout-menu {
        position: absolute;
        top: $head-height;
        bottom: 0;
        left: 0;
        width: $menu-width;
        border-right: 1px solid #dddddd;
        background-color: $menu-back-color;
        font-size: 16px;
        .menu-lists {
            padding: 10px 4px;
            .menu-line {
                height: 46px;
                padding: 0 10px;
                cursor: pointer;
                border-radius: 4px;
                overflow: hidden;
                &:hover {
                    background-color: #e3e8f0;
                }
                &.active {
                    background-color: #e3e8f0;
                    box-shadow: inset 3px 0 0 0 #3385ff;
                    color: #ea5757;
                    font-weight: bold;
                }
            }
            .menu-item {
                display: flex;
                align-items: center;
                border-bottom: 1px solid #eeeeee;
                height: 100%;
            }
        }
    }
    // 布局
    .layout-head {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: $head-height;
        border-bottom: 1px solid #dddddd;
        background-color: $head-back-color;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo {
            display: flex;
            align-items: center;
            height: 70%;
            cursor: pointer;
            img {
                height: 100%;
            }
            .chensuyi {
            }
            .logo-text {
                font-size: 20px;
                padding-left: 10px;
                font-weight: bold;
                color: #137cbd;
            }
            .logo-tips {
                color: #ababab;
            }
        }
        .entry {
            display: flex;
            .button {
                height: 100%;
                border: 1px solid #dddddd;
                padding: 0 10px;
                background-color: #fff;
                border-radius: 10px;
                transition: all 0.2s;
                &:hover {
                    background-color: #f7f7f7;
                    border: 1px solid #cccccc;
                }
            }
            .square {
                display: flex;
                justify-content: center;
                align-items: center;
                height: $head-height - 20px;
                width: $head-height - 20px;
                margin-left: 10px;
                cursor: pointer;
                font-size: 26px;
                .icon {
                    margin-right: 0;
                }
            }
        }
    }
    .layout-main {
        display: flex;
        position: absolute;
        top: $head-height;
        left: $menu-width;
        right: 0;
        bottom: 0;
        background-color: $main-back-color;
    }
    .layout-action {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: $layout-action-height;
        background-color: $layout-action-background-color;
        border-bottom: 1px solid $layout-border-color;
    }
    .layout-content {
        position: relative;
        background-color: #fff;
        flex: 1 1 100%;
        overflow-y: auto;
        overflow-x: hidden;
        .content,
        .markdown-body {
            padding: 10px 10px 50px;
        }
        .markdown-body {
            img {
                max-width: 960px;
                border: 1px solid #eeeeee;
            }
        }
        .iframe-body {
            width: 100%;
            height: 100%;
        }
    }
    .comp-book-panel {
        width: 300px;
        border-right: 1px solid #dddddd;
        background-color: #f5f5f5;
        overflow-y: auto;
        .books {
            background-color: #f1f2f3;
            .book-title {
                display: flex;
                align-items: center;
                line-height: 40px;
                border-bottom: 1px solid #dddddd;
                padding-left: 20px;
                font-size: 16px;
                color: #795548;
                &:hover,
                &.active {
                    background-color: #fff0c2;
                    &::before {
                        background-color: #f3bd1d;
                    }
                }
                &::before {
                    content: '';
                    display: inline-block;
                    width: 10px;
                    height: 14px;
                    max-width: 10px;
                    min-width: 10px;
                    margin-right: 6px;
                    background-color: #cccccc;
                    border-radius: 7px;
                }
            }
        }
        .dirs {
            background-color: #f5f5f5;
            font-size: 14px;
            display: none;
            .dir-title {
                display: flex;
                align-items: center;
                line-height: 34px;
                padding-left: 40px;
                color: #3f51b5;
                &:hover,
                &.active {
                    background-color: #c7e3f1;
                    &::before {
                        background-color: #67c5f5;
                    }
                }
                &::before {
                    content: '';
                    display: inline-block;
                    width: 4px;
                    height: 14px;
                    max-width: 4px;
                    min-width: 4px;
                    margin-right: 6px;
                    background-color: #cccccc;
                }
            }
        }
        .chapters {
            display: none;
            .chapter-title {
                display: flex;
                align-items: center;
                padding-left: 60px;
                height: 30px;
                padding-right: 10px;
                font-size: 14px;

                overflow: hidden;
                word-break: keep-all;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: #607d8b;
                &:hover,
                &.active {
                    background-color: #fde7e0;
                    &::before {
                        background-color: #e33;
                    }
                }
                &::before {
                    content: '';
                    display: inline-block;
                    width: 4px;
                    height: 4px;
                    margin-top: 4px;
                    border-radius: 50%;
                    background-color: #999999;
                    margin-right: 6px;
                }
            }
        }
        .book-title,
        .dir-title,
        .chapter-title {
            word-break: keep-all;
            white-space: nowrap;
            cursor: pointer;
        }
        .books {
            &.active {
                .dirs {
                    display: block;
                    &.active {
                        .chapters {
                            display: block;
                            &.active {
                                .chapter-title {
                                    color: #e33;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 1200px) {
    .page-index {
        .layout-menu {
            position: absolute;
            right: 0;
            left: unset;
            top: 50px;
            bottom: 0;
            z-index: 9;
            border-left: 1px solid #dddddd;
            border-right: 0;
            display: none;
            &.active {
                display: block;
            }
            .menu-lists {
                .menu-line {
                    &:hover {
                    }
                    &.active {
                        box-shadow: inset -3px 0 0 0 #3385ff;
                    }
                }
            }
        }
        .layout-main {
            left: 0;
        }
        .markdown-body {
            img {
                width: 100%;
            }
        }
    }
}
@media screen and (max-width: 800px) {
    .page-index {
        .layout-menu {
            width: 190px;
        }
        .markdown-body {
            img {
                width: 100%;
            }
        }
    }
}
@media screen and (max-width: 800px) and (min-width: 440px) {
    .page-index {
        .comp-book-panel {
            position: fixed;
            top: 50px;
            right: 190px;
            bottom: 0;
            max-width: 260px;
            z-index: 10;
            border-left: 1px solid #dddddd;
            border-right: 0;
            display: none;
            &.active {
                display: block;
            }
        }
        .markdown-body {
            img {
                width: 100%;
            }
        }
    }
}
@media screen and (max-width: 440px) {
    .page-index {
        .comp-book-panel {
            position: fixed;
            top: 50px;
            left: 0;
            right: 190px;
            bottom: 0;
            z-index: 10;
            width: auto;
            border-left: 1px solid #dddddd;
            border-right: 0;
            display: none;
            &.active {
                display: block;
            }
        }
        .markdown-body {
            img {
                width: 100%;
            }
        }
    }
}
</style>
