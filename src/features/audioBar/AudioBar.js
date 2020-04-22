import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";

import audioData from "data/sample-audio.wav";
import useDebounce from "hooks/useDebounce";

import data from "data/transcript.json";

import {
  setStop,
  setPlay,
  setPause,
  setSpeed,
  updateCurrentTime,
  getAudioData,
  getDuration,
  updateSearchWord,
} from "./audioBarSlice";
import AudioControl from "./AudioControl";
import AudioLine from "./AudioLine";
import AudioConversation from "./AudioConversation";

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
  const { status, duration, currentTime, filterWord, speed } = useSelector(
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

      if (audio.currentTime === audio.duration) {
        dispatch(setStop());
        dispatch(updateCurrentTime(updatedTime));
      } else {
        dispatch(updateCurrentTime(updatedTime));
      }
    };

    audio.addEventListener("timeupdate", handleUpdateTime);
    return () => {
      audio.removeEventListener("timeupdate", handleUpdateTime);
    };
  }, [audio, dispatch]);

  useEffect(() => {
    if (debouncedSearchWord) {
      dispatch(updateSearchWord(debouncedSearchWord));
    }
  }, [debouncedSearchWord, dispatch]);

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

  const handleSelectWord = useCallback(
    (time) => {
      audio.currentTime = parseFloat(time);
      audio.pause();
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

  const handleSpeed = useCallback(
    (selectedSpeed) => {
      audio.playbackRate = selectedSpeed;
      dispatch(setSpeed(selectedSpeed));
    },
    [audio, dispatch]
  );

  const handleClearSearch = () => {
    dispatch(updateSearchWord(""));
    setSearchWord("");
  };

  return (
    <Styled.Wrapper>
      <AudioControl
        status={status}
        currentTime={currentTime}
        speed={speed}
        skip={handleSkip}
        handlePlay={handlePlay}
        handlePause={handlePause}
        handleSpeed={handleSpeed}
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
        handleSelectWord={handleSelectWord}
        handleSearchWord={handleSearchWord}
        handleClearSearch={handleClearSearch}
      />
    </Styled.Wrapper>
  );
};

export default AudioBar;
