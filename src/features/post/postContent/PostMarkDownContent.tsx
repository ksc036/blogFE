import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./PostMarkDownContent.module.css";
import rehypeRaw from "rehype-raw"; // ✅ 추가

export default function PostContent({ content }: { content: string }) {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        components={{
          img: ({ node, ...props }) => (
            <div style={{ textAlign: "center" }}>
              <img
                {...props}
                style={{ height: "auto", maxWidth: "100%" }}
                alt={props.alt}
              />
            </div>
          ),
          li: ({ children }) => <li className="list-item">{children}</li>,
        }}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
