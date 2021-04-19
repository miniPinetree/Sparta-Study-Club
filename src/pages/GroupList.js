import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import styled from "styled-components";
import { Grid, Button, Text, Image } from "../elements";
import { Header, Chat } from "../components";
import { history } from "../redux/configStore";
import Runtan from "../images/runtan.gif";
import Cheer from "../images/cheer.png";
import Fire from "../images/fire.png";
import Spinner from "../shared/Spinner";
import "../scss/class.scss";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import GroupCreate from "../components/GroupCreate";
import { actionCreators as groupActions } from "../redux/modules/group";

const GroupList = (props) => {
  const dispatch = useDispatch();

  const group_list = useSelector((state) => state.group.group_list);

  const chatOnOff = useSelector((state) => state.quest.chat);
  const loading = useSelector((state) => state.quest.isLoading);

  const [modalOpen, setModalOpen] = React.useState(false);
  const openModal = () => {
    console.log(modalOpen);
    setModalOpen(true);
  };
  const closeModal = () => {
    console.log(modalOpen);
    setModalOpen(false);
  };

  const joinClub = (group) => {
    if(group_list.joined.length>6){
      Swal.fire({
        text: "클럽은 5개까지만 가입할 수 있어요 🤓",
        confirmButtonColor: "rgb(118, 118, 118)",
      });
    }
    Swal.fire({
      title: "클럽에 가입하시겠어요?",
      showCancelButton: true,
      confirmButtonColor: "#E2344E",
      confirmButtonText: "가입",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(groupActions.addMemberDB(group));
      }
    });
  };

  React.useEffect(() => {
    console.log("DB에서 받아온 정보");
    dispatch(groupActions.getGroupDB());
  }, []);

  return (
    <React.Fragment>
      <ContainerBox style={chatOnOff ? { paddingLeft: "230px" } : {}}>
        <Header />
        <Chat chat={chatOnOff} />
        {loading ? (
          <Spinner />
        ) : (
          <ContentBox>
            <ListBox>
              <BoxTitle>마이 클럽</BoxTitle>
              {group_list.joined.map((group, idx) => {
                return (
                  <GroupBox key={group.groupId}>
                    <TextBox>
                      <Text size="15px" bold title>
                        {group.groupName}
                      </Text>
                      <Text size="12px" margin="1px 3px 0px 0">
                        {group.groupDesc}
                      </Text>
                    </TextBox>
                    <BtnBox>
                      <Image src={Fire} width="50px" height="45px" contain />
                      <Button
                        size="11px"
                        padding="2px 0px"
                        _onClick={() => {
                          history.push(`/group/detail/${group.groupId}`);
                        }}
                      >
                        입장하기
                      </Button>
                    </BtnBox>
                  </GroupBox>
                );
              })}
            </ListBox>

            <ListBox>
              <BoxTitle>전체 보기</BoxTitle>
              {group_list.unjoined.map((group, idx) => {
                return (
                  <GroupBox key={group.groupId}>
                    <TextBox>
                      <Text size="15px" bold title>
                        {group.groupName}
                      </Text>
                      <Text size="12px" margin="1px 3px 0px 0">
                        {group.groupDesc}
                      </Text>
                    </TextBox>
                    <BtnBox>
                      <Image src={Cheer} width="50px" height="45px" contain />
                      <Button
                        size="11px"
                        padding="2px 0px"
                        _onClick={() => {
                          joinClub(group);
                        }}
                      >
                        가입하기
                      </Button>
                    </BtnBox>
                  </GroupBox>
                );
              })}
              <MoreBtn>
                <ArrowForwardIosIcon style={{ color: "white", fontSize: 30 }} />
              </MoreBtn>
            </ListBox>
            <IconBox>
              <AddToPhotosIcon
                style={{ color: "#e3344e", fontSize: 45 }}
                onClick={openModal}
              ></AddToPhotosIcon>
            </IconBox>

            <GroupCreate open={modalOpen} close={closeModal}>
              <main></main>
            </GroupCreate>
          </ContentBox>
        )}
      </ContainerBox>
    </React.Fragment>
  );
};
export default GroupList;

const ContainerBox = styled.div`
  box-sizing: border-box;
  width: 100%;
`;

const ContentBox = styled.div`
  margin: 60px auto 0px auto;
  padding: 0px 100px 0 130px;
  width: 85%;
  gap: 35px;
`;
const BoxTitle = styled.div`
  color: #9b9b9b;
  font-size: 24px;
  font-family: "GmarketSansBold";
  letter-spacing: 1.2px;
  position: absolute;
  top: -23px;
`;
const ListBox = styled.div`
  background-color: rgb(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0px 1px 8px #dfdbdb;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  min-height: 170px;
  max-height: 170px;
  font-size: 17px;
  margin-bottom: 30px;
  display: flex;
  & :last-child {
    margin: 0px;
  }
  position: relative;
`;

const Point = styled.span`
  color: #e3344e;
`;
const GroupBox = styled.div`
  width: 212px;
  min-width: 201.4px;
  height: 130px;
  overflow: hidden;
  background-color: rgb(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0px 1px 8px #dfdbdb;
  text-align: center;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
  font-size: 17px;
  display: flex;
  justify-content: space-between;
  margin: 0 10px 0 0;
`;

const TextBox = styled.div`
  min-width: 80px;
  box-sizing: border-box;
  padding: 0 5px 0 0;
`;

const BtnBox = styled.div`
  margin: auto 0px;
`;

const MoreBtn = styled.div`
  width: 30px;
  height: 170px;
  position: absolute;
  background-color: #e3344e;
  right: 0px;
  top: 0px;
  border-radius: 0 10px 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const IconBox = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;
