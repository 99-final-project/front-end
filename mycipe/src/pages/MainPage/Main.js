import React, { useEffect, useState, useRef } from "react";
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

import UserCard from "../../components/Card/UserCard";

import { Text } from "../../elements";
import { ReactComponent as BannerImage } from "../../assets/image/banner.svg";
import { ReactComponent as ContactImage } from "../../assets/image/contact.svg";

import { mainApi } from "../../shared/api/mainApi";

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

  const [rankList, setRankList] = useState([]);
  const [kingList, setKingList] = useState([]);

  async function fetchData() {
    try {
      const rankListResponse = mainApi.getRankList([
        [
          {
            nickname: "test",

            image: "",
            count: 11,
          },
          {
            nickname: "test",
            image: "",
            count: 6,
          },
          {
            nickname: "test",
            image: "",
            count: 6,
          },
        ],
        [
          {
            nickname: "test",

            image: "",
            count: 4,
          },
          {
            nickname: "test",
            image: "",
            count: 3,
          },
          {
            nickname: "test",
            image: "",
            count: 3,
          },
        ],
        [
          {
            nickname: "test",

            image: "",
            count: 2,
          },
          {
            nickname: "test",
            image: "",
            count: 2,
          },
          {
            nickname: "test",
            image: "",
            count: 1,
          },
        ],
        [
          {
            nickname: "test",
            image: "",
            count: 29,
          },
          {
            nickname: "test",
            image: "",
            count: 1,
          },
          {
            nickname: "test",
            image: "",
            count: 1,
          },
        ],
      ]);

      const kingListResponse = mainApi.getKingList([]);
      const getRankList = (await rankListResponse).data.data;
      const getKingList = (await kingListResponse).data.data[0];

      setRankList(getRankList);
      setKingList(getKingList);
    } catch (error) {
      console.log(error.data.error);
    }
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    dispatch(getPopularWeekListDB());
    dispatch(getRecentListDB());
    dispatch(getRecommendCafeDB());

    fetchData();
  }, []);

  console.log(rankList);
  console.log(kingList);

  const buttonRef = useRef();

  useEffect(() => {
    buttonRef.current.addEventListener("click", (e) => {
      console.log(e);
    });
  }, []);

  // 0 : 좋아요왕 , 1 : 게시글왕 , 2: 팔로우왕 , 3:댓글왕
  const [rankCategory, setRankCategory] = useState(0);

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
                image={c.images[0]}
                {...c}
              />
            );
          })}
        </RecipeCardList>

        {/* 왕 후보 */}
        <RankingInner>
          <Banner>
            <BannerTitle>누가 왕이 될 상인가</BannerTitle>
          </Banner>

          <RankingButtonInner ref={buttonRef}>
            <RankingButton
              isActive={rankCategory === 0 ? true : false}
              onClick={() => {
                setRankCategory(0);
              }}
            >
              작성왕
            </RankingButton>
            <RankingButton
              isActive={rankCategory === 1 ? true : false}
              onClick={() => {
                setRankCategory(1);
              }}
            >
              인기왕
            </RankingButton>
            <RankingButton
              isActive={rankCategory === 2 ? true : false}
              onClick={() => {
                setRankCategory(2);
              }}
            >
              팔로우왕
            </RankingButton>
            <RankingButton
              isActive={rankCategory === 3 ? true : false}
              onClick={() => {
                setRankCategory(3);
              }}
            >
              댓글왕
            </RankingButton>
          </RankingButtonInner>

          <UserListContainer>
            {rankList[rankCategory]?.map((user, idx) => {
              return (
                <UserCard key={idx} isrank={true} {...user} rank={idx + 1} />
              );
            })}
          </UserListContainer>
        </RankingInner>

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
                image={m.images[0]}
                {...m}
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
                image={m.images[0]}
                {...m}
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

  padding: 0px 20px;
  position: relative;
  flex-direction: column;
  display: flex;
  justify-content: center;
`;

const RankingInner = styled(MainInner)`
  padding: 0px;
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
  width: 250px;
  display: flex;
  justify-content: flex-end;
`;

const RankingButtonInner = styled.div`
  display: flex;
  margin-top: 4px;

  & :nth-child(1) {
    margin-left: 0px;
  }
`;

const BannerDateButton = styled.button`
  width: 53px;
  height: 28px;

  margin-left: 5px;
  font-size: 14px;
  padding: 0px 12px;

  color: ${(props) => (props.color ? "#fff" : "#767676")};
  background-color: ${(props) => (props.backgroundColor ? "#191919" : "#fff")};
  border: 1px solid #999999;
`;

const RankingButton = styled(BannerDateButton)`
  padding: 4px 8px;
  width: 67px;
  height: 28px;

  ${(props) =>
    props.isActive &&
    css`
      color: #fff;
      background-color: #191919;
    `};
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

const UserListContainer = styled.ul`
  margin-top: 8px;
`;

export default Main;
