type Props = {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
};

export default function CommentForm({
  value,
  onChange,
  onSubmit,
  placeholder,
}: Props) {
  return (
    <div>
      <textarea
        className="textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "댓글을 입력하세요"}
      />
      <button onClick={onSubmit}>작성</button>
    </div>
  );
}
