import api from "./index";

export const mainApi = {
  // 추천 카페
  getRecommendCafe: () => {
    return api.get("/main/recommend");
  },
  //메인 인기카페 후기 조회
  getPopularListWeek: () => {
    return api.get("/main/popular?sortBy=week");
  },
  getPopularListMonth: () => {
    return api.get("/main/popular?sortBy=month");
  },

  //최신 카페 후기 조회
  getRecentList: () => {
    return api.get("/main/recent");
  },

  //현랭킹 정보 불러오기
  getRankList: () => {
    return api.get("/main/thisweek");
  },

  //지난주 왕 불러오기
  getKingList: () => {
    return api.get("/main/lastweek");
  },
};