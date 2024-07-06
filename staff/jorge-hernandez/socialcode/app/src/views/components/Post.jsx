import { useState } from 'react'
import Image from '../../components/core/Image'
import Heading from '../../components/core/Heading'
import Button from '../../components/core/Button'
import Text from '../../components/core/Text'
import LikeUsers from './likeUsers'
import './Post.css'
import logic from '../../logic'
import View from '../../components/library/View'

function Post({ post, onPostDeleted, onPostLikeToggled }) {
  const date = new Date(post.date)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
  const formattedDate = date.toLocaleDateString(undefined, options)

  const [showLikes, setShowLikes] = useState(false)

  const handleDeletePost = (postId) => {
    if (confirm('Are you sure you want to delete this post?'))
      try {
        logic.deletePost(postId, (error) => {
          if (error) {
            console.error(error)
            alert(error.message)
            return
          }
          onPostDeleted()
        })
      } catch (error) {
        console.error(error)
        alert(error.message)
      }
  }

  const handleToggleLikePost = () => {
    try {
      logic.toggleLikePost(post.id, (error) => {
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

  const handleMouseEnter = () => {
    setTimeout(() => {
      setShowLikes(true)
    }, 1000)
  }

  const handleMouseLeave = () => {
    setShowLikes(false)
  }

  return (
    <article className='Post'>
      <div className='header-post'>
        <Text>{post.author.username}</Text>
        {post.author.id === logic.getUserId() && (
          <Button
            className='Button delete'
            title='Delete Post'
            onClick={() => handleDeletePost(post.id)}
          >
            x
          </Button>
        )}
      </div>
      <Heading level='2'>{post.title}</Heading>
      <Image src={post.image} />
      <Text>{post.description}</Text>
      <div className='button-container'>
        <time className='Time'>{formattedDate}</time>
      </div>

      <View direction='row'>
        <Button className='likes-Button' onClick={handleToggleLikePost}>
          {`${post.likes.includes(logic.getUserId()) ? '❤️' : '💔'} ${
            post.likes.length
          }`}
        </Button>
        <Button
          className={'likes-people'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {`${post.likes[0]} y ${post.likes.length - 1} personas más les gusta
            esto `}
        </Button>
      </View>

      {showLikes && (
        <LikeUsers>
          {
            <ul>
              {post.likes.map((like) => (
                <li key={like}>{like}</li>
              ))}
            </ul>
          }
        </LikeUsers>
      )}

      <hr className='custom-hr' />
    </article>
  )
}

export default Post
