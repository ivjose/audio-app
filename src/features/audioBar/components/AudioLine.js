import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

const Styled = {
  Wrapper: styled.section`
    height: 105px;
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
      height: 2px;
      position: absolute;
      top: 50%;
      left: 0;
      z-index: 1;
      transform: translate(0, -50%);
    }
  `,
  BarGroup: styled.div`
    width: 100%;
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
    border: 2px solid
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
    height: 50px;
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

  Label: styled.div`
    height: 50px;
    display: flex;
    align-items: center;

    label {
      color: ${(props) =>
        props.type === "primary"
          ? props.theme.colors.primary
          : props.theme.colors.purple};
      font-weight: 600;
    }
  `,

  TimeWrapper: styled.span`
    background-color: ${(props) => props.theme.colors.lighterGray};
    display: inline-block;
    padding: 5px 10px;
    margin: 0.75em;
    border-radius: 5px;

    time {
      font-weight: 600;
      &.dim {
        color: ${(props) => props.theme.colors.secondary};
      }
    }
  `,
};

function secondsToMinutes(timeInSeconds) {
  const pad = (num, size) => {
      return ("000" + num).slice(size * -1);
    },
    time = parseFloat(timeInSeconds).toFixed(3),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60);

  return `${pad(minutes, 2)}:${pad(seconds, 2)}`;
}

function percentage(partialValue, totalValue) {
  const percentValue = (100 * partialValue) / totalValue;
  return `${Math.round(percentValue)}%`;
}

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

  console.log(userTwoTime, "DASDASD");

  return useMemo(
    () => (
      <div>
        <div>
          <Styled.TimeWrapper>
            <time>{newTime}</time> / <time className="dim">{totalTime}</time>
          </Styled.TimeWrapper>
        </div>
        <Styled.Wrapper>
          <Styled.BarContainer width={200}>
            <Styled.BarGroup>
              <Styled.Label type="primary">
                <label>{percentage(userOneTime, duration)} YOU</label>
              </Styled.Label>
              <Styled.Label>
                <label>{percentage(userTwoTime, duration)} MICHEAL B.</label>
              </Styled.Label>
            </Styled.BarGroup>
          </Styled.BarContainer>
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
        </Styled.Wrapper>
      </div>
    ),
    [getStatus, skip, wordTimings, newTime, totalTime, userOneTime, userTwoTime]
  );
};

export default AudioLine;
