import { useQuery, gql } from "@apollo/client";
import Slider from "react-slick";

const GET_BANNERS = gql`
  query GetBanners {
    BannerCollection(query: "", limit: 3, offset: 0) {
      title
      caption
      layout
      buttonText
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
    }
  }
`;

const Body = () => {
  return (
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">
            Assignment
          </h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Blog example using React.js and dotCMS.{" "}
          </p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Example of a web app using dotCMS to pull in data through GraphQL
          </p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div class="relative pl-16">
              <dt class="text-base font-semibold leading-7 text-gray-900">
                <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <svg
                    class="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </div>
                Deployed to Vercel
              </dt>
              <dd class="mt-2 text-base leading-7 text-gray-600">
                Deployed using Codesandbox and create react app with a few
                clicks.
              </dd>
            </div>
            <div class="relative pl-16">
              <dt class="text-base font-semibold leading-7 text-gray-900">
                <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <svg
                    class="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </div>
                Github repo
              </dt>
              <dd class="mt-2 text-base leading-7 text-gray-600">
                If you want to see the source code click here: repo here
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

const Banner = () => {
  const { loading, error, data } = useQuery(GET_BANNERS);

  if (loading)
    return (
      <div class="bg-white py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">Loading...</div>
      </div>
    );
  if (error) return <p>Error : {error.message}</p>;

  let banners = data.BannerCollection;

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        {banners.map((banner) => {
          return (
            <div class="relative overflow-hidden bg-white">
              <div class="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                  <div class="sm:max-w-lg">
                    <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                      {banner.title}
                    </h1>
                    <p class="mt-4 text-xl text-gray-500">{banner.caption}</p>
                  </div>
                  <div>
                    <div class="mt-10">
                      <div
                        aria-hidden="true"
                        class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                      >
                        <div class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                          <div class="flex items-center space-x-6 lg:space-x-8">
                            <img
                              src={`https://demo.dotcms.com${banner.image.versionPath}`}
                              alt=""
                              class="h-full w-full object-cover object-center"
                            />
                          </div>
                        </div>
                      </div>

                      <a
                        href="#"
                        class="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                      >
                        {banner.buttonText || "Shop now"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      <Body />
    </div>
  );
};
export default Banner;
