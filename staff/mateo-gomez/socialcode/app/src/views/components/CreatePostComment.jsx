import { useState } from "react";
import logic from "../../logic"

import Button from "../../components/core/Button";

function CreatePostComment({ postId, onCancelCreatedCommentClick, onCommentPostSubmitted }) {
    console.log("CreatePostComment --> render")

    const [message, setMessage] = useState("")

    const handleCancelCommentClick = () => onCancelCreatedCommentClick()

    const handleCreatePostComment = (event)
}