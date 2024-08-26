import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const exercise = new Schema({
    activity: {
        type: ObjectId,
        required: true,
        ref: 'Activity'
    },
    index: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['completeSentence', 'orderSentence', 'vocabulary']
    }
}, { discriminatorKey: 'type' })

const Exercise = model('Exercise', exercise)

const completeSentenceSchema = new Schema({
    sentence: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const CompleteSentenceExercise = Exercise.discriminator('completeSentence', completeSentenceSchema);

const orderSentenceSchema = new Schema({
    sentence: {
        type: String,
        required: true
    },
    translate: {
        type: String,
        required: true
    },
});

const OrderSentenceExercise = Exercise.discriminator('orderSentence', orderSentenceSchema);

const vocabularyExerciseSchema = new Schema({
    word: {
        type: String,
        required: true
    },
    answer: {
        type: [String],
        required: true
    }
});

const VocabularyExercise = Exercise.discriminator('vocabulary', vocabularyExerciseSchema);

export {
    Exercise,
    CompleteSentenceExercise,
    OrderSentenceExercise,
    VocabularyExercise
}

export default Exercise