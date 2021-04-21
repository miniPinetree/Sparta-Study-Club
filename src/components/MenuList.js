import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Swal from "sweetalert2";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as groupActions } from "../redux/modules/group";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const MenuListComposition = (props) => {
  const dispatch = useDispatch();
  const { open, handleClose, founder, group } = props;
  const user = useSelector((state) => state.user.user);
  const is_founder = founder === user.nickname;
  const classes = useStyles();

  const alert=()=>{
    Swal.fire({
      text: "준비 중 입니다. ",
      confirmButtonColor: "rgb(118, 118, 118)",
    });
  }

  return (
    <React.Fragment>
      {open ? (
        <Paper className={classes.paper}>
          <ClickAwayListener onClickAway={handleClose}>
            {is_founder ? (
              <MenuList autoFocusItem={open} id="menu-list-grow">
                <MenuItem onClick={alert}>클럽 관리</MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(groupActions.deleteGroupDB(group));
                  }}
                >
                  클럽 삭제
                </MenuItem>
              </MenuList>
            ) : (
              <MenuList autoFocusItem={open} id="menu-list-grow">
                <MenuItem onClick={()=>{
                    dispatch(groupActions.deleteGroupDB(group));
                }}>클럽 탈퇴</MenuItem>
              </MenuList>
            )}
          </ClickAwayListener>
        </Paper>
      ) : null}
    </React.Fragment>
  );
};
export default MenuListComposition;
