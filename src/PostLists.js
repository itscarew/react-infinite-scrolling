import React from "react";

const PostLists = ({ posts }) => {
  return (
    <React.Fragment>
      {posts?.map((post) => (
        <div key={post.id} style = {{borderBottom : "1px solid gray"}} >
          <h3> Title : {post.title} </h3>
          <p>Body : {post.body} </p>
        </div>
      ))}
    </React.Fragment>
  );
};

export default PostLists;
