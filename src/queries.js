import { useQuery, gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    ProductCollection(
      query: "+title:snow"
      limit: 10
      offset: 0
      sortBy: "score"
    ) {
      title
      urlMap
      category {
        name
        inode
      }
      retailPrice
      image {
        versionPath
      }
    }
  }
`;

export const GET_BLOG_POSTS = gql`
  query GetBlogPosts {
    BlogCollection(query: "", limit: 10, offset: 0, sortBy: "score") {
      title
      urlTitle
      urlMap
      teaser
      blogContent {
        json
      }
      author {
        firstName
        lastName
        title
        profilePhoto {
          versionPath
        }
      }
      image {
        modDate
        sha256
        mime
        title
        versionPath
        focalPoint
        path
        isImage
        idPath
        size
        name
        width
        height
      }
      postingDate
      tags
    }
  }
`;
