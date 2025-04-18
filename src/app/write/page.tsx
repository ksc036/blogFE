"use client";
import axiosInstance from "@/lib/axiosInstance";
import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";

function App() {
  const [markdown, setMarkdown] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkURL, setLinkURL] = useState("");
  const [linkInsertInfo, setLinkInsertInfo] = useState<{
    start: number;
    end: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdownSyntax = (syntaxType: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.slice(start, end);
    let newText = markdown;
    let newCursorPos = start;

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

    const markMap = {
      bold: "**",
      italic: "*",
      strike: "~~",
      code: "`",
    };
    if (!Object.hasOwn(markMap, syntaxType)) return;
    const wrapper = markMap[syntaxType as keyof typeof markMap];
    const wrapperLength = wrapper.length;

    if (start === end) {
      const before = markdown.slice(start - wrapperLength, start);
      const after = markdown.slice(end, end + wrapperLength);

      if (before === wrapper && after === wrapper) {
        newText =
          markdown.slice(0, start - wrapperLength) +
          markdown.slice(end + wrapperLength);
        newCursorPos = start - wrapperLength;
      } else {
        let cleanedMarkdown = markdown;
        let offset = 0;
        for (const [_key, val] of Object.entries(markMap)) {
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

    const wrappedText = wrapper + selectedText + wrapper;
    newText = markdown.slice(0, start) + wrappedText + markdown.slice(end);

    setMarkdown(newText);
    setTimeout(() => {
      textarea.selectionStart = start;
      textarea.selectionEnd = start + wrappedText.length;
      textarea.focus();
    }, 0);
  };

  const handleLinkInsert = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    setLinkInsertInfo({ start, end });
    setShowLinkInput(true);
    setLinkURL("");
  };

  const confirmLinkInsert = () => {
    const { start, end } = linkInsertInfo!;
    const selectedText = markdown.slice(start, end);

    let newText = markdown;

    if (start === end) {
      // 아무것도 선택 안한 경우: "링크텍스트"를 선택 상태로 삽입
      const linkText = "[링크텍스트]";
      const insertText = `${linkText}(${linkURL})`;
      newText = markdown + `\n${insertText}`;

      const selectionStart = newText.length - insertText.length + 1; // "[" 다음
      const selectionEnd = selectionStart + linkText.length - 2; // "]" 전까지

      setMarkdown(newText);
      setShowLinkInput(false);
      setTimeout(() => {
        textareaRef.current!.selectionStart = selectionStart;
        textareaRef.current!.selectionEnd = selectionEnd;
        textareaRef.current!.focus();
      }, 0);
    } else {
      // 선택된 텍스트가 있는 경우
      newText =
        markdown.slice(0, start) +
        `[${selectedText}](${linkURL})` +
        markdown.slice(end);
      const newCursorPos = start + 1;

      setMarkdown(newText);
      setShowLinkInput(false);
      setTimeout(() => {
        textareaRef.current!.selectionStart =
          textareaRef.current!.selectionEnd = newCursorPos;
        textareaRef.current!.focus();
      }, 0);
    }
  };

  const handleImageInsert = () => {
    console.log("handleImageInsert");
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleImageUpload");
    const file = e.target.files?.[0];
    console.log(file);
    console.log(process.env.NEXT_PUBLIC_API_URL);
    if (!file) return;

    try {
      // 서버에 presigned URL 요청
      const res = await axiosInstance.post("/presign", {
        filename: file.name,
      });
      e.target.value = "";
      // const res = await fetch("/api/presign", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ filename: file.name }),
      // });

      const { url } = res.data; // presigned URL 반환
      console.log(process.env.NEXT_PUBLIC_S3_URL + url);
      // presigned URL로 업로드
      await axios.put(process.env.NEXT_PUBLIC_S3_URL + url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      // 이미지 삽입
      const imageUrl = url.split("?")[0]; // 쿼리스트링 제거
      const insertText = `![](${process.env.NEXT_PUBLIC_S3_URL + imageUrl})`;
      const cursor = textareaRef.current!.selectionStart;
      const newText =
        markdown.slice(0, cursor) + insertText + markdown.slice(cursor);
      setMarkdown(newText);

      setTimeout(() => {
        textareaRef.current!.selectionStart =
          textareaRef.current!.selectionEnd = cursor + insertText.length;
        textareaRef.current!.focus();
      }, 0);
    } catch (err) {
      alert("이미지 업로드 실패");
      console.error(err);
    }
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
        <button onClick={handleImageInsert}>이미지</button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        <button onClick={handleLinkInsert}>링크</button>
      </div>

      {showLinkInput && (
        <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            placeholder="URL을 입력하세요"
            value={linkURL}
            onChange={(e) => setLinkURL(e.target.value)}
            style={{ flex: 1 }}
          />
          <button onClick={confirmLinkInsert}>확인</button>
        </div>
      )}

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
