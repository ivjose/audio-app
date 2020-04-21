import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  status: "stop",
  ended: false,
  currentTime: 0,
  duration: 0,
  speed: 1,
  filterWord: "",
  data: {
    transcriptText: [],
    wordTimings: [],
    userOne: "",
    userTwo: "",
  },
};

export const audioBarSlice = createSlice({
  name: "audioBar",
  initialState,
  reducers: {
    setPlay: (state) => {
      state.status = "play";
    },
    setStop: (state) => {
      state.status = "stop";
    },
    setPause: (state) => {
      state.status = "pause";
    },
    setEnd: (state) => {
      state.ended = true;
    },
    updateCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    getDuration: (state, action) => {
      state.duration = action.payload;
    },
    getAudioData: (state, action) => {
      const {
        transcript_text: transcriptText,
        word_timings: wordTimings,
      } = action.payload;

      const userOne = wordTimings
        .filter((item, key) => (key % 2 === 0 ? item : null))
        .flat();

      const userTwo = wordTimings
        .filter((item, key) => (key % 2 !== 0 ? item : null))
        .flat();

      const totalOne = userOne.reduce(
        (a, b) => a + (parseFloat(b.endTime) - parseFloat(b.startTime)),
        0
      );

      const totalTwo = userTwo.reduce(
        (a, b) => a + (parseFloat(b.endTime) - parseFloat(b.startTime)),
        0
      );

      state.data.transcriptText = transcriptText;
      state.data.wordTimings = wordTimings;
      state.data.userOne = totalOne;
      state.data.userTwo = totalTwo;
    },
    updateSearchWord: (state, action) => {
      state.filterWord = action.payload;
    },
  },
});

export const {
  setPlay,
  setStop,
  setPause,
  setEnd,
  updateCurrentTime,
  getDuration,
  getAudioData,
  updateSearchWord,
} = audioBarSlice.actions;

export default audioBarSlice.reducer;
