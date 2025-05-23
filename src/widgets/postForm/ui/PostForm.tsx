"use client";
import React, { useState, useRef, useEffect } from "react";
import PostMarkDownContent from "@/entities/post/ui/postContent/PostMarkDownContent";
import { getPostsById } from "@/entities/post/api/getPostsByIdClient";
import { getPresign } from "@/entities/post/api/presign";
import { uploadImg } from "@/entities/post/api/uploadImg";
import PostUpload from "@/widgets/postUpload/ui/PostUpload";
// import PostUpload from "@/components/client/postUpload/PostUpload";
import styles from "./PostForm.module.css";
import { tagToArray } from "@/shared/lib/tagToArray/tagToArray";
interface PostFormProps {
  postId?: number;
}
export default function PostForm({ postId }: PostFormProps) {
  const [info, setInfo] = useState<null | any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkURL, setLinkURL] = useState("");
  const [linkInsertInfo, setLinkInsertInfo] = useState<{
    start: number;
    end: number;
  } | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const [showPublishScreen, setShowPublishScreen] = useState(false);

  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  useEffect(() => {
    const fetchPost = async () => {
      //console.log("postId", postId);
      if (!postId) {
        return;
      }
      try {
        // const res = await axiosInstance.get(`/posts/${postId}`);
        // const post = res.data;
        const post = await getPostsById(postId);
        console.log("받아온 post", post);
        setInfo(post);
        setTitle(post.title);
        setContent(post.content);
        setTags(tagToArray(post.postTags));
      } catch (err) {
        alert("게시글 정보를 불러오지 못했습니다.");
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    if (showLinkInput && linkRef.current) {
      linkRef.current.focus(); // ✅ 렌더링된 후 실행됨
    }
  }, [showLinkInput]);

  const handleCompleteWrite = () => {
    setShowPublishScreen(true); // 슬라이드 화면 열기
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const insertMarkdownSyntax = (syntaxType: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.slice(start, end);
    let newText = content;
    let newCursorPos = start;

    if (syntaxType.startsWith("heading")) {
      const headingLevel = parseInt(syntaxType.replace("heading", ""), 10);
      const lines = content.split("\n");
      const startLineIndex = content.slice(0, start).split("\n").length - 1;
      const originalLine = lines[startLineIndex];
      const strippedLine = originalLine.replace(/^#{1,6}\s*/, "");
      const newHeadingPrefix = "#".repeat(headingLevel) + " ";
      lines[startLineIndex] = newHeadingPrefix + strippedLine;
      newText = lines.join("\n");

      newCursorPos = content
        .split("\n")
        .slice(0, startLineIndex)
        .reduce((acc, line) => acc + line.length + 1, 0);
      newCursorPos += newHeadingPrefix.length;

      setContent(newText);
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
      const before = content.slice(start - wrapperLength, start);
      const after = content.slice(end, end + wrapperLength);

      if (before === wrapper && after === wrapper) {
        newText =
          content.slice(0, start - wrapperLength) +
          content.slice(end + wrapperLength);
        newCursorPos = start - wrapperLength;
      } else {
        let cleanedMarkdown = content;
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

      setContent(newText);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = newCursorPos;
        textarea.focus();
      }, 0);
      return;
    }

    const wrappedText = wrapper + selectedText + wrapper;
    newText = content.slice(0, start) + wrappedText + content.slice(end);

    setContent(newText);
    setTimeout(() => {
      textarea.selectionStart = start;
      textarea.selectionEnd = start + wrappedText.length;
      textarea.focus();
    }, 0);
  };

  const handleLinkInsert = () => {
    if (showLinkInput) {
      setShowLinkInput(false);
      return;
    }
    const textarea = textareaRef.current;
    const mirror = mirrorRef.current;
    if (!textarea || !mirror) return;
    const style = window.getComputedStyle(textarea);
    mirror.style.width = style.width;
    mirror.style.padding = style.padding;
    mirror.style.border = style.border;
    mirror.style.font = style.font;
    mirror.style.lineHeight = style.lineHeight;

    const value = textarea.value;
    const endPoint = textarea.selectionEnd;

    const before = value.slice(0, endPoint);
    const after = value.slice(endPoint);

    const span = document.createElement("span");
    span.textContent = "|";

    mirror.innerHTML = ""; // 초기화
    mirror.textContent = before;
    // mirror.innerHTML = `${escapeHtml(
    //   before
    // )}<span id="caret-marker">|</span>${escapeHtml(after)}`;
    mirror.appendChild(span);
    mirror.appendChild(document.createTextNode(after));

    const rect = span.getBoundingClientRect();
    // const rect = textarea.getBoundingClientRect();
    setPosition({
      top: rect.top + window.scrollY + 20,
      left: rect.left + window.scrollX,
    });

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    setLinkInsertInfo({ start, end });
    setShowLinkInput(true);
    setLinkURL("");
  };
  // const escapeHtml = (text: string) =>
  //   text
  //     .replace(/&/g, "&amp;")
  //     .replace(/</g, "&lt;")
  //     .replace(/>/g, "&gt;")
  //     .replace(/\n$/g, "\n\u200b") // 줄 끝 정확하게
  //     .replace(/\n/g, "<br/>")
  //     .replace(/ /g, "&nbsp;"); // 공백 유지

  const confirmLinkInsert = () => {
    const { start, end } = linkInsertInfo!;
    const selectedText = content.slice(start, end);

    let newText = content;

    if (start === end) {
      // 아무것도 선택 안한 경우: "링크텍스트"를 선택 상태로 삽입
      const linkText = "[링크텍스트]";
      const insertText = `${linkText}(${linkURL})`;
      newText = content + `\n${insertText}`;

      const selectionStart = newText.length - insertText.length + 1; // "[" 다음
      const selectionEnd = selectionStart + linkText.length - 2; // "]" 전까지

      setContent(newText);
      setShowLinkInput(false);
      setTimeout(() => {
        textareaRef.current!.selectionStart = selectionStart;
        textareaRef.current!.selectionEnd = selectionEnd;
        textareaRef.current!.focus();
      }, 0);
    } else {
      // 선택된 텍스트가 있는 경우
      newText =
        content.slice(0, start) +
        `[${selectedText}](${linkURL})` +
        content.slice(end);
      const newCursorPos = start + 1;

      setContent(newText);
      setShowLinkInput(false);
      setTimeout(() => {
        textareaRef.current!.selectionStart =
          textareaRef.current!.selectionEnd = newCursorPos;
        textareaRef.current!.focus();
      }, 0);
    }
  };

  const handleImageInsert = () => {
    //console.log("handleImageInsert");
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log("handleImageUpload");
    const file = e.target.files?.[0];
    //console.log(file);
    //console.log(process.env.NEXT_PUBLIC_API_URL);
    if (!file) return;

    try {
      const { url } = await getPresign(file);
      await uploadImg(file, url);

      const imageUrl = url.split("?")[0]; // 쿼리스트링 제거
      const insertText = `![](${process.env.NEXT_PUBLIC_S3_URL + imageUrl})`;
      const cursor = textareaRef.current!.selectionStart;
      const newText =
        content.slice(0, cursor) + insertText + content.slice(cursor);
      setContent(newText);

      setTimeout(() => {
        textareaRef.current!.selectionStart =
          textareaRef.current!.selectionEnd = cursor + insertText.length;
        textareaRef.current!.focus();
      }, 0);
    } catch (err) {
      alert("이미지 업로드 실패");
      //console.error(err);
    }
  };

  const addTag = () => {
    const trimmed = input.trim();
    if (tags.includes(trimmed)) {
      alert(`${trimmed}태그는 이미 존재하는 태그입니다.`);
      setInput("");
      return;
    }
    if (trimmed) {
      setTags((prev) => [...prev, trimmed]);
    }
    setInput("");
  };
  const handleBlur = () => {
    addTag();
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && input === "") {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <div className={styles.mainSize}>
      <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
        <input
          className={styles.title}
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className={styles.submitButton} onClick={handleCompleteWrite}>
          작성완료
        </button>
      </div>
      <div className={styles.wrapper}>
        {tags.map((tag, index) => (
          <div
            key={index}
            className={styles.tag}
            onClick={() => handleRemoveTag(index)}
          >
            {tag}
          </div>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder="태그를 입력하세요"
          className={styles.input}
        />
      </div>
      <div className={styles.toolbar}>
        <button
          className={styles.toolbarButton}
          onClick={() => insertMarkdownSyntax("heading1")}
        >
          H1
        </button>
        <button
          className={styles.toolbarButton}
          onClick={() => insertMarkdownSyntax("heading2")}
        >
          H2
        </button>
        <button
          className={styles.toolbarButton}
          onClick={() => insertMarkdownSyntax("heading3")}
        >
          H3
        </button>
        <button
          className={styles.toolbarButton}
          onClick={() => insertMarkdownSyntax("heading4")}
        >
          H4
        </button>
        <div className={styles.toolbarDivider}></div>
        <button
          className={styles.toolbarButton}
          onClick={() => insertMarkdownSyntax("bold")}
        >
          굵게
        </button>
        <button
          className={styles.toolbarButton}
          onClick={() => insertMarkdownSyntax("italic")}
        >
          기울임
        </button>
        <button
          className={styles.toolbarButton}
          onClick={() => insertMarkdownSyntax("strike")}
        >
          취소선
        </button>
        <button
          className={styles.toolbarButton}
          onClick={() => insertMarkdownSyntax("code")}
        >
          &lt;/&gt;
        </button>
        <div className={styles.toolbarDivider}></div>
        <button className={styles.toolbarButton} onClick={handleImageInsert}>
          🖼️
        </button>
        <button onClick={handleLinkInsert} className={styles.toolbarButton}>
          🔗
        </button>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />

      {showLinkInput && (
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            gap: "0.5rem",
            position: "fixed",
            top: position.top,
            left: position.left,
          }}
        >
          <input
            type="text"
            placeholder="URL을 입력하세요"
            ref={linkRef}
            value={linkURL}
            onChange={(e) => setLinkURL(e.target.value)}
            className={styles.urlInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // 폼 제출 막기 (선택)
                confirmLinkInsert(); // ✅ 확인 버튼 대신 실행
              }
            }}
          />
          <button onClick={confirmLinkInsert} className={styles.urlButton}>
            확인
          </button>
        </div>
      )}

      <div style={{ display: "flex", height: "100%", flex: 1, gap: "2px" }}>
        <textarea
          ref={textareaRef}
          className={styles.mainText}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setShowLinkInput(false)}
          placeholder="내용을 입력하세요..."
        />
        <div
          ref={mirrorRef}
          className={styles.textareaMirror}
          aria-hidden
        ></div>
        <PostMarkDownContent content={content}></PostMarkDownContent>
      </div>

      {showPublishScreen && (
        <div>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(0,0,0,0.3)", // 어두운 반투명 + 블러
              zIndex: 999,
            }}
            onClick={() => setShowPublishScreen(false)} // 클릭 시 닫기 등의 로직 가능
          />
          <PostUpload
            showPublishScreen={showPublishScreen}
            setShowPublishScreen={setShowPublishScreen}
            title={title}
            content={content}
            thumbnailUrl={info?.thumbnailUrl}
            desc={info?.desc}
            visibility={info?.visibility}
            postUrl={info?.postUrl}
            isUpdate={postId ? true : false}
            postId={info?.id}
            info={info}
            tags={tags}
          ></PostUpload>
        </div>
      )}
    </div>
  );
}
