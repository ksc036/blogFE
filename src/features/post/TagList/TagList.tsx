import styles from "./TagList.module.css";
// type PostTagWithTag = {
//   id: number;
//   postId: number;
//   tagId: number;
//   userId: number;
//   tag: {
//     id: number;
//     name: string;
//   };
// };
export default function TagList({ tagList }: { tagList: string[] }) {
  // console.log("tagList,", tagList);
  return (
    <div className={styles.wrapper}>
      {tagList.map((name, index) => (
        <div key={index} className={styles.tag}>
          {name}
        </div>
      ))}
    </div>
  );
}
