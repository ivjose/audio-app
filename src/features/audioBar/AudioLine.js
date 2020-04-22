import React, { useCallback, useMemo } from "react";
import styled from "@emotion/styled";

import { percentage, secondsToMinutes } from "./helpers";

const Styled = {
  Wrapper: styled.section`
    background: ${(props) => props.theme.colors.dimeWhite};
    padding: 1em;
    border-bottom: 1px solid ${(props) => props.theme.colors.lighterGray};
    /* flex: auto 1; */
  `,

  MainBar: styled.section`
    display: flex;
    flex-direction: row;
    /* flex: auto 1; */
  `,
  BarContainer: styled.div`
    width: ${(props) => (props.width ? `${props.width}px` : "100%")};
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    position: relative;
    &::after {
      content: "";
      background: ${(props) => props.theme.colors.lighterGray};
      width: 100%;
      height: 1px;
      position: absolute;
      top: 50%;
      left: 0;
      z-index: 1;
      transform: translate(0, -50%);
    }
  `,
  BarGroup: styled.div`
    width: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    &:hover {
      cursor: pointer;
    }

    &::before {
      content: "";
      background: ${(props) =>
        props.status === "played"
          ? props.theme.colors.secondary
          : "transparent"};
      width: 100%;
      height: 2px;

      position: absolute;
      top: 50%;
      left: 0;
      z-index: 2;
      transform: translate(0, -50%);
    }
  `,

  Bar: styled.div`
    border: 1px solid
      ${(props) => {
        const { status } = props;
        if (status === "played") {
          return props.theme.colors.lightBlue;
        }

        return "transparent";
      }};

    background-color: ${(props) => {
      const { status } = props;
      if (status === "played") {
        return props.theme.colors.lightBlue;
      }

      return "transparent";
    }};
    width: 100%;
    height: 100%;
    transition: 0.3s;

    span {
      background-color: ${(props) => {
        const { status, type, theme } = props;
        if (type === "primary") {
          if (status === "played") {
            return props.theme.colors.secondary;
          }
          return theme.colors.primary;
        }
        if (type === "secondary") {
          if (status === "played") {
            return props.theme.colors.secondary;
          }
          return theme.colors.purple;
        }
        return "transparent";
      }};
      height: 100%;
      width: 100%;
      display: block;
      transition: 0.3s;
    }
  `,
  BarTransparent: styled.div`
    width: 100%;
    height: 50px;
    background-color: green;
    margin-left: 2px;
  `,

  GroupLabel: styled.div`
    width: 250px;
    position: relative;
    &::after {
      content: "";
      background: ${(props) => props.theme.colors.lighterGray};
      width: 100%;
      height: 1px;
      position: absolute;
      top: 50%;
      left: 0;
      z-index: 1;
      transform: translate(0, -50%);
    }
  `,

  Label: styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    color: ${(props) =>
      props.type === "primary"
        ? props.theme.colors.purple
        : props.theme.colors.primary};
    font-weight: 600;
  `,

  TimeWrapper: styled.span`
    background-color: ${(props) => props.theme.colors.lighterGray};
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;

    time {
      font-weight: 600;
      &.dim {
        color: ${(props) => props.theme.colors.secondary};
      }
    }
  `,
};

const AudioLine = ({
  skip,
  wordTimings,
  duration,
  currentTime,
  userOneTime,
  userTwoTime,
}) => {
  const newTime = secondsToMinutes(currentTime);
  const totalTime = secondsToMinutes(duration);

  const getStatus = useCallback(
    ({ start }) => {
      if (currentTime >= parseFloat(start)) {
        return "played";
      }
      return "unPlayed";
    },
    [currentTime]
  );

  return useMemo(
    () => (
      <Styled.Wrapper>
        <div>
          <Styled.TimeWrapper>
            <time>{newTime}</time> / <time className="dim">{totalTime}</time>
          </Styled.TimeWrapper>
        </div>
        <Styled.MainBar>
          <Styled.GroupLabel>
            <Styled.Label type="primary">
              {percentage(userOneTime, duration)} YOU
            </Styled.Label>
            <Styled.Label>
              {percentage(userTwoTime, duration)} MICHEAL B.
            </Styled.Label>
          </Styled.GroupLabel>

          <Styled.BarContainer>
            {wordTimings.map((data, key) => {
              if (key % 2 === 0) {
                return data.map((time) => {
                  const status = getStatus({
                    start: time.startTime,
                  });
                  return (
                    <Styled.BarGroup
                      className="start"
                      status={status}
                      key={`${time.startTime}-${time.endTime}`}
                      onClick={() => skip(time.startTime)}
                    >
                      <Styled.Bar status={status} type="secondary">
                        <span />
                      </Styled.Bar>
                      <Styled.Bar status={status}>
                        <span />
                      </Styled.Bar>
                    </Styled.BarGroup>
                  );
                });
              }

              return data.map((time) => {
                const status = getStatus({
                  start: time.startTime,
                });
                return (
                  <Styled.BarGroup
                    className="end"
                    status={status}
                    key={`${time.startTime}-${time.endTime}`}
                    onClick={() => skip(time.startTime)}
                  >
                    <Styled.Bar status={status}>
                      <span />
                    </Styled.Bar>
                    <Styled.Bar status={status} type="primary">
                      <span />
                    </Styled.Bar>
                  </Styled.BarGroup>
                );
              });
            })}
          </Styled.BarContainer>
        </Styled.MainBar>
      </Styled.Wrapper>
    ),
    [
      getStatus,
      skip,
      wordTimings,
      newTime,
      totalTime,
      userOneTime,
      userTwoTime,
      duration,
    ]
  );
};

export default AudioLine;
