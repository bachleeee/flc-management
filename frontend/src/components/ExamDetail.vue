<template>
    <div v-if="exam.type === 'multiple_choice'">
        <div>Exercise {{ exerciseIndex }}: {{ exam.question }}</div>
        <ul>
            <li :class="{
        'correct': showingAnswers && selectedOption === 'A' && selectedOption === exam.correctOption,
        'incorrect': showingAnswers && selectedOption === 'A' && selectedOption !== exam.correctOption
    }">
                <input type="radio" value="A" v-model="selectedOption" :disabled="showingAnswers" />
                A. {{ exam.optionA }}
            </li>
            <li :class="{
        'correct': showingAnswers && selectedOption === 'B' && selectedOption === exam.correctOption,
        'incorrect': showingAnswers && selectedOption === 'B' && selectedOption !== exam.correctOption
    }">
                <input type="radio" value="B" v-model="selectedOption" :disabled="showingAnswers" />
                B. {{ exam.optionB }}
            </li>
            <li :class="{
        'correct': showingAnswers && selectedOption === 'C' && selectedOption === exam.correctOption,
        'incorrect': showingAnswers && selectedOption === 'C' && selectedOption !== exam.correctOption
    }">
                <input type="radio" value="C" v-model="selectedOption" :disabled="showingAnswers" />
                C. {{ exam.optionC }}
            </li>
            <li :class="{
        'correct': showingAnswers && selectedOption === 'D' && selectedOption === exam.correctOption,
        'incorrect': showingAnswers && selectedOption === 'D' && selectedOption !== exam.correctOption
    }">
                <input type="radio" value="D" v-model="selectedOption" :disabled="showingAnswers" />
                D. {{ exam.optionD }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedOption: null,
        };
    },
    props: {
        exam: Object,
        exerciseIndex: Number,
        showingAnswers: Boolean,
    },
};
</script>


<style scoped>
li {
    list-style: none;
}

.correct,
.fixed {
    color: green;
    font-weight: bold;
}

.hidden {
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