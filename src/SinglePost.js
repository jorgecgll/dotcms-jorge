import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { ContentBlocks } from "./ContentBlocks";

const GET_BLOG_POST = gql`
  query GetBlogPost($query: String!) {
    BlogCollection(query: $query, limit: 10, offset: 0, sortBy: "score") {
      title
      teaser
      urlTitle
      urlMap
      author {
        firstName
        lastName
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
      blogContent {
        json
      }
    }
  }
`;

const SinglePost = () => {
  const { slug } = useParams();
  console.log("slug", slug);
  const { loading, error, data } = useQuery(GET_BLOG_POST, {
    variables: { query: `+urlMap:/blog/post/${slug}` },
  });

  if (loading)
    return (
      <div class="bg-white py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">Loading...</div>
      </div>
    );
  if (error) return <p>Error : {error.message}</p>;

  console.log("data", data);
  const post = data.BlogCollection[0];

  return (
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {post.title}
          </h2>
          <p class="mt-2 text-lg leading-8 text-gray-600">{post.teaser}</p>
        </div>

        <div class="mx-auto mt-10 max-w-2xl gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none">
          <div>
            <img
              width={"100%"}
              alt={post.image.title}
              src={`https://demo.dotcms.com${post.image.versionPath}`}
            />
            <ContentBlocks content={post.blogContent.json.content} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SinglePost;
