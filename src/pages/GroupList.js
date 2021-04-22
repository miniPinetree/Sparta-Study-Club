import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import styled from "styled-components";
import { Button, Text, Image } from "../elements";
import { Header, Chat } from "../components";
import { history } from "../redux/configStore";
import {Cheer, Fire} from "../images";
import Spinner from "../shared/Spinner";
import "../scss/class.scss";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import GroupCreate from "../components/GroupCreate";
import { actionCreators as groupActions } from "../redux/modules/group";
import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";

const GroupList = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user.user);
  const group_list = useSelector((state) => state.group.group_list);
  const chatOnOff = useSelector((state) => state.quest.chat);
  const loading = useSelector((state) => state.group.isLoading);
  const [modalOpen, setModalOpen] = React.useState(false);

  const openModal = () => {
    console.log(modalOpen);
    setModalOpen(true);
  };
  const closeModal = () => {
    console.log(modalOpen);
    setModalOpen(false);
  };

  const alert = () => {
    Swal.fire({
      html: `원활한 활동을 위해<br/>클럽은 동시에 4곳만 가입할 수 있어요 😸`,
      confirmButtonColor: "rgb(118, 118, 118)",
    });
  };

  const joinClub = (group) => {
    if (group_list.joined.length >= 4) {
      Swal.fire({
        html: `원활한 활동을 위해<br/>클럽은 동시에 4곳만 가입할 수 있어요 😸`,
        confirmButtonColor: "rgb(118, 118, 118)",
      });
    } else {
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
    }
  };
  React.useEffect(() => {
      dispatch(groupActions.getGroupDB());
  }, []);
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: false,
    pauseOnHover: true,
    responsive: [
      // 반응형 웹 구현 옵션
      {
        breakpoint: 1412,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1149,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 811,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 545,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <React.Fragment>
      <ContainerBox chatOnOff={chatOnOff}>
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

            <SlideBox>
              <BoxTitle>전체 보기</BoxTitle>
              <Slider {...settings}>
                {group_list.unjoined.map((group, idx) => {
                  return (
                    <div key={group.groupId}>
                      <GroupBox>
                        <TextBox>
                          <Text size="15px" bold title>
                            {group.groupName}
                          </Text>
                          <Text size="12px" margin="1px 3px 0px 0">
                            {group.groupDesc}
                          </Text>
                        </TextBox>
                        <BtnBox>
                          <Image
                            src={Cheer}
                            width="50px"
                            height="45px"
                            contain
                          />
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
                    </div>
                  );
                })}
              </Slider>
            </SlideBox>

            <IconBox>
              {group_list.joined.length >= 4 ? (
                <AddToPhotosIcon
                  style={{ color: "#e3344e", fontSize: 45 }}
                  onClick={alert}
                ></AddToPhotosIcon>
              ) : (
                <AddToPhotosIcon
                  style={{ color: "#e3344e", fontSize: 45 }}
                  onClick={openModal}
                ></AddToPhotosIcon>
              )}
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
  ${props=>props.chatOnOff? `padding-left:230px`:`null`};
  @media all and  (max-width:1023px){
    padding:0;
    overflow:hidden;
  }
`;
const ContentBox = styled.div`
  margin: 60px auto 0px auto;
  padding: 0px 100px 0 130px;
  width: 85%;
  gap: 35px;
  @media all and  (max-width:1023px){
    margin:0 0 0 80px ;
    padding:130px 0 0 0;
    box-sizing:border-box;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:flex-end;
  }
  @media all and (max-width:767px)
 { margin:0 0 0 50px ;
  padding:23px 0 0 0;
   gap: 0px; }
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
  @media all and (min-width:768px) and (max-width:1023px)
 {width: 80%;
 max-height: 380px;
 flex-wrap:wrap;
 align-items:center;
 margin-bottom:80px;
}
  @media all and (max-width:767px)
 {width: 80%;
 height:380px;
 max-height: 380px;
 flex-direction:column;
 }
  & :last-child {
    margin: 0px;
  }
  position: relative;
`;

const SlideBox = styled.div`
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
  position: relative;
  @media all and (min-width:768px) and (max-width:1023px)
 {width: 80%;
 }
 @media all and (max-width:767px)
 {width: 80%;
 height:190px;
 margin-bottom: 10px;
 }
  & :last-child {
    margin: 0px;
  }
`;
const GroupBox = styled.div`
  max-width: 220px;
  min-width: 220px;
  overflow: hidden;
  background-color: rgb(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0px 1px 8px #dfdbdb;
  text-align: center;
  align-items: center;
  min-height: 130px;
  max-height: 130px;
  padding: 10px 20px;
  box-sizing: border-box;
  font-size: 17px;
  display: flex;
  justify-content: space-between;
  margin: 0 10px 0 0;
  @media all and (max-width:767px)
 {
  min-height: 20%;
  height: 130px;
 }
`;

const TextBox = styled.div`
  min-width: 80px;
  box-sizing: border-box;
  padding: 0 5px 0 0;
`;

const BtnBox = styled.div`
  margin: auto 0px;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;
