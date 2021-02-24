import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Grid } from "semantic-ui-react";

import PostCard from '../components/PostCard'

const Home = () => {
  const {
    loading,
    data: { getPosts: posts },
  } = useQuery(FETCH_POSTS_QUERY);

  if (!loading &&posts) {
    console.log(posts);
  }

  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>

      <Grid.Row>
        {loading ? (
          <h2>Loading posts...</h2>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;
