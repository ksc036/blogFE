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
    const selectedText = markdown.slice(start, end);

    let newText = markdown;
    let newCursorPos = start;

    // heading인 경우: 현재 줄을 기준으로 처리
    if (syntaxType.startsWith("heading")) {
      const headingLevel = parseInt(syntaxType.replace("heading", ""), 10);
      const lines = markdown.split("\n");

      // 현재 줄 번호 계산
      const startLineIndex = markdown.slice(0, start).split("\n").length - 1;
      const originalLine = lines[startLineIndex];

      // 기존 heading 제거 (예: "# ", "## ", 등)
      const strippedLine = originalLine.replace(/^#{1,6}\s*/, "");

      // 새로운 heading 추가
      const newHeadingPrefix = "#".repeat(headingLevel) + " ";
      lines[startLineIndex] = newHeadingPrefix + strippedLine;

      newText = lines.join("\n");

      // 커서 위치 재계산
      newCursorPos = markdown
        .split("\n")
        .slice(0, startLineIndex)
        .reduce((acc, line) => acc + line.length + 1, 0); // 줄 앞까지 길이

      newCursorPos += newHeadingPrefix.length; // 새 prefix 뒤로 커서 위치
      setMarkdown(newText);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = newCursorPos;
        textarea.focus();
      }, 0);

      return; // heading 처리 끝
    }

    // 텍스트 강조 문법 처리
    let wrappedText = "";
    let cursorOffset = 0;

    switch (syntaxType) {
      case "bold":
        wrappedText = `**${selectedText || ""}**`;
        cursorOffset = 2;
        break;
      case "italic":
        wrappedText = `*${selectedText || ""}*`;
        cursorOffset = 1;
        break;
      case "strike":
        wrappedText = `~~${selectedText || ""}~~`;
        cursorOffset = 2;
        break;
      case "code":
        wrappedText = `\`${selectedText || ""}\``;
        cursorOffset = 1;
        break;
      default:
        break;
    }

    newText = markdown.slice(0, start) + wrappedText + markdown.slice(end);
    setMarkdown(newText);

    setTimeout(() => {
      if (start === end) {
        textarea.selectionStart = textarea.selectionEnd = start + cursorOffset;
      } else {
        textarea.selectionStart = start;
        textarea.selectionEnd = start + wrappedText.length;
      }
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
