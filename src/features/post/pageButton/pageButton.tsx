"use client";

import { generatePageNumbers } from "@/shared/lib/generatePageNumber/generatePageNumber";
import styles from "./pageButton.module.css";
export default function PageButton({
  postLength,
  page,
  loadPage,
}: {
  postLength: number;
  page: number;
  loadPage: (pageNumber: number) => void;
}) {
  return (
    <div className={styles.pagination}>
      {generatePageNumbers(postLength, page).map((p, idx) =>
        typeof p === "string" ? (
          <span key={idx} className={styles.dots}>
            {p}
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => loadPage(p)}
            className={p === page ? styles.activePage : styles.pageButton}
            disabled={p === page}
          >
            {p}
          </button>
        )
      )}
    </div>
  );
}
