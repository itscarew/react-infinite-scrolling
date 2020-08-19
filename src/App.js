import React, { Component } from "react";
import axios from "axios";
import PostLists from "./PostLists";
import LoadingPost from "./Loading";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      page: 1,
      prevY: 0,
      limit: 10,
    };
  }

  componentDidMount() {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
    this.getPosts(this.state.page, this.state.limit);
  }

  getPosts = (page, limit) => {
    const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
    this.setState({ loading: true });
    axios
      .get(url)
      .then((post) => {
        this.setState({ posts: [...this.state.posts, ...post.data] });
      })
      .catch((err) => {
        this.setState({ loading: false, err: true });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const lastPost = this.state.posts[this.state.posts.length - 1];
      const currentPage = lastPost.userId;
      this.getPosts(currentPage);
      this.setState({ page: currentPage });
    }
    this.setState({ prevY: y });
  }

  render() {
    // Additional css
    const loadingCSS = {
      height: "50px",
      margin: "30px",
    };

    // To change the loading icon behavior
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

    return (
      <div className="container">
        <h1>Posts</h1>
        <div style={{ minHeight: "800px" }}>
          <PostLists posts={this.state.posts} />
        </div>
        <div
          ref={(loadingRef) => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}>
            <LoadingPost />
          </span>
        </div>
      </div>
    );
  }
}

export default App;
