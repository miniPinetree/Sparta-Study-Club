import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Grid, Text, Image } from "../elements";
import { Header, Chat } from "../components";
import { Runtan, Jump, Fire, Dino, Trophy } from "../images";
import Spinner from "../shared/Spinner";
import Comment from "../components/Comment";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import MenuListComposition from "../components/MenuList";
import { actionCreators as groupActions } from "../redux/modules/group";
import { actionCreators as cmtActions } from "../redux/modules/comment";

const GroupDetail = (props) => {
  const dispatch = useDispatch();
  const group_list = useSelector((state) => state.group.group_list.joined);
  const id = props.match.params.id;
  const group = group_list.find((group) => group.groupId === id);
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.group.isLoading);
  const cmt_list = useSelector((state) => state.comment.cmt_list);
  const chatOnOff = useSelector((state) => state.quest.chat);
  //랭킹 다중조건 정렬, 불변성 관리를 위해 복제 후 정렬
  const rank = useSelector((state) => state.group.rank);
  const rankForSort = [...rank];
  const sorted_rank = rankForSort.sort(
    (a, b) => b.questRate - a.questRate || b.studySetTime - a.studySetTime
  );

  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  React.useEffect(() => {
    dispatch(groupActions.getGroupDB());
    dispatch(groupActions.getRankDB(id));
    dispatch(cmtActions.setCmtDB(id));
  }, []);

  return (
    <React.Fragment>
      <ContainerBox style={chatOnOff ? { paddingLeft: "230px" } : {}}>
        <Header />
        <Chat chat={chatOnOff} />
        {!cmt_list || !group || isLoading ? (
          <Spinner />
        ) : (
          <ContentBox>
            <ListBox>
              <BoxTitle>
                <Image src={Runtan} width="50px" height="50px" contain />
                <Text size="11px">
                  클럽장
                  <br /> {group.nickname}
                </Text>
              </BoxTitle>
              {/* 토글메뉴 */}
              <TopMenu onClick={handleToggle}>
                <MenuListComposition
                  open={open}
                  handleClose={handleClose}
                  founder={group.nickname}
                  group={group}
                />
                <MoreHorizIcon />
              </TopMenu>

              <GroupBox>
                <Text bold margin="0 0 2px 0">
                  {group.groupName}
                </Text>
                <Text size="14px">{group.groupDesc}</Text>
                <TodoInput
                  value={msg}
                  onChange={(e) => {
                    setMsg(e.target.value);
                  }}
                  placeholder={`${user.nickname}님! 각오 한 마디 남겨주세요!`}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && msg) {
                      dispatch(cmtActions.addCmtDB(group.groupId, msg));
                      setMsg("");
                    }
                  }}
                />
              </GroupBox>
              <CmtList>
                {cmt_list.map((cmt) => (
                  <Comment key={cmt.cmtId} cmt={cmt} />
                ))}
              </CmtList>
            </ListBox>

            <RankList>
              <BoxTitle>명예의 전당</BoxTitle>
              <Grid>
                {sorted_rank.map((r, idx) => {
                  return idx < 5 ? (
                    idx == 0 ? (
                      <Rank className="first">
                        <Image
                          src={Trophy}
                          width="27px"
                          height="40px"
                          contain
                        />
                        <Text bold title>
                          {r.nickname}
                        </Text>
                        <Text size="8px" center title>
                          {r.studySetTime ? r.studySetTime : 0}시간
                          <br />
                          <Point>{Math.round(r.questRate)}%</Point>
                        </Text>
                      </Rank>
                    ) : (
                      <Rank>
                        <Image
                          src={idx < 3 ? Jump : Fire}
                          width="30px"
                          height="40px"
                          contain
                        />
                        <Text bold title>
                          {r.nickname}
                        </Text>
                        <Text size="8px" center title>
                          {r.studySetTime ? r.studySetTime : 0}시간
                          <br />
                          <Point>{Math.round(r.questRate)}%</Point>
                        </Text>
                      </Rank>
                    )
                  ) : null;
                })}
              </Grid>
              <DinoImg>
                <Image
                  src={Dino}
                  width="220px"
                  height="80px"
                  margin="30px 0 0 0"
                  contain
                />
              </DinoImg>
            </RankList>
          </ContentBox>
        )}
      </ContainerBox>
    </React.Fragment>
  );
};
export default GroupDetail;

const ContainerBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  @media all and (max-width: 767px) {
    overflow: hidden;
  }
`;

const ContentBox = styled.div`
  margin: 60px auto 0px auto;
  padding: 0px 100px 0 130px;
  width: 85%;
  gap: 35px;
  display: flex;
  justify-content: center;
  @media all and (min-width: 768px) and (max-width: 1023px) {
    flex-direction: column;
  }
  @media all and (max-width: 767px) {
    padding: 0px 50px 0 60px;
    margin: 55px auto 0px auto;
    flex-direction: column;
    gap: 15px;
  }
`;
const BoxTitle = styled.div`
  color: #e3344e;
  font-size: 24px;
  font-family: "GmarketSansBold";
  letter-spacing: 1.2px;
  position: absolute;
  top: -23px;
  display: flex;
`;

const TopMenu = styled.div`
  font-size: 24px;
  font-family: "GmarketSansBold";
  letter-spacing: 1.2px;
  position: absolute;
  top: 20px;
  right: 28px;
  display: flex;
  cursor: pointer;
  :hover {
  }
`;
const ListBox = styled.div`
  background-color: rgb(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0px 1px 8px #dfdbdb;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  font-size: 17px;
  margin-bottom: 30px;
  @media all and (max-width: 1023px) {
    width: 90%;
  }
  & :last-child {
    margin: 0px;
  }
  position: relative;
`;

const GroupBox = styled.div`
  width: 400px;
  height: 140px;
  overflow: hidden;
  background-color: rgb(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0px 1px 8px #dfdbdb;
  text-align: center;
  align-items: center;
  padding: 15px 20px;
  box-sizing: border-box;
  font-size: 17px;
  margin-bottom: 20px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 545px;
  }
  @media all and (max-width: 767px) {
    width: 250px;
  }
`;

const RankList = styled.div`
  background-color: rgb(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0px 1px 8px #dfdbdb;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  font-size: 17px;
  margin-bottom: 30px;
  position: relative;
  justify-content: space-between;
  @media all and (max-width: 1023px) {
    width: 90%;
  }
`;

const Rank = styled.div`
margin: 13px auto 0 auto;
width:210px;
height:48px;
box-sizing:border-box;
background-color: ${(props) => (props.className ? "#FCE3E3;" : "#ffffff;")}
    padding: 4px 23px;
    border-radius: 103px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    white-space: pre-line;
    @media all and (max-width:1023px)
 {height:35px;
 } 
`;

const DinoImg = styled.div`
  @media all and (max-width: 1023px) {
    display: none;
  }
`;

const Point = styled.span`
  color: #e3344e;
`;

const CmtList = styled.div`
  margin-top: 18px;
  max-height: 515px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 17px;
    height: 100vh;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 20px;
    height: 50px;
    background-clip: padding-box;
    border: 4px solid transparent;
  }
`;

const TodoInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1.5px solid #e3344e;
  width: 240px;
  outline: none;
  text-align: center;
  padding: 7px;
  margin-top: 7px;
  @media all and (max-width: 1023px) {
    width: 80%;
    ::placeholder {
      font-size: 0.8em;
    }
  }
`;
