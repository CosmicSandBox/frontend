'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import BasicButton from '@/components/common/button/Button';
import SubHeader from '@/components/common/layout/SubHeader';
import MainHeader from '@/components/common/layout/MainHeader';
import ClipboardCopy from '@/components/copy/Copy';
import NameList from '@/components/list/NameList';

interface Participant {
  id: number;
  name: string;
  major: string;
  studentNumber: string;
  age: string;
  mbti: string;
  content: string;
}

interface ListType {
  id: number;
  content: string;
  matchingStatus: boolean;
  title: string;
  desiredNumPeople: number;
  gender: string;
  authorName: string;
  openTalkLink: string;
  participants: Participant[];
}

const MyDetail = () => {
  // 쿼리 받아오기
  const searchParams = useSearchParams();
  const search = searchParams.get('id');

  // 리스트 받아오기
  const [postInfo, setPostInfo] = useState<ListType | null>(null);

  useEffect(() => {
    axios
      .get(`http://www.hufsting.com:8080/api/v1/matchingposts/${search}`)
      .then(res => {
        const { data } = res;
        setPostInfo(data);
      })
      .catch(error => {
        // 사용자에게 오류 메시지를 표시하는 대신 다른 작업을 수행할 수 있습니다.
        alert(
          `데이터를 불러오는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.${error}`,
        );
      });
  }, [search]);

  // 매칭 글 삭제
  const handleRemove = () => {
    // axios.delete(`http://www.hufsting.com:8080/api/v1/matchingposts/${search}`);
  };

  const handleEdit = () => {
    window.location.href = 'http://localhost:3000/editing';
  };

  return (
    <Container>
      <MainHeader />
      <SubHeader title="내가 올린 훕팅" />
      {postInfo !== null && (
        <div className="otherInfo">
          <SubTitle>희망 인원 수</SubTitle>
          <div className="desiredNumPeople">
            <p>{postInfo.desiredNumPeople}</p>
          </div>
          <OtherInfo>
            <div className="top">
              <SubTitle>오픈채팅방 링크</SubTitle>
              <ClipboardCopy text={postInfo.openTalkLink} />
            </div>
            <p>{postInfo.openTalkLink}</p>
            <div className="bottom">
              <SubTitle>훕팅 신청 ?건</SubTitle>
            </div>
          </OtherInfo>
        </div>
      )}
      {postInfo !== null && (
        <div className="listbox">
          <NameList
            desiredNumPeople={postInfo.desiredNumPeople}
            participants={postInfo.participants}
            editable={false}
          />
        </div>
      )}
      <BasicButtonWrapper>
        <BasicButton
          color="gray"
          assetType="Primary"
          size="M"
          content="삭제하기"
          onClickEvent={handleRemove}
          isActive
          width="48%"
        />
        <BasicButton
          color="red"
          assetType="Primary"
          size="M"
          content="수정하기"
          onClickEvent={handleEdit}
          isActive
          width="48%"
        />
      </BasicButtonWrapper>
    </Container>
  );
};

export default MyDetail;

const Container = styled.div`
  padding: 33px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .otherInfo {
    padding: 25px 22px;

    .desiredNumPeople {
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      height: 30px;
      background-color: #f3f5f7;
      border-radius: 10px;
    }
  }

  .listbox {
    padding: 30px 30px;
    background-color: #f3f5f7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const SubTitle = styled.p`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const OtherInfo = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .bottom {
    margin-top: 15px;
  }
`;

const BasicButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 390px;
  bottom: 0;
  padding: 22px;
  z-index: 1000;
`;
