import React, { useState } from 'react';
import '../components/Post.css';
import Image from '../../core/Image';
import Heading from '../../core/Heading';
import logic from '../../../logic';
import ConfirmDelete from './ConfirmDelete';
import Time from '../../core/Time';


function Post({ post, onPostDeleted, onPostLikeToggled }) {
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const handleCancelDelete = () => { setShowConfirmDelete(false); }

    const showDeletePost = () => { setShowConfirmDelete(true); }

    const handleConfirmDeletePost = () => {
        try {
            logic.deletePost(post.id, error => {
                if (error) {
                    console.error(error);
                    alert(error.message);
                    return;
                }
                onPostDeleted();
            });
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    const handleToggleLikePost = () => {
        try {
            logic.toggleLikePost(post.id, error => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                onPostLikeToggled()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return (
        <article className="post">
            <div className='post-header'>
                <p className='Author'>{post.author.username}</p>
                <Heading className="post-title" level="2">{post.title}</Heading>
            </div>
            <div>
                <Image src={post.image} />
                {showConfirmDelete && (
                    <div className="confirm-delete-container">
                        <ConfirmDelete onConfirmDeletePost={handleConfirmDeletePost} onCancelDeletePost={handleCancelDelete} post={post} />
                    </div>
                )}
            </div>
            <div className='footer-container'>
                <div className='post-footer'>
                    <p>{post.description}</p>
                    {post.author.id === logic.getUserId() && (
                        <button className="Button" onClick={showDeletePost}>Delete</button>
                    )}
                    <Time>{post.date}</Time>
                </div>
                <div className='post-icons'>

                    <div>
                        <button className='toggleLike' onClick={handleToggleLikePost}>{`${post.likes.includes(logic.getUserId()) ? '💜' : '🤍'} ${post.likes.length} like${post.likes.length === 1 ? '' : 's'}`}</button>
                    </div>
                    <div className='icon'>💬</div>
                </div>
            </div>
        </article>
    );
}

export default Post;