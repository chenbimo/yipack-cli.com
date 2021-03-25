export function getMarkdownArray(books) {
    let bookArray = [];
    for (let book in books) {
        let dirArray = [];
        for (let dir in books[book].dirs) {
            if (books[book].dirs[dir].chapters) {
                let chapterArray = [];
                for (let chapter in books[book].dirs[dir].chapters) {
                    chapterArray.push(books[book].dirs[dir].chapters[chapter]);
                }
                dirArray.push({
                    name: dir,
                    originName: books[book].dirs[dir].originName,
                    chapters: chapterArray
                });
            } else {
                dirArray.push({
                    name: dir,
                    originName: books[book].dirs[dir].originName,
                    file: dir + '.md'
                });
            }
        }
        bookArray.push({
            name: book,
            originName: books[book].originName,
            dirs: dirArray
        });
    }
    return bookArray;
}
export function getMarkdownName(file) {
    let arr = file.split('-');
    if (arr.length > 1 && /^\d+$/.test(arr[0])) {
        return {
            order: Number(arr[0]),
            name: arr.slice(1).join('-')
        };
    } else {
        return {
            order: 99999,
            name: arr[0]
        };
    }
}
