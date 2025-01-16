// User Class
class User {
    static userCount = 0;

    constructor(userId, name, email, role) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
        User.userCount++;
    }

    login() {
        console.log(`${this.name} has logged in.`);
    }

    logout() {
        console.log(`${this.name} has logged out.`);
    }

    static getUserCount() {
        return User.userCount;
    }
}

// Reader Class (inherits from User)
class Reader extends User {
    constructor(userId, name, email) {
        super(userId, name, email, "Reader");
    }

    viewArticles() {
        console.log(`${this.name} is viewing articles.`);
    }

    commentOnArticle(articleId, comment) {
        console.log(
            `${this.name} commented on article ${articleId}: ${comment}`,
        );
    }
}

// Journalist Class (inherits from User)
class Journalist extends User {
    constructor(userId, name, email) {
        super(userId, name, email, "Journalist");
    }

    writeArticle(title, content) {
        console.log(`${this.name} wrote an article titled "${title}".`);
        return new Article(title, content, this.name);
    }

    submitArticle(article) {
        console.log(
            `${this.name} submitted the article titled "${article.title}".`,
        );
        article.status = "Submitted";
    }
}

// Editor Class (inherits from User)
class Editor extends User {
    constructor(userId, name, email) {
        super(userId, name, email, "Editor");
    }

    editArticle(article, newContent) {
        console.log(
            `${this.name} edited the article titled "${article.title}".`,
        );
        article.content = newContent;
    }

    approveArticle(article) {
        console.log(
            `${this.name} approved the article titled "${article.title}".`,
        );
        article.status = "Approved";
    }
}

// Admin Class (inherits from User)
class Admin extends User {
    constructor(userId, name, email) {
        super(userId, name, email, "Admin");
    }

    manageUsers() {
        console.log(`${this.name} is managing users.`);
    }

    static deleteUser(user) {
        console.log(`Admin deleted user ${user.name}.`);
        User.userCount--;
    }
}

// Article Class
class Article {
    static articleCount = 0;

    constructor(title, content, author) {
        this.articleId = ++Article.articleCount;
        this.title = title;
        this.content = content;
        this.author = author;
        this.status = "Draft";
    }

    publish() {
        console.log(`Article titled "${this.title}" has been published.`);
        this.status = "Published";
    }

    updateStatus(newStatus) {
        console.log(
            `Article titled "${this.title}" status updated to ${newStatus}.`,
        );
        this.status = newStatus;
    }

    static getArticleCount() {
        return Article.articleCount;
    }
}

// Comment Class
class Comment {
    static commentCount = 0;

    constructor(content, author, articleId) {
        this.commentId = ++Comment.commentCount;
        this.content = content;
        this.author = author;
        this.articleId = articleId;
    }

    addComment() {
        console.log(
            `Comment by ${this.author} on article ${this.articleId}: ${this.content}`,
        );
    }

    deleteComment() {
        console.log(
            `Comment by ${this.author} on article ${this.articleId} has been deleted.`,
        );
    }

    static getCommentCount() {
        return Comment.commentCount;
    }
}

//  User subclasses
const reader1 = new Reader(1, "Njoku", "njoku@gmail.com");
const journalist1 = new Journalist(2, "Kelechi", "kelechi23@gmail.com");
const editor1 = new Editor(3, "Tappi", "tappimessi@gmail.com");
const admin1 = new Admin(4, "temi", "temi@gmail.com");
//  Article subclass
const article1 = journalist1.writeArticle(
    "Goodnews",
    "Barcelona Won real madrid 5-2.",
);
journalist1.submitArticle(article1);

const article2 = journalist1.writeArticle(
    "Breaking News",
    "Njoku is the best midfielder in the world.",
);
journalist1.submitArticle(article1);

const article3 = journalist1.writeArticle(
    "FakeNews",
    "Ronaldo  Won World Cup.",
);
journalist1.submitArticle(article1);
// Editor reviews and approves the article
editor1.editArticle(article1, "Updated content of the breaking news article.");
editor1.approveArticle(article1, article2, article3);
// Comment
const comment1 = new Comment("Great article!", "Njoku", article1.articleId);
comment1.addComment();

// Admin temi manages users
admin1.manageUsers();
Admin.deleteUser(reader1);

// Displaying some information
console.log(`Total Users: ${User.getUserCount()}`);
console.log(`Total Articles: ${Article.getArticleCount()}`);
console.log(`Total Comments: ${Comment.getCommentCount()}`);
