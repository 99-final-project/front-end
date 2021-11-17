import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../redux/configureStore";

import { SmallFilterButton, ButtonInner } from "../../elements";
import RecipeCard from "../../components/Card/RecipeCard";
import ModalBackground from "../../shared/ModalBackground";

import {
  getRecipePostListDB,
  getInfinityScrollDB,
} from "../../redux/Async/recipeBoard";

import { useInterSectionObserver } from "../../hooks/index";

const RecipeBoardMain = () => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.modal.isActive);
  const recipeList = useSelector(
    (state) => state.recipeBoard && state.recipeBoard.recipeList
  );

  const [currentSorting, setCurrentSorting] = useState({
    sortedByDate: true,
    sortedByLikes: false,
  });

  const [target, setTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const prevRecipeListLengthRef = useRef(0);
  const pageRef = useRef(1);

  // 처음 페이지 진입했을 때 page=1인 data을 받아온다.
  useEffect(() => {
    console.log(1);
    dispatch(
      getRecipePostListDB({
        page: 1,
        sortBy: currentSorting.sortedByDate
          ? "sortBy=regDate&sortByLike=false"
          : "sortBy=regDate&sortByLike=true",
      })
    )
      .unwrap()
      .then((res) => {
        prevRecipeListLengthRef.current += res.length;
      });
  }, [dispatch, currentSorting.sortedByDate]);

  // 관찰이 시작될 때 실행될 콜백 함수
  const fetchMoreRecipe = (page) => {
    setIsLoading(true);
    dispatch(
      getInfinityScrollDB({
        page: page,
        sortBy: currentSorting.sortedByDate
          ? "sortBy=regDate&sortByLike=false"
          : "sortBy=regDate&sortByLike=true",
      })
    )
      .unwrap()
      .then((res) => {
        setIsLoading(false);
        prevRecipeListLengthRef.current += res.length;
      });
  };

  useInterSectionObserver(fetchMoreRecipe, pageRef, target, recipeList);

  return (
    <>
      <BoardMainContainer>
        {isActive && <ModalBackground />}
        {/* 정렬 박스 */}
        <ButtonInner height="32px" small>
          <SmallFilterButton
            active={currentSorting.sortedByDate}
            _onClick={() => {
              setCurrentSorting({
                sortedByDate: true,
                sortedByLikes: false,
              });
              pageRef.current = 1;
              prevRecipeListLengthRef.current = 0;
            }}
          >
            최신순
          </SmallFilterButton>
          <SmallFilterButton
            active={currentSorting.sortedByLikes}
            _onClick={() => {
              setCurrentSorting({
                sortedByDate: false,
                sortedByLikes: true,
              });
              pageRef.current = 1;
              prevRecipeListLengthRef.current = 0;
            }}
          >
            인기순
          </SmallFilterButton>
        </ButtonInner>

        {/* 최신순 */}
        {currentSorting.sortedByDate && (
          <>
            <CardList>
              {recipeList &&
                recipeList.map((r, idx) => {
                  return (
                    <RecipeCard
                      _onClick={() => {
                        history.push(`/recipeboard/detail/${r.recipeId}`);
                      }}
                      key={r.recipeId}
                      commentCount={r.commentCount}
                      content={r.content}
                      image={r.images[0]}
                      likeCount={r.likeCount}
                      likeStatus={r.likeStatus}
                      nickname={r.nickname}
                      price={r.price}
                      title={r.title}
                    />
                  );
                })}
            </CardList>
            <div ref={setTarget}>{isLoading && "loading..."}</div>
          </>
        )}

        {/* 인기순 */}
        {currentSorting.sortedByLikes && (
          <>
            <CardList>
              {recipeList &&
                recipeList.map((r, idx) => {
                  return (
                    <RecipeCard
                      _onClick={() => {
                        history.push(`/recipeboard/detail/${r.recipeId}`);
                      }}
                      key={r.recipeId}
                      commentCount={r.commentCount}
                      content={r.content}
                      image={r.images[0]}
                      likeCount={r.likeCount}
                      likeStatus={r.likeStatus}
                      nickname={r.nickname}
                      price={r.price}
                      title={r.title}
                    />
                  );
                })}
            </CardList>
            <div ref={setTarget}>{isLoading && "loading..."}</div>
          </>
        )}
      </BoardMainContainer>
    </>
  );
};

const BoardMainContainer = styled.div`
  height: auto;
  min-height: calc(100% - 60px);
  padding: 0px 20px 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardList = styled.div`
  margin-top: px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default RecipeBoardMain;
