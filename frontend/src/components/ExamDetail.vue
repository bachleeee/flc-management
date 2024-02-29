<template>
    <h5>Exercise {{ exerciseIndex }}: {{ exam.title }}</h5>
    <div v-for="(question, index) in exam.questions" :key="index">
        <div v-if="exam.type === 'multiple choice'">
            <strong>{{ index + 1 }}.{{ question.questionDetail }} </strong>
            <ul>
                <li v-for="(option, optionIndex) in question.options" :key="optionIndex">
                    <input type="radio" :value="optionIndex" v-model="selectedOptions[index]" :disabled="showingAnswers" />
                    <span :class="{
                        'correct': optionIndex == selectedOptions[index] && showingAnswers && selectedOptions[index] === question.correctOptionIndex,
                        'incorrect': optionIndex == selectedOptions[index] && showingAnswers && selectedOptions[index] !== question.correctOptionIndex
                    }">
                        {{ getAlphabetLetter(optionIndex) }}. {{ option }}
                    </span>
                </li>
            </ul>
            <div v-if="showingAnswers">
                <p>
                    Đáp án: {{ getAlphabetLetter(question.correctOptionIndex) }}
                </p>
            </div>
        </div>
        <div v-else-if="exam.type === 'fill in blank'">
    <div v-for="(questionDetail, questionDetailIndex) in question.questionDetail" :key="questionDetailIndex"
        class="question-detail-item">
        {{ questionDetail }}
        <span v-if="questionDetailIndex < question.questionDetail.length - 1" class="blank-index">
            {{ questionDetailIndex + 1 }}
        </span>
        <span v-if="questionDetailIndex < question.questionDetail.length - 1">
            ({{ question.hint[questionDetailIndex] }})
        </span>
        <input v-if="questionDetailIndex < question.questionDetail.length - 1" type="text"
            v-model="filledAnswers[questionDetailIndex]" :disabled="showingAnswers" :class="{
                'correct': showingAnswers && filledAnswers[questionDetailIndex] === question.correctAnswer[questionDetailIndex],
                'incorrect': showingAnswers && filledAnswers[questionDetailIndex] !== question.correctAnswer[questionDetailIndex]
            }" style="border: 1px solid #ccc; padding: 2px; width: 100px;" />
        <span v-if="showingAnswers" :class="{
            'fixed': showingAnswers && filledAnswers[questionDetailIndex] !== question.correctAnswer[questionDetailIndex],
            'hidden': showingAnswers && filledAnswers[questionDetailIndex] === question.correctAnswer[questionDetailIndex]
        }">
            {{ question.correctAnswer[questionDetailIndex]}}
        </span>
    </div>
</div>

    </div>
</template>
  
<script>
export default {
    data() {
        return {
            selectedOptions: [],
            filledAnswers: Array.from({ length: this.exam.questions.length }, () => ''),
        };
    },
    props: {
        exam: Object,
        exerciseIndex: Number,
        showingAnswers: Boolean,
    },
    methods: {
        getAlphabetLetter(index) {
            return String.fromCharCode(65 + index);
        },
    },
};
</script>
  
<style scoped>
li {
    list-style: none;
}

.correct,.fixed {
    color: green;
    font-weight: bold;
}

.hidden{
    visibility: hidden;
}
.incorrect {
    color: red;
    font-weight: bold;
}

.question-detail-item {
    display: inline-block;
    margin-right: 10px;
}

.blank-index {
    border: 1px solid #1479f4;
    border-radius: 50px;
    color: #1479f4;
    display: inline-block;
    font-weight: 700;
    height: 30px;
    padding-top: 3px;
    text-align: center;
    width: 30px;
}
</style>
  