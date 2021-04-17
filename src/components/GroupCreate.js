import React from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import "../scss/modal.scss";
import styled from "styled-components";
import { Grid, Button, Text, Image, Input } from "../elements";
import { Header, Chat } from ".";
import Runtan from "../images/runtan.gif";
import Friends from "../images/friends.jpg";
import Community from "../images/Community.png";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const GroupCreate=(props)=>{
    const { open, close, header,rate } = props;
    const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };


    return (
      
        <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (  
                <section>
                    <header>
                        <Text>스터디클럽 만들기</Text>
                        <button className="close" onClick={close}> &times; </button>
                    </header>
                    <main>
                        <Grid is_flex margin="0 10px 0 32px" width="85%" height="120px">
                            <Grid>
                            <Text title bold>원하는 스터디클럽을 </Text>
                            <Text title bold>못 찾으셨나요? </Text>
                            <Text title bold><Point>나만의 클럽</Point>을 만드세요! </Text>
                            </Grid>
                        <Image src={Community} width="220px" height="100%" contain margin="0" />
                        </Grid>
                        <InputBox>
                    <TextField
          id="outlined-textarea"
          label="클럽 이름(12자 이내)"
          multiline
          fullWidth 
          variant="outlined"
          color="secondary"
        />
                        <TextField
          id="outlined-multiline-static"
          label="클럽 소개(20자 이내)"
          multiline
          fullWidth 
          rows={3}
          variant="outlined"
          color="secondary"
        />
        </InputBox>
                    </main>
                    <footer>
                    <button className="close" onClick={close}> 저장 </button>
                    </footer>
                </section>
            ) : null }
        </div>
    )
}
export default GroupCreate;


const Point = styled.span`
    color: #e3344e;
`

const InputBox = styled.div`
display:flex;
flex-direction:column;
align-items:center;
margin:auto;
justify-content:space-around;
width:350px;
height:200px;

`;