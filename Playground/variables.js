// var person = {
// 	name: 'BB',
// 	Age: 2
// };

// function updateAge(obj) {
// console.log('Step 1 ', obj);
// // obj = {
// // 	name: 'BB',
// // 	Age: 4
// // };
// obj.Age = 44;

// }

// updateAge(person);
// console.log('Step 2 ', person);
var grades = [20,40];

function updateGrades(gr) {
	console.log('Step 1 ', gr);
	gr.push(22,88);
	debugger;
}

 
updateGrades(grades);
console.log('Step 2 ', grades);