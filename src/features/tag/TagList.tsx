"use client";

import styles from "./TagList.module.css";

type TagItem = {
  canonical: string;
  topName: string;
  count: number;
  canonicalId: number;
};

type Props = {
  tagList: TagItem[];
  onChange?: (selectedIds: number[]) => void; // 선택된 태그를 상위에 전달하고 싶을 경우
  selectedIds: any;
  setSelectedIds: any;
};

export default function TagList({
  tagList,
  onChange,
  selectedIds,
  setSelectedIds,
}: Props) {
  const handleClick = (id?: number) => {
    if (!id) {
      setSelectedIds([]);
      onChange?.([]);
      return;
    }

    const isSelected = selectedIds.includes(id);
    const newSelected = isSelected
      ? selectedIds.filter((tagId: any) => tagId !== id)
      : [...selectedIds, id];

    setSelectedIds(newSelected);
    onChange?.(newSelected);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.tagButton} ${
          selectedIds.length === 0 ? styles.active : ""
        }`}
        onClick={() => handleClick(undefined)}
      >
        전체 ({tagList.reduce((sum, tag) => sum + tag.count, 0)})
      </button>

      {tagList
        .sort((a, b) => b.count - a.count)
        .map((tag) => (
          <button
            key={tag.canonicalId}
            className={`${styles.tagButton} ${
              selectedIds.includes(tag.canonicalId) ? styles.active : ""
            }`}
            onClick={() => handleClick(tag.canonicalId)}
          >
            {tag.topName} ({tag.count})
          </button>
        ))}
    </div>
  );
}
