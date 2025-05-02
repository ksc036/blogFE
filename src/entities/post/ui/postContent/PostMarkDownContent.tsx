import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function PostContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        img: ({ node, ...props }) => (
          <img
            {...props}
            style={{ height: "auto", maxWidth: "100%" }} // 예시
            alt={props.alt}
          />
        ),
      }}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
}
