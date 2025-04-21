import CardList from "@/components/server/cardList/CardList";
import Comments from "@/components/server/comments/Comments";
import styles from "./page.module.css";
interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function postPage({ params }: PageProps) {
  const posts = [
    { id: 1, title: "제목1", content: "내용1" },
    { id: 2, title: "제목2", content: "내용2" },
    { id: 3, title: "제목3", content: "내용3" },
    { id: 4, title: "제목3", content: "내용3" },
    { id: 5, title: "제목3", content: "내용3" },
    { id: 6, title: "제목3", content: "내용3" },
    { id: 7, title: "제목3", content: "내용3" },
    { id: 8, title: "제목3", content: "내용3" },
    { id: 9, title: "제목3", content: "내용3" },
    { id: 10, title: "제목3", content: "내용3" },
    { id: 11, title: "제목3", content: "내용3" },
    { id: 12, title: "제목3", content: "내용3" },
    { id: 13, title: "제목3", content: "내용3" },
    { id: 14, title: "제목3", content: "내용3" },
    { id: 15, title: "제목3", content: "내용3" },
    { id: 16, title: "제목3", content: "내용3" },
    { id: 17, title: "제목3", content: "내용3" },
    { id: 18, title: "제목3", content: "내용3" },
  ];
  const { id } = await params;
  return (
    <div className={styles.container}>
      <div className={styles.title}>제목 {id} </div>
      <img className={styles.img} src="example.jpg" alt="썸네일 미완성" />

      <div className={styles.content}>
        한 공중파 방송 프로그램 작가님으로부터 취재 요청이 오시기도 했는데요,
        지난 주에 즐겁게 촬영을 마쳤어요. 개발자라는 직업으로 방송 인터뷰를 할
        날이 올지는 정말 몰랐습니다. 🫢 인터뷰가 끝나고, 낮동안 직접 해당
        가게들을 취재하고 오신 PD님들로부터 마음이 따뜻해지는 이야기를
        전해들었어요. 하루에 한 두 테이블 정도만 있던 식당에 하루 종일 손님이
        찾아오시고, 저희 서비스를 소개해드렸더니 너무너무 고마워하셨다고
        하시더라고요. 서비스를 개발하고 운영하면서는 아무래도 업주분들 보다는
        업주분들의 자녀들의 이야기만 들을 수 있었는데, 고마움을 표현해주시는
        업주분의 이야기를 전해들으니 지난 5일간 진행한 자체(?) 해커톤의 피곤함이
        싹 사라졌습니다 🥰 (방송은 돌아오는 금요일에 방영될 예정입니다 ㅎㅎ) 🛣️
        앞으로 할 것들 유저분들이 있기 때문에 당분간은 서비스를 계속해서
        유지하고 발전시켜나갈 생각입니다. 다만 소상공인, 가게, 동네 관련
        서비스는 저에게 아직은 낯설기 때문에, 이 도메인에 대한 이해도를 높이기
        위해 우선 노력해볼 생각이예요. 도메인에 대한 이해도가 높아지면 점점 더
        좋은 기능을 만들어낼 수 있겠죠? (지도 API... 커뮤니티... 정말 해보고
        싶다...🌟)
      </div>

      <div className={styles.contentend}>
        <div className={styles.profile}>프로필</div>
        <div className={styles.button}>좋아요 | 스크랩</div>
      </div>

      {/* <div className={styles.commentSection}>
        <div className={styles.commentBox}>
          <textarea
            className={styles.commentInput}
            placeholder="댓글을 작성해주세요"
          />
          <button className={styles.commentButton}>댓글 작성</button>
        </div>
      </div> */}
      <Comments></Comments>
      <div className={styles.advertise}>
        <div
          style={{
            fontSize: "18px",
            color: "#999999",
            textAlign: "center",
            padding: "10px 0",
          }}
        >
          이런 게시글은 어때요?
        </div>
        <CardList posts={posts}></CardList>
      </div>
    </div>
  );
}
