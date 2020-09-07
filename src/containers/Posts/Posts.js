import React from "react";
import classes from './Posts.module.css';
import Post from "../../components/Post/Post";
import CreatePost from "./CreatePost/CreatePost";


class Posts extends React.Component{

    render() {
        return(
            <div className={classes.Posts}>
                <h2>Home</h2>
                <CreatePost />

                <Post />
                <Post />
                <Post />
                <Post />
                <Post />

                <h2>POST</h2>
                <h2>POST</h2>
                <h2>POST</h2>
                <h2>POST</h2>
                <h2>POST</h2>
                <h2>POST</h2>
                <h2>POST</h2>
                <h2>POST</h2>
                <h2>POST</h2>
                <h2>POST</h2>
                <h2>POST</h2>
                <h2>POST</h2>
                <h2>POST</h2>
                <h2>POST</h2>
                <h2>POST</h2>
                <h2>POST</h2>
                <h2>POST</h2>
                <h2>POST</h2>
                <h2>POST</h2>
                <h2>POST</h2>


            </div>
        );
    }
}

export default Posts