// Header.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // Drawerを開閉する関数
  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  // ページ遷移を行う関数
  const headerHandleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* AppBarの定義 */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar component="header" position="fixed" color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              モチトモ
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Drawerの定義 */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "white", // Drawerの背景色を白に設定
          },
        }}
      >
        <List>
          <ListItem
            component="button"
            onClick={() => headerHandleNavigation("/goal-setting")}
            sx={{
              color: "white", // テキストの色
              backgroundColor: "red", // 背景色を赤に設定
              '&:hover': { // ホバー時の色変更
                backgroundColor: "darkred",
              },
              marginBottom: 1, // アイテム間のスペースを少し追加
            }}
          >
            <ListItemText primary="目標設定" />
          </ListItem>
          <ListItem
            component="button"
            onClick={() => headerHandleNavigation("/goal-result")}
            sx={{
              color: "white",
              backgroundColor: "red",
              '&:hover': {
                backgroundColor: "darkred",
              },
              marginBottom: 1,
            }}
          >
            <ListItemText primary="目標達成確認" />
          </ListItem>
          <ListItem
            component="button"
            onClick={() => headerHandleNavigation("/help")}
            sx={{
              color: "white",
              backgroundColor: "red",
              '&:hover': {
                backgroundColor: "darkred",
              },
            }}
          >
            <ListItemText primary="使い方" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Header;
