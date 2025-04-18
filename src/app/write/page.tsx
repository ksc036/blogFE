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
    // console.log(markdown, start, end);
    const selectedText = markdown.slice(start, end);

    let wrappedText = "";
    let cursorOffset = 0;

    switch (syntaxType) {
      case "bold":
        wrappedText = `**${selectedText || ""}**`;
        cursorOffset = 2; // ** <- 여기 커서
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

    const newText =
      markdown.slice(0, start) + wrappedText + markdown.slice(end);
    setMarkdown(newText);

    // setMarkdown 이후 커서 위치 조정
    setTimeout(() => {
      if (textarea) {
        if (start === end) {
          // 텍스트 선택 없이 입력했을 경우: **|**
          textarea.selectionStart = textarea.selectionEnd =
            start + cursorOffset;
        } else {
          // 기존 선택 유지
          textarea.selectionStart = start;
          textarea.selectionEnd = start + wrappedText.length;
        }
        textarea.focus();
      }
    }, 0);
  };

  return (
    <div>
      <div style={{ marginBottom: "0.5rem" }}>
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
