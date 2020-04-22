import React, { useMemo } from "react";
import styled from "@emotion/styled";

import Button from "components/Button";
import MenuDropdown from "components/MenuDropdown";

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
    font-size: 9px;
    font-style: normal;
    text-align: center;
    padding: 6px 5px;
    &:hover {
      background: url(${rewindHover}) no-repeat center center;
      cursor: pointer;
      color: ${(props) => props.theme.colors.primary};
    }
  `,

  FastForwardIcon: styled.i`
    background: url(${fastForward}) no-repeat center center;
    height: 20px;
    width: 20px;
    font-size: 9px;
    font-style: normal;
    text-align: center;
    padding: 6px 5px;
    &:hover {
      background: url(${fastForwardHover}) no-repeat center center;
      cursor: pointer;
      color: ${(props) => props.theme.colors.primary};
    }
  `,
};

const AudioControl = ({
  status,
  speed,
  currentTime,
  skip,
  handlePlay,
  handlePause,
  handleSpeed,
}) => {
  const isPlay = status === "pause" || status === "stop";

  return useMemo(
    () => (
      <Styled.Wrapper>
        <Styled.MainControl>
          <Styled.RewindIcon onClick={() => skip(currentTime - 10)}>
            10
          </Styled.RewindIcon>
          <Styled.PlayButton onClick={isPlay ? handlePlay : handlePause}>
            {isPlay ? (
              <img src={playIcon} alt="play icon" />
            ) : (
              <img src={pauseIcon} alt="pause icon" />
            )}
          </Styled.PlayButton>
          <Styled.FastForwardIcon onClick={() => skip(currentTime + 10)}>
            10
          </Styled.FastForwardIcon>
          <MenuDropdown
            onClick={handleSpeed}
            text={`${speed} x`}
            option={[
              { value: 0.5, label: "0.5x" },
              { value: 0.75, label: "0.75x" },
              { value: 1, label: "1x" },
              { value: 1.5, label: "1.5x" },
              { value: 2, label: "2x" },
            ]}
          />
        </Styled.MainControl>
        <Styled.LeftContorl>
          <Button type="button">
            <img src={share} alt="share icon" />
            Shared
          </Button>
        </Styled.LeftContorl>
      </Styled.Wrapper>
    ),
    [handlePlay, handlePause, isPlay, currentTime, skip, speed, handleSpeed]
  );
};

export default AudioControl;
