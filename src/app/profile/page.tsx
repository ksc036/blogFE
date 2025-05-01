"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./UserProfileForm.module.css";
import { Me } from "@/entities/user/model/types";
import { updateMeField } from "@/entities/user/model/userSlice";
import axiosInstance from "@/shared/lib/axiosInstance";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { getPresign } from "@/entities/post/api/presign";
import { uploadImg } from "@/entities/post/api/uploadImg";
import { useDispatch } from "react-redux";

export default function UserProfileForm() {
  const me: Me = useAppSelector((state) => state.user.me);
  const dispatch = useAppDispatch();
  if (!me) {
    return <div>사용자 정보 읽기 실패했습니다</div>;
  }
  // const initialData = {
  //   name: me.name,
  //   email: me.email,
  //   subdomain: me.subdomain,
  //   bio: me.bio,
  //   blogName: me.blogName,
  // };
  // const [profileData, setProfileData] = useState(initialData);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    subdomain: "",
    bio: "",
    blogName: "",
  });
  const [editField, setEditField] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (me) {
      setProfileData({
        name: me.name,
        email: me.email,
        subdomain: me.subdomain,
        bio: me.bio,
        blogName: me.blogName,
      });
      setThumbnailUrl(me.thumbnailUrl);
    }
  }, [me]);

  const handleEdit = (field: string) => setEditField(field);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };
  const handleSave = async () => {
    try {
      const value = profileData[editField as keyof typeof profileData];
      await axiosInstance.put("/users", {
        field: editField,
        value: value,
      });
      dispatch(updateMeField({ field: editField as keyof Me, value }));
    } catch (error) {
      console.error("Error saving profile data:", error);
      alert("프로필 저장에 실패했습니다.");
    }

    setEditField(null);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // TODO: S3 업로드 후 서버로 URL 전송하는 로직 작성
    console.log("Selected file:", file);
    try {
      const { url } = await getPresign(file);
      e.target.value = "";
      await uploadImg(file, url);
      const imageUrl = process.env.NEXT_PUBLIC_S3_URL + url.split("?")[0];
      console.log("Image URL:", imageUrl);
      // await axiosInstance.put("/users", {
      //   field: "thumbnailUrl",
      //   value: imageUrl,
      // });
      // setThumbnailUrl(imageUrl);
      await axiosInstance.put("/users", {
        field: "thumbnailUrl",
        value: imageUrl,
      });
      dispatch(updateMeField({ field: "thumbnailUrl", value: imageUrl }));
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <div className={styles.profileSection}>
          <div className={styles.imageWrapper}>
            <img
              src={thumbnailUrl}
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
              alt="Profile"
              className={`${styles.profileImage} ${styles.roundedFull}`}
            />
            <div className={styles.cameraIcon} onClick={handleImageClick}>
              <img
                src="https://minio.ksc036.store/delog/uploads/1746013309205_camera.png"
                alt="Edit"
                className={styles.cameraIconImage}
              />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
          <button
            className={styles.changePictureButton}
            onClick={handleImageClick}
          >
            사진 변경
          </button>
        </div>

        <div className={styles.fieldList}>
          {Object.entries({
            name: "이름",
            bio: "한줄 소개",
            blogName: "블로그 이름",
            subdomain: "블로그 URL",
            email: "이메일 주소",
          }).map(([key, label]) => (
            <div key={key}>
              <label className={styles.label}>{label}</label>
              {editField === key ? (
                key === "bio" ? (
                  <textarea
                    name={key}
                    value={profileData[key as keyof typeof profileData]}
                    onChange={handleChange}
                    className={styles.input}
                  />
                ) : (
                  <input
                    name={key}
                    type="text"
                    value={profileData[key as keyof typeof profileData]}
                    onChange={handleChange}
                    className={styles.input}
                  />
                )
              ) : (
                <div className={styles.staticField}>
                  <span>{profileData[key as keyof typeof profileData]}</span>
                  <button
                    onClick={() => handleEdit(key)}
                    className={styles.editButton}
                  >
                    수정
                  </button>
                </div>
              )}
              {editField === key && (
                <div className={styles.saveWrapper}>
                  <button onClick={handleSave} className={styles.saveButton}>
                    저장
                  </button>
                </div>
              )}
            </div>
          ))}

          <button className={styles.deleteButton}>계정삭제</button>
        </div>
      </div>
    </div>
  );
}
