"use client";
import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function App() {
  const [markdown, setMarkdown] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdownSyntax = (syntaxType: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    let selectedText = markdown.slice(start, end);
    let newText = markdown;
    let newCursorPos = start;

    // === heading 처리 ===
    if (syntaxType.startsWith("heading")) {
      const headingLevel = parseInt(syntaxType.replace("heading", ""), 10);
      const lines = markdown.split("\n");
      const startLineIndex = markdown.slice(0, start).split("\n").length - 1;
      const originalLine = lines[startLineIndex];
      const strippedLine = originalLine.replace(/^#{1,6}\s*/, "");
      const newHeadingPrefix = "#".repeat(headingLevel) + " ";
      lines[startLineIndex] = newHeadingPrefix + strippedLine;
      newText = lines.join("\n");

      newCursorPos = markdown
        .split("\n")
        .slice(0, startLineIndex)
        .reduce((acc, line) => acc + line.length + 1, 0);
      newCursorPos += newHeadingPrefix.length;

      setMarkdown(newText);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = newCursorPos;
        textarea.focus();
      }, 0);
      return;
    }

    // === 마크업 문법 ===
    const markMap = {
      bold: "**",
      italic: "*",
      strike: "~~",
      code: "`",
    };

    const wrapper = markMap[syntaxType];
    const wrapperLength = wrapper.length;

    // 선택이 없는 경우 (커서만 있는 경우)
    if (start === end) {
      const before = markdown.slice(start - wrapperLength, start);
      const after = markdown.slice(end, end + wrapperLength);

      // 동일한 마크업이 이미 있으면 제거 (토글)
      if (before === wrapper && after === wrapper) {
        newText =
          markdown.slice(0, start - wrapperLength) +
          markdown.slice(end + wrapperLength);
        newCursorPos = start - wrapperLength;
      } else {
        // 기존 다른 마크업 제거 후 새 마크업으로 교체
        let cleanedMarkdown = markdown;
        let offset = 0;
        for (const [key, val] of Object.entries(markMap)) {
          if (val === wrapper) continue;
          const b = cleanedMarkdown.slice(start - val.length, start);
          const a = cleanedMarkdown.slice(end, end + val.length);
          if (b === val && a === val) {
            cleanedMarkdown =
              cleanedMarkdown.slice(0, start - val.length) +
              cleanedMarkdown.slice(end + val.length);
            offset = val.length;
            break;
          }
        }

        newText =
          cleanedMarkdown.slice(0, start - offset) +
          wrapper +
          wrapper +
          cleanedMarkdown.slice(start - offset);
        newCursorPos = start - offset + wrapperLength;
      }

      setMarkdown(newText);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = newCursorPos;
        textarea.focus();
      }, 0);
      return;
    }

    // 선택된 텍스트가 있는 경우: 기존 로직 유지
    const wrappedText = wrapper + selectedText + wrapper;
    newText = markdown.slice(0, start) + wrappedText + markdown.slice(end);

    setMarkdown(newText);
    setTimeout(() => {
      textarea.selectionStart = start;
      textarea.selectionEnd = start + wrappedText.length;
      textarea.focus();
    }, 0);
  };

  return (
    <div>
      <div style={{ marginBottom: "0.5rem" }}>
        <button onClick={() => insertMarkdownSyntax("heading1")}>H1</button>
        <button onClick={() => insertMarkdownSyntax("heading2")}>H2</button>
        <button onClick={() => insertMarkdownSyntax("heading3")}>H3</button>
        <button onClick={() => insertMarkdownSyntax("heading4")}>H4</button>
        <button onClick={() => insertMarkdownSyntax("bold")}>굵게</button>
        <button onClick={() => insertMarkdownSyntax("italic")}>기울임</button>
        <button onClick={() => insertMarkdownSyntax("strike")}>취소선</button>
        <button onClick={() => insertMarkdownSyntax("code")}>코드</button>
      </div>

      <div style={{ display: "flex", height: "90vh" }}>
        <textarea
          ref={textareaRef}
          style={{ width: "50%", padding: "1rem", fontSize: "16px" }}
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Markdown을 입력하세요..."
        />
        <div
          style={{
            width: "50%",
            padding: "1rem",
            backgroundColor: "#f4f4f4",
            overflowY: "auto",
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default App;
