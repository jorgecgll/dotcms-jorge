export const Bold = ({ children }) => <strong>{children}</strong>;
export const Italic = ({ children }) => <em>{children}</em>;
export const Strike = ({ children }) => <s>{children}</s>;
export const Underline = ({ children }) => <u>{children}</u>;
export const DotLink = ({ attrs: { href, target }, children }) => {
  const regEx = /https?:\/\//;

  return regEx.test(href) ? (
    <a href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  ) : (
    <Link href={href} target={target || "_self"}>
      {children}
    </Link>
  );
};

const nodeMarks = {
  link: DotLink,
  bold: Bold,
  underline: Underline,
  italic: Italic,
  strike: Strike,
};

export const TextNode = (props) => {
  const { marks = [], text } = props;
  const mark = marks[0] || { type: "", attrs: {} };
  const newProps = { ...props, marks: marks.slice(1) };
  const Component = nodeMarks[mark?.type];

  if (!Component) {
    return text;
  }

  return (
    <Component attrs={mark.attrs}>
      <TextNode {...newProps} />
    </Component>
  );
};

export const DotImage = ({ attrs: { textAlign, data } }) => {
  const { asset, title } = data;

  return (
    <img
      style={{ textAlign: textAlign }}
      width="800"
      height="400"
      alt={`Cover Image for ${title}`}
      className={``}
      src={`https://demo.dotcms.com${asset}`}
    />
  );
};

export const DotContent = (props) => {
  const { title, description, image, contentType, salePrice, retailPrice } =
    props.attrs.data;

  if (contentType != "Product")
    return <div>Dot content not supported yet.</div>;

  return (
    <div class="bg-white">
      <div class="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div class="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx="512"
              cy="512"
              r="512"
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fill-opacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stop-color="#7775D6" />
                <stop offset="1" stop-color="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              class="mt-6 text-lg leading-8 text-gray-300"
            >
              <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </p>
            <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="#"
                class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Buy now
              </a>
              <a href="#" class="text-sm font-semibold leading-6 text-white">
                ${salePrice ? salePrice : retailPrice}
              </a>
            </div>
          </div>
          <div class="relative mt-16 h-80 lg:mt-8">
            <img
              class="max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src={`https://demo.dotcms.com${image}`}
              width="300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ListItem = ({ children }) => {
  return <li>{children}</li>;
};

export const OrderedList = ({ children }) => {
  return <ol>{children}</ol>;
};

export const Paragraph = ({ children }) => {
  return <p class="mt-3 mb-3 text-base leading-8 text-gray-600">{children}</p>;
};

export const BulletList = ({ children }) => {
  return (
    <ul class="list-disc" style={{ paddingLeft: "40px" }}>
      {children}
    </ul>
  );
};

export const Heading = ({ level, children }) => {
  const Tag = `h${level}`;
  return (
    <Tag class="text-xl font-bold tracking-tight text-gray-900">{children}</Tag>
  );
};

export const BlockQuote = ({ children }) => {
  return <blockquote>{children}</blockquote>;
};

export const CodeBlock = ({ language, children }) => {
  return (
    <pre data-language={language}>
      <code>{children}</code>
    </pre>
  );
};
