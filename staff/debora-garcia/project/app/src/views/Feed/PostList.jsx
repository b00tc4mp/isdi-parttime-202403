import { useEffect, useState } from "react"
import logic from "../../logic"
import Heading from "../../components/Heading"
import "./PostList.css"
export default function PostList() {
    console.log("PostList ->render")

    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log("PostList -> useEffect")

        loadPosts()
    }, [])

    const loadPosts = () => {
        try {
            logic.getPosts()
                .then((posts) => {
                    setPosts(posts)
                    console.log(posts)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }
    return <div className="PostList">
        <div className="PostList-container">
            {posts.map(post => <article key={post.id} >
                <div className="post-header">
                    <Heading level={6} className="Heading">{post.author.username}</Heading>
                    <time>{new Date(post.date).toLocaleDateString()}</time>
                </div>
                <div className="post-body">
                    <img src={post.image} alt={post.description} className="post-image" />
                    <p>{post.description}</p>
                    <br />

                    <h6>{post.workout.workoutType.toUpperCase()}</h6>
                    <h6>{post.workout.title}</h6>
                    <ul className="post-movements">
                        {post.workout.movements.map((movement, index) => (
                            <li key={index}>{movement.quantity} {movement.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="result-details">
                    <p>
                        {post.result.time && `Time:${post.result.time} `}
                        {post.result.repetitions && `${post.result.repetitions}reps `}
                        {post.result.weight && `${post.result.weight}kg`}
                    </p>
                </div>
            </article>)}
        </div>
    </div>

}