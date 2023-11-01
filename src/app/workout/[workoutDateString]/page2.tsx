// 1. get the workout data
//		-> If empty, show controls for adding ExerciseSessions
//			-> If the user clicks "Add Exercise", open the exercise selection screen
//			-> After the user selects the exercise type, show the session Form AND create a local storage representation of it

//		-> If NOT EMPTY, show current ExerciseSessions
// 2. write the workout data to sessionStorage nad use THAT for all the purposes
// 3. when leaving the page, commit the sessionStorage state to the DB via server actions
