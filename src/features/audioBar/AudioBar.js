import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";

import audioData from "data/sample-audio.wav";
import useDebounce from "hooks/useDebounce";

import data from "data/transcript.json";

import {
  setStop,
  setPlay,
  setPause,
  setEnd,
  updateCurrentTime,
  getAudioData,
  getDuration,
  updateSearchWord,
} from "./audioBarSlice";
import AudioControl from "./components/AudioControl";
import AudioLine from "./components/AudioLine";
import AudioConversation from "./components/AudioConversation";

const Styled = {
  Wrapper: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
  `,
};

const AudioBar = (props) => {
  const [audio] = useState(new Audio(audioData));
  const [searchWord, setSearchWord] = useState("");

  const dispatch = useDispatch();
  const { status, duration, currentTime, filterWord } = useSelector(
    (state) => state.audioBar
  );
  const { wordTimings, userOne, userTwo } = useSelector(
    (state) => state.audioBar.data
  );

  const debouncedSearchWord = useDebounce(searchWord, 500);

  useEffect(() => {
    const handleLoadAudio = () => {
      dispatch(getDuration(audio.duration));
    };
    dispatch(getAudioData(data));

    audio.addEventListener("loadedmetadata", handleLoadAudio);
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadAudio);
    };
  }, [audio, dispatch]);

  useEffect(() => {
    const handleUpdateTime = () => {
      const updatedTime = parseFloat(audio.currentTime.toFixed(2));
      console.info(audio.currentTime, audio.duration, "XXXXXXXXXxDDDDDD");

      if (audio.currentTime === audio.duration) {
        dispatch(setStop());
        dispatch(updateCurrentTime(updatedTime));
      } else {
        dispatch(updateCurrentTime(updatedTime));
      }
    };

    audio.addEventListener("timeupdate", handleUpdateTime);
    return () => {
      // console.log(
      //   user.reduce(
      //     (a, b) => a + (parseFloat(b.endTime) - parseFloat(b.startTime)),
      //     0
      //   ),
      //   "11DDDDDDDDDDDDDDDDDDDDDd"
      // );
      audio.removeEventListener("timeupdate", handleUpdateTime);
    };
  }, [audio, dispatch]);

  useEffect(
    () => {
      if (debouncedSearchWord) {
        dispatch(updateSearchWord(debouncedSearchWord));
      }
    },
    [debouncedSearchWord, dispatch] // Only call effect if debounced search term changes
  );

  const handlePlay = useCallback(() => {
    audio.play();
    dispatch(setPlay());
  }, [audio, dispatch]);

  const handlePause = useCallback(() => {
    audio.pause();
    dispatch(setPause());
  }, [audio, dispatch]);

  const handleSkip = useCallback(
    (time) => {
      audio.currentTime = parseFloat(time);
      audio.play();
      dispatch(setPause());
    },
    [audio, dispatch]
  );

  const handleSearchWord = (event) => {
    let selected = event.target.value;

    if (selected) {
      setSearchWord(event.target.value.trim());
    } else {
      handleClearSearch();
    }
  };

  const handleClearSearch = () => {
    dispatch(updateSearchWord(""));
    setSearchWord("");
  };

  return (
    <Styled.Wrapper>
      <AudioControl
        status={status}
        handlePlay={handlePlay}
        handlePause={handlePause}
      />
      <AudioLine
        duration={duration}
        currentTime={currentTime}
        wordTimings={wordTimings}
        userOneTime={userOne}
        userTwoTime={userTwo}
        skip={handleSkip}
      />
      <AudioConversation
        wordTimings={wordTimings}
        currentTime={currentTime}
        filterWord={filterWord}
        searchWord={searchWord}
        skip={handleSkip}
        handleSearchWord={handleSearchWord}
        handleClearSearch={handleClearSearch}
      />
    </Styled.Wrapper>
  );
};

export default AudioBar;
