import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";

import {
  getRecommendCafeDB,
  getPopularWeekListDB,
  getPopularMonthListDB,
  getRecentListDB,
} from "../../redux/Async/mainPage";

import RecipeCard from "../../components/Card/RecipeCard";
import ModalBackground from "../../shared/ModalBackground";

import { Text } from "../../elements";
import { ReactComponent as BannerImage } from "../../assets/image/banner.svg";
import { ReactComponent as ContactImage } from "../../assets/image/contact.svg";

const Main = (props) => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.modal.isActive);
  const commendList = useSelector((state) => state.mainPage.commendList);
  const popularList = useSelector((state) => state.mainPage.popularList);
  const recentList = useSelector((state) => state.mainPage.recentList);
  const [category, setCategory] = useState({
    weekly: true,
    monthly: false,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    dispatch(getPopularWeekListDB());
    dispatch(getRecentListDB());
    dispatch(getRecommendCafeDB());
  }, []);

  return (
    <>
      <BannerImage />
      <MainInner>
        {isActive && <ModalBackground />}

        {/* 추천 카페 */}
        <Banner>
          <BannerTitle>추천 카페</BannerTitle>
        </Banner>
        <RecipeCardList>
          {commendList.map((c, idx) => {
            return (
              <RecipeCard
                _onClick={() => {
                  history.push(`/recipeboard/detail/${c.recipeId}`);
                }}
                key={c.recipeId}
                recipeId={c.recipeId}
                commentCount={c.commentCount}
                content={c.content}
                image={c.images[0]}
                likeCount={c.likeCount}
                likeStatus={c.likeStatus}
                nickname={c.nickname}
                price={c.price}
                regDate={
                  c.regdate
                    ? c.regdate
                        .split("T")[0]
                        .replace("-", ". ")
                        .replace("-", ". ")
                    : ""
                }
                title={c.title}
              />
            );
          })}
        </RecipeCardList>

        {/* 인기 카페 */}
        <Banner>
          <BannerTitle>인기 카페</BannerTitle>

          <BannerButtonInner>
            <BannerDateButton
              color={category.weekly ? true : false}
              backgroundColor={category.weekly ? true : false}
              onClick={() => {
                setCategory({ weekly: true, monthly: false });
                dispatch(getPopularWeekListDB());
              }}
            >
              주간
            </BannerDateButton>
            <BannerDateButton
              color={category.monthly ? true : false}
              backgroundColor={category.monthly ? true : false}
              onClick={() => {
                setCategory({ weekly: false, monthly: true });
                dispatch(getPopularMonthListDB());
              }}
            >
              월간
            </BannerDateButton>
          </BannerButtonInner>
        </Banner>

        <RecipeCardList marginBottom>
          {popularList.map((m, idx) => {
            return (
              <RecipeCard
                _onClick={() => {
                  history.push(`/recipeboard/detail/${m.recipeId}`);
                }}
                key={m.recipeId}
                recipeId={m.recipeId}
                commentCount={m.commentCount}
                content={m.content}
                image={m.images[0]}
                likeCount={m.likeCount}
                likeStatus={m.likeStatus}
                nickname={m.nickname}
                price={m.price}
                regDate={
                  m.regdate
                    ? m.regdate
                        .split("T")[0]
                        .replace("-", ". ")
                        .replace("-", ". ")
                    : ""
                }
                title={m.title}
              />
            );
          })}
        </RecipeCardList>

        {/* 최근 카페 */}
        <Banner>
          <BannerTitle>최근 카페</BannerTitle>
          <BannerMoreButton
            onClick={() => {
              history.push("/recipeboard");
            }}
          >
            더보기
          </BannerMoreButton>
        </Banner>

        <RecipeCardList>
          {recentList.map((m, idx) => {
            return (
              <RecipeCard
                _onClick={() => {
                  history.push(`/recipeboard/detail/${m.recipeId}`);
                }}
                key={m.recipeId}
                recipeId={m.recipeId}
                commentCount={m.commentCount}
                content={m.content}
                image={m.images[0]}
                likeCount={m.likeCount}
                likeStatus={m.likeStatus}
                nickname={m.nickname}
                price={m.price}
                regDate={
                  m.regdate
                    ? m.regdate
                        .split("T")[0]
                        .replace("-", ". ")
                        .replace("-", ". ")
                    : ""
                }
                title={m.title}
              />
            );
          })}
        </RecipeCardList>
      </MainInner>

      <Contact>
        <ContactInner>
          <ContactImage />
          <ContactBox>
            <ContactText>
              팀원소개 <A>Notion</A> &nbsp;&nbsp;|&nbsp;&nbsp; 프로젝트 &nbsp;
              <A
                href="https://github.com/99-final-project"
                target="_blank"
                rel="noreferrer noopener"
              >
                Github
              </A>
            </ContactText>
          </ContactBox>
          <ContactBox>
            <ContactText>ⓒ 2021. Project ecafe All rights reserved</ContactText>
          </ContactBox>
        </ContactInner>
      </Contact>
    </>
  );
};

const MainInner = styled.div`
  height: auto;
  // min-height: calc(100% - 60px);
  padding: 0px 20px;
  position: relative;
  flex-direction: column;
  display: flex;
  justify-content: center;
`;

const Banner = styled.div`
  margin: 32px 6px 4px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BannerTitle = styled.span`
  font-size: 16px;
`;

const BannerButtonInner = styled.div`
  width: 166px;
  display: flex;
  justify-content: flex-end;
`;

const BannerDateButton = styled.button`
  width: 70px;
  height: 24px;
  border-radius: 50px;
  margin-left: 5px;
  font-size: 14px;
  padding: 0px 12px;

  color: ${(props) => (props.color ? "#fff" : "#767676")};
  background-color: ${(props) =>
    props.backgroundColor ? "#7692e4" : "#dbdbdb"};

  /* ${(props) =>
    props.active &&
    css`
      color: #fff;
      background-color: #7692e4;
    `}; */
`;

const BannerMoreButton = styled.button`
  font-size: 12px;
  color: #999;
`;

const RecipeCardList = styled.ul`
  margin-bottom: ${(props) => props.marginBottom && "56px"};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Contact = styled.div`
  margin-top: 50px;
  border-top: solid 1px gray;
  padding: 20px 0px 0px 0px !important;
  position: relative;
`;
const ContactInner = styled.div`
  padding: 0px 20px;
`;

const ContactBox = styled.div``;

const ContactText = styled.span`
  font-size: 10px;
`;

const A = styled.a`
  color: #7692e4;
`;

export default Main;
