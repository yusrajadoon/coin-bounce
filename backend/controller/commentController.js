const Joi = require('joi');
const Comment = require('../models/comment');
const CommentDTO = require('../dto/comment');

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const commentController = {
    async create(req, res, next) {
        const createCommentSchema = Joi.object({
            content: Joi.string().required(),
            author: Joi.string().regex(mongodbIdPattern).required(),
            blog: Joi.string().regex(mongodbIdPattern).required()
        });

        const { error } = createCommentSchema.validate(req.body);
        if (error) {
            console.error("Validation error:", error.details);
            return res.status(400).json({ error: error.details[0].message });
        }

        const { content, author, blog } = req.body;

        try {
            const newComment = new Comment({ content, author, blog });
            await newComment.save();
            return res.status(201).json({ message: 'Comment created', comment: newComment });
        } catch (err) {
            console.error("Error saving comment:", err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getById(req, res, next) {
        const getByIdSchema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required()
        });

        const { error } = getByIdSchema.validate(req.params);
        if (error) {
            console.error("Validation error:", error.details);
            return res.status(400).json({ error: error.details[0].message });
        }

        const { id } = req.params;

        try {
            const comments = await Comment.find({ blog: id }).populate('author');
            if (!comments.length) {
                return res.status(404).json({ message: 'No comments found for this blog' });
            }

            const commentsDto = comments.map(comment => new CommentDTO(comment));
            return res.status(200).json({ data: commentsDto });
        } catch (err) {
            console.error("Error fetching comments:", err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = commentController;