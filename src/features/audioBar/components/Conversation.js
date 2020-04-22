import React from "react";
import styled from "@emotion/styled";
import { compareWord, inBetween } from "../helpers";

const Styled = {
  Word: styled.span`
    background-color: ${(props) => {
      if (props.selected) {
        return props.theme.colors.lightBlue;
      }

      if (props.searched) {
        return props.theme.colors.yellow;
      }

      return "transparent";
    }};
    margin-left: 5px;
    transition: 0.3s;
    &:hover {
      background-color: ${(props) => props.theme.colors.lightBlue};
      cursor: pointer;
    }
  `,

  Conversation: styled.div`
    background-color: transparent;
    display: flex;
    flex-direction: row;
    padding: 1em;
    padding-left: ${(props) => (!props.active ? "80px" : "20px")};
    &:hover {
      background-color: ${(props) => props.theme.colors.lighterBlue};
    }
    time {
      font-weight: 600;

      padding: 0.25em 0.75em;
      color: ${(props) =>
        props.active ? props.theme.colors.purple : props.theme.colors.primary};
    }

    blockquote {
      width: 80%;
      border-left: 3px solid
        ${(props) =>
          props.primary
            ? props.theme.colors.lightPurple
            : props.theme.colors.lightBlue};
      margin: 0;
      padding: 0.25em 0.75em;
      outline: 0;

      &:before {
        color: #ccc;
        font-size: 4em;
        line-height: 0.1em;
        margin-right: 0.25em;
        vertical-align: -0.4em;
      }
      .share {
        visibility: hidden;
        opacity: 0;
        height: 0;
        transition: visibility 0s linear 0.15s, opacity 0.15s linear;
        span {
          font-weight: 600;
          color: ${(props) => props.theme.colors.primary};
          text-decoration: none;
          margin: 0.75em 0;
          display: inline-block;
        }
      }

      &:focus {
        .share {
          visibility: visible;
          opacity: 1;
          height: initial;
          transition-delay: 0s;
        }
      }
    }
  `,

  ClearAction: styled.span`
    font-weight: 600;
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
    margin: 0.75em 0.25em;
    display: inline-block;
    &:hover {
      cursor: pointer;
    }
  `,
};

const Conversation = ({
  active,
  totalTime,
  user,
  currentTime,
  filterWord,
  paddingLeft,
  skip,
}) => (
  <Styled.Conversation active={active} paddingLeft={paddingLeft}>
    <time>{parseFloat(totalTime).toFixed(2)}</time>
    <blockquote tabIndex="0">
      {user.map((data) => (
        <Styled.Word
          key={parseFloat(data.startTime) + parseFloat(data.endTime)}
          searched={compareWord(data.word, filterWord)}
          selected={inBetween({
            selected: currentTime,
            min: parseFloat(data.startTime),
            max: parseFloat(data.endTime),
          })}
          onClick={() => skip(data.startTime)}
        >
          {data.word}
        </Styled.Word>
      ))}
      <div className="share">
        <Styled.ClearAction onClick={() => alert("Share!")}>
          Share
        </Styled.ClearAction>
      </div>
    </blockquote>
  </Styled.Conversation>
);

export default Conversation;
