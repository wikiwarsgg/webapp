import articles from "../assets/articles.json";

export default () => articles.sort(() => 0.5 - Math.random()).slice(0, 2);
