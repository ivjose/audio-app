import React, { useMemo } from "react";
import styled from "@emotion/styled";

import Button from "components/Button";

const pauseIcon = `${process.env.PUBLIC_URL}/assets/svg/pause-circle-fill.svg`;
const playIcon = `${process.env.PUBLIC_URL}/assets/svg/play-circle-fill.svg`;
const rewind = `${process.env.PUBLIC_URL}/assets/svg/rotate-left.svg`;
const rewindHover = `${process.env.PUBLIC_URL}/assets/svg/rotate-left-hover.svg`;
const fastForward = `${process.env.PUBLIC_URL}/assets/svg/rotate-right.svg`;
const fastForwardHover = `${process.env.PUBLIC_URL}/assets/svg/rotate-right-hover.svg`;
const share = `${process.env.PUBLIC_URL}/assets/svg/share.svg`;

const Styled = {
  Wrapper: styled.section`
    background-color: ${(props) => props.theme.colors.lighterGray};
    height: 60px;
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  `,

  LeftContorl: styled.div`
    width: 200px;
    text-align: right;
  `,

  MainControl: styled.div`
    padding-left: 10px;
    display: flex;
    align-items: center;
    flex: 1;
  `,

  PlayButton: styled.button`
    background-color: transparent;
    height: 34px;
    width: 34px;
    outline: 0;
    margin: 0 10px;
    padding: 0;
    border: none;
    &:hover {
      cursor: pointer;
    }
  `,

  RewindIcon: styled.i`
    background: url(${rewind}) no-repeat center center;
    height: 20px;
    width: 20px;
    &:hover {
      background: url(${rewindHover}) no-repeat center center;
      cursor: pointer;
    }
  `,

  FastForwardIcon: styled.i`
    height: 20px;
    width: 20px;
    background: url(${fastForward}) no-repeat center center;
    &:hover {
      background: url(${fastForwardHover}) no-repeat center center;
      cursor: pointer;
    }
  `,
};

const AudioControl = ({ status, handlePlay, handlePause }) => {
  const isPlay = status === "pause" || status === "stop";

  return useMemo(
    () => (
      <Styled.Wrapper>
        <Styled.MainControl>
          <Styled.RewindIcon />

          <Styled.PlayButton onClick={isPlay ? handlePlay : handlePause}>
            {isPlay ? (
              <img src={playIcon} alt="play icon" />
            ) : (
              <img src={pauseIcon} alt="pause icon" />
            )}
          </Styled.PlayButton>
          <Styled.FastForwardIcon />
        </Styled.MainControl>
        <Styled.LeftContorl>
          <Button type="button">
            <img src={share} alt="share icon" />
            Shared
          </Button>
        </Styled.LeftContorl>
      </Styled.Wrapper>
    ),
    [status, handlePlay, handlePause]
  );
};

export default AudioControl;
