import {
  MAIN_VIDEOS_FAIL,
  MAIN_VIDEOS_REQUEST,
  MAIN_VIDEOS_SUCCESS,
  SELECTED_VIDEO_FAIL,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
} from 'redux/actions/types';

const mainInitialState = {
  videos: [],
  loading: false,
  nextPageToken: null,
  activeCategory: 'All',
};

const watchInitialState = {
  video: null,
  loading: false,
};

export const mainVideoReducer = (state = mainInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case MAIN_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: state.activeCategory === payload.category ? [...state.videos, ...payload.videos] : payload.videos,
        loading: false,
        nextPageToken: payload.nextPageToken,
        activeCategory: payload.category,
      };
    case MAIN_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case MAIN_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const watchVideoReducer = (state = watchInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SELECTED_VIDEO_SUCCESS:
      return {
        ...state,
        video: payload,
        loading: false,
      };
    case SELECTED_VIDEO_FAIL:
      return {
        ...state,
        video: null,
        loading: false,
        error: payload.error,
      };
    case SELECTED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
