import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  Avatar,
} from "@mui/material/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import InfoIcon from "@material-ui/icons/Info";

import moment from "moment";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();

  const Likes = () => {
    // if (post?.likes?.length > 0) {
    //   return post.likes.find(
    //     (like) => like === (user?.result?.googleId || user?.result?._id)
    //   ) ? (
    //     <>
    //       <ThumbUpAltIcon fontSize="small" />
    //       &nbsp;
    //       {post.likes.length > 2
    //         ? `You and ${post.likes.length - 1} others`
    //         : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
    //     </>
    //   ) : (
    //     <>
    //       <ThumbUpAltOutlined fontSize="small" />
    //       &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
    //     </>
    //   );
    // }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));
    // history.push(`/posts/${post._id}`);
    navigate(`/questions/${post._id}`);
  };

  return (
    <Card raised elevation={6} style={{ marginLeft: "15px" }}>
      <ButtonBase component="span" name="test" onClick={openPost}>
        {/* <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.title}
        /> */}

        <Typography
          variant="body2"
          style={{
            marginBottom: "20px",
            marginTop: "20px",
            marginLeft: "20px",
            color: "black",
          }}
        >
          <strong>{moment(post.createdAt).fromNow()}</strong>
        </Typography>
        <div>
          <Typography variant="h6">{post.name}</Typography>
        </div>
        {user?.email === post?.uemail && (
          <div name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{ color: "white" }}
              size="small"
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}
        <div>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography gutterBottom variant="h5" component="h2">
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.description.split(" ").splice(0, 20).join(" ")}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions>
        <Button size="small" color="primary" ml onClick={() => {}}></Button>

        <Button
          size="small"
          color="secondary"
          onClick={openPost}
          style={{ backgroundColor: "#12824C", color: "#FFFFFF" }}
        >
          &nbsp; View More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
