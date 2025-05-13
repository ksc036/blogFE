import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import styles from "./PostMarkDownContent.module.css";
import rehypeRaw from "rehype-raw"; // ✅ 추가

export default function PostContent({ content }: { content: string }) {
  function convertNewlinesToBreaks(markdown: string): string {
    // 연속된 줄바꿈 (\n 2개 이상)을 <br/> 반복으로 변환
    return markdown.replace(/\n{2,}/g, (match) => {
      const count = match.length;
      return "<br />".repeat(count - 1);
    });
  }
  return (
    <div className={styles.markdown}>
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
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
        {/* {convertNewlinesToBreaks(content)} */}
      </ReactMarkdown>
    </div>
  );
}
