import React, { useState } from 'react'
import { useMutation } from 'urql'

const addCommentMutation = `
mutation AddComment($content: String!, $id: Int!) {
  insert_comments(objects: { content: $content, pokemon_id: $id }) {
    returning {
      id
      content
    }
  }
}
`

const AddCommentForm = ({ id }) => {
  const initialCommentState = { content: '' }
  const [commentInput, setCommentInput] = useState(initialCommentState)
  const [, addComment] = useMutation(addCommentMutation)

  const handleChange = e => {
    setCommentInput({...commentInput, [e.target.name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    addComment({ ...commentInput, id }).then(console.log)
    setCommentInput(initialCommentState)
  }

  return <form onSubmit={handleSubmit}>
    <input value={commentInput.content} onChange={handleChange} name='content' placeholder='comment' />
    <button>ADD COMMENT</button>
  </form>
}

export default AddCommentForm
