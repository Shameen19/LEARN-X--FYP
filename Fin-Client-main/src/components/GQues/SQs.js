import React from "react";
import moment from "moment";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Avatar,
  Button,
  Typography,
  ButtonBase,
  Divider,
} from "@mui/material";
import { Favorite, Share, MoreHoriz } from "@material-ui/icons";

const QuestionCard = ({ question }) => {
  const { title, description, interactions, tags, username, created } =
    question;

  return (
    <Card>
      <CardMedia
        image="https://source.unsplash.com/random"
        style={{ height: 150 }}
      />
      <CardContent>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
          <Avatar>{username[0]}</Avatar>
          <Typography style={{ marginLeft: 8 }}>
            {username} • {moment(created).fromNow()}
          </Typography>
        </div>
        <Divider style={{ margin: "8px 0" }} />
        <Typography variant="body1" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<Favorite />} color="secondary">
          {interactions.likes}
        </Button>
        <Button size="small" startIcon={<Share />} color="secondary">
          {interactions.shares}
        </Button>
        <Button size="small" startIcon={<MoreHoriz />} color="secondary">
          More
        </Button>
      </CardActions>
      <Divider style={{ margin: "8px 0" }} />
      <div style={{ display: "flex", flexWrap: "wrap", margin: "8px -4px" }}>
        {tags.map((tag) => (
          <Typography
            key={tag}
            variant="body2"
            style={{
              backgroundColor: "#e0e0e0",
              padding: "2px 8px",
              margin: 4,
              borderRadius: 4,
            }}
          >
            {tag}
          </Typography>
        ))}
      </div>
    </Card>
  );
};

export default QuestionCard;
