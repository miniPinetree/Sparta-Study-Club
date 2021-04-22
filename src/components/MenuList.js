import React from "react";
import Swal from "sweetalert2";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
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
  const { open, handleClose, founder, group } = props;
  const user = useSelector((state) => state.user.user);
  const is_founder = founder === user.nickname;
  const dispatch = useDispatch();
  const classes = useStyles();

  const alert = () => {
    Swal.fire({
      text: "준비 중인 기능입니다. ",
      confirmButtonColor: "rgb(118, 118, 118)",
    });
  };
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
                <MenuItem
                  onClick={() => {
                    dispatch(groupActions.deleteGroupDB(group));
                  }}
                >
                  클럽 탈퇴
                </MenuItem>
              </MenuList>
            )}
          </ClickAwayListener>
        </Paper>
      ) : null}
    </React.Fragment>
  );
};
export default MenuListComposition;
