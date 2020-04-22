import React, { useMemo } from "react";
import styled from "@emotion/styled";

import SearchBox from "components/SearchBox";

import Conversation from "./components/Conversation";
import { compareWord } from "./helpers";

const Styled = {
  Wrapper: styled.section`
    flex: 1;
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

const AudioConversation = ({
  wordTimings,
  currentTime,
  filterWord,
  searchWord,
  handleSelectWord,
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
                  <Conversation
                    active
                    key={key}
                    totalTime={totalTime.endTime}
                    user={user}
                    skip={handleSelectWord}
                    currentTime={currentTime}
                    filterWord={filterWord}
                  />
                );
              } else {
                const totalTime = user[user.length - 1];
                const findWord = user.some((data) =>
                  compareWord(data.word, filterWord)
                );

                if (!findWord && filterWord) return null;

                return (
                  <Conversation
                    paddingLeft={20}
                    key={key}
                    totalTime={totalTime.endTime}
                    user={user}
                    skip={handleSelectWord}
                    currentTime={currentTime}
                    filterWord={filterWord}
                  />
                );
              }
            })}
        </div>
      </Styled.Wrapper>
    ),
    [
      wordTimings,
      currentTime,
      handleSelectWord,
      filterWord,
      handleSearchWord,
      searchWord,
      handleClearSearch,
      countFilteredWord.length,
    ]
  );
};

export default AudioConversation;
