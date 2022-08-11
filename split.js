var st_scores = prompt("Введите оценки студентов")
console.log(st_scores)
var space = " "
var scores_students = st_scores.split(space);
console.log(scores_students)
let max_score = 0
let min_score = scores_students[0]
console.log(min_score)

for (score in scores_students) {
    console.log(scores_students[score]);
    scores_students[score] = Number(scores_students[score]);
    console.log(typeof(scores_students[score]));

        if (scores_students[score] > max_score) {
            max_score = scores_students[score]
        }
        if (scores_students[score] < min_score) {
            min_score = scores_students[score]
        }
    } 

console.log(max_score)
console.log(min_score)
// let result = total_height/total_students
alert("Высшая оценка среди студентов есть "  + max_score)
alert("Низшая оценка среди студентов есть " + min_score)