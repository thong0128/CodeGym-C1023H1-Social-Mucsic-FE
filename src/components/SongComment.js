import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CommentSection } from 'react-comments-section';
import 'react-comments-section/dist/index.css';

const SongComments = () => {
    const [comments, setComments] = useState([]);
    const [commentValue, setCommentValue] = useState('');

    useEffect(() => {
        // Simulate fetching comments from an API (replace with your actual API endpoint)
        axios.get('https://api.example.com/comments')
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });
    }, []);

    const formik = useFormik({
        initialValues: {
            comment: '',
        },
        validationSchema: Yup.object({
            comment: Yup.string().required('Comment is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                // Simulate posting the comment (replace with actual API request)
                await axios.post('https://api.example.com/comments', {
                    text: values.comment,
                });

                // Update comments state with the newly posted comment
                setComments([...comments, { text: values.comment }]);

                // Clear the form after successful submission
                resetForm();
            } catch (error) {
                console.error('Error posting comment:', error);
            }
        },
    });

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            {/* Display existing comments */}
            {comments.map((comment, index) => (
                <div key={index} className="mb-4">
                    {comment.text}
                </div>
            ))}

            {/* Comment input box */}
            <form onSubmit={formik.handleSubmit}>
        <textarea
            id="comment"
            name="comment"
            placeholder="Add your comment..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.comment}
            className="w-full p-2 border rounded"
        />
                {formik.touched.comment && formik.errors.comment ? (
                    <div className="text-red-500">{formik.errors.comment}</div>
                ) : null}
                <button
                    type="submit"
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Post
                </button>
            </form>
        </div>
    );
};

export default SongComments;