import React, { useMemo } from "react";
import styled from "@emotion/styled";

import SearchBox from "components/SearchBox";
import useDebounce from "hooks/useDebounce";

const Styled = {
  Wrapper: styled.section`
    flex: 1;
  `,

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
    padding-left: ${(props) => (!props.primary ? "80px" : "20px")};
    &:hover {
      background-color: ${(props) => props.theme.colors.lighterBlue};
    }
    time {
      font-weight: 600;

      padding: 0.25em 0.75em;
      color: ${(props) =>
        props.primary ? props.theme.colors.primary : props.theme.colors.purple};
    }

    blockquote {
      width: 80%;
      border-left: 3px solid
        ${(props) =>
          props.primary
            ? props.theme.colors.lightBlue
            : props.theme.colors.lightPurple};
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

const inBetween = ({ selected, min, max }) => selected > min && selected < max;

const compareWord = (wordOne, wordTwo) => {
  const regex = /[.,\s]/g;

  if (!wordOne || !wordTwo) {
    return false;
  }

  return (
    wordOne.toLowerCase().replace(regex, "") ===
    wordTwo.toLowerCase().replace(regex, "")
  );
};

const AudioConversation = ({
  wordTimings,
  currentTime,
  filterWord,
  searchWord,
  skip,
  userOneTime,
  userTwoTime,
  handleSearchWord,
  handleClearSearch,
}) => {
  const countFilteredWord =
    filterWord &&
    wordTimings.flat().filter((data) => compareWord(data.word, filterWord));

  return useMemo(
    () => (
      <Styled.Wrapper>
        <SearchBox
          placeholder="Search call transcript"
          value={searchWord}
          onChange={handleSearchWord}
        />
        {filterWord && (
          <span>
            <strong>{countFilteredWord.length} results - </strong>

            <Styled.ClearAction onClick={handleClearSearch}>
              Clear search
            </Styled.ClearAction>
          </span>
        )}

        <div>
          {wordTimings.length > 0 &&
            wordTimings.map((user, key) => {
              if (key % 2 === 0) {
                const totalTime = user[user.length - 1];
                const findWord = user.some((data) =>
                  compareWord(data.word, filterWord)
                );

                if (!findWord && filterWord) return null;

                return (
                  <Styled.Conversation key={key} primary>
                    <time>{parseFloat(totalTime.endTime).toFixed(2)}</time>
                    <blockquote tabIndex="0">
                      {user.map((data) => {
                        return (
                          <Styled.Word
                            key={
                              parseFloat(data.startTime) +
                              parseFloat(data.endTime)
                            }
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
                        );
                      })}
                      <div className="share">
                        <Styled.ClearAction onClick={() => alert("Share!")}>
                          Share
                        </Styled.ClearAction>
                      </div>
                    </blockquote>
                  </Styled.Conversation>
                );
              } else {
                const totalTime = user[user.length - 1];
                const findWord = user.some((data) =>
                  compareWord(data.word, filterWord)
                );

                if (!findWord && filterWord) return null;

                return (
                  <Styled.Conversation key={key} paddingLeft={20}>
                    <time>{parseFloat(totalTime.endTime).toFixed(2)}</time>
                    <blockquote tabIndex="0">
                      {user.map((data) => (
                        <Styled.Word
                          key={
                            parseFloat(data.startTime) +
                            parseFloat(data.endTime)
                          }
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
              }
            })}
        </div>
      </Styled.Wrapper>
    ),
    [
      wordTimings,
      currentTime,
      skip,
      filterWord,
      handleSearchWord,
      searchWord,
      handleClearSearch,
      countFilteredWord.length,
    ]
  );
};

export default AudioConversation;
