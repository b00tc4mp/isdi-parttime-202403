import React, { useState } from 'react';
import '../components/Post.css';
import Image from '../../core/Image';
import Heading from '../../core/Heading';
import logic from '../../../logic';
import ConfirmDelete from './ConfirmDelete';
import Time from '../../core/Time';

function Post({ post, onPostDeleted }) {
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

    return (
        <article className="post">
            <div className='post-header'>
                <p className='Author'>{post.author}</p>
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
                    {post.author === logic.getLoggedInUsername() && (
                        <button className="Button" onClick={showDeletePost}>Delete</button>
                    )}
                    <Time>{post.date}</Time>
                </div>
                <div className='post-icons'>
                    <div className='icon'>💜</div>
                    <div className='icon'>🗣️</div>
                    <div className='icon'>💬</div>
                </div>
            </div>
        </article>
    );
}

export default Post;