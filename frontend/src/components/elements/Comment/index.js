import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import getImageSrc from "@helpers/imageSrc";

import {
  Container,
  Background,
  Author,
  Head,
  Info,
  Time,
  VoteContainer,
  ItemContainer,
  Button,
  Count,
} from "../common/styles";
import { CommentContent } from "./styles";
import { Avatar } from "../../ui/routes/Home/NewPost/styles";
import axiosInstance from "@axios";
import { useSelector } from "react-redux";

const Comment = ({ comment, history }) => {
  //   const user = useSelector((state) => state.user);
  const convertedDate = moment(comment.createdAt, "MM/DD/YYYY, h:mm:ss A");

  //   const [votes, setVotes] = useState({
  //     likes: postCopy ? postCopy.votes.likes : post.votes.likes.length,
  //     dislikes: postCopy ? postCopy.votes.dislikes : post.votes.dislikes.length,
  //     liked: postCopy
  //       ? postCopy.votes.liked
  //       : post.votes.likes.includes(user?.id),
  //     disliked: postCopy
  //       ? postCopy.votes.disliked
  //       : post.votes.dislikes.includes(user?.id),
  //   });

  const background = `http://localhost:4000/uploads/${
    comment.author.background?.split("\\")[1]
  }`;

  //   const vote = async (event) => {
  //     event.stopPropagation();
  //     const type = event.target.name;
  //     if (user) {
  //       const accessToken = JSON.parse(
  //         window.localStorage.getItem("accessToken")
  //       );
  //       try {
  //         axiosInstance.defaults.headers.authorization = "Bearer " + accessToken;
  //         const response = await axiosInstance.post(`/posts/${post._id}/vote`, {
  //           type,
  //           userId: user.id,
  //         });

  //         let updatedVotes = {
  //           ...votes,
  //           liked: response.data.liked,
  //           disliked: response.data.disliked,
  //         };
  //         if (votes.liked || votes.disliked) {
  //           if (updatedVotes.liked) {
  //             if (votes.liked) {
  //               updatedVotes.likes = updatedVotes.likes - 1;
  //             } else {
  //               updatedVotes.likes = updatedVotes.likes + 1;
  //               updatedVotes.dislikes = updatedVotes.dislikes - 1;
  //             }
  //           } else if (updatedVotes.disliked) {
  //             if (votes.disliked) {
  //               updatedVotes.dislikes = updatedVotes.dislikes - 1;
  //             } else {
  //               updatedVotes.likes = updatedVotes.likes - 1;
  //               updatedVotes.dislikes = updatedVotes.dislikes + 1;
  //             }
  //           } else {
  //             if (type === "likes") {
  //               updatedVotes.likes = updatedVotes.likes - 1;
  //             } else {
  //               updatedVotes.dislikes = updatedVotes.dislikes - 1;
  //             }
  //           }
  //         } else {
  //           if (updatedVotes.liked) {
  //             updatedVotes.likes = updatedVotes.likes + 1;
  //           } else {
  //             updatedVotes.dislikes = updatedVotes.dislikes + 1;
  //           }
  //         }
  //         setVotes(updatedVotes);
  //       } catch (error) {}
  //     } else {
  //       toast.error("You have to login to vote.");
  //     }
  //   };
  //   const updatedPost = { ...post, votes };

  const vote = () => {};
  const redirectToProfile = (event) => {
    event.stopPropagation();
    history.push(`/user/${comment.author.username}`);
  };

  return (
    <Container background={background}>
      <Background>
        <Avatar
          src={getImageSrc(comment.author.avatar, "avatar")}
          onClick={redirectToProfile}
        />
        <Head>
          <Info>
            <Author
              onClick={(event) => {
                event.stopPropagation();
                history.push(`/user/${comment.author.username}`);
              }}
            >
              {comment.author.username}
            </Author>
            <Time>{convertedDate.fromNow()}</Time>
          </Info>
          <CommentContent>
            <p>{comment.content}</p>
          </CommentContent>
          <VoteContainer>
            <ItemContainer>
              {/* <Button
                name="likes"
                onClick={vote}
                className={`fa${votes.liked ? "s" : "r"} fa-thumbs-up`}
              /> */}
              <Button
                name="likes"
                onClick={vote}
                className={`far fa-thumbs-up`}
              />
              <Count>0</Count>
            </ItemContainer>
            <ItemContainer>
              <Button
                name="dislikes"
                onClick={vote}
                className={`far fa-thumbs-down`}
              />
              <Count>0</Count>
            </ItemContainer>
          </VoteContainer>
        </Head>
      </Background>
    </Container>
  );
};

export default Comment;
