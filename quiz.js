//quiz javascript
/*
    IT 3203 Project Milestone 2
    This script handles the quiz logic for quiz.html.
    It includes:
    1. An answer key.
    2. An event listener for the form submission.
    3. A function to check answers and calculate the score.
    4. A function to display the results on the page.
    5. An event listener for the reset button.
*/

// Wait for the entire HTML document to be loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DEFINE CORE ELEMENTS AND ANSWER KEY ---

    // The correct answers for the quiz
    // This makes it easy to change answers later
    const correctAnswers = {
        q1: "Cascading Style Sheets",
        q2: "a", // <br>
        q3: "c", // src
        q4: "a", // <script src="...">
        q5: ["a", "b", "d"] // <article>, <section>, <header>
    };

    // Get the main elements from the page
    const quizForm = document.getElementById('quiz-form');
    const resultsContainer = document.getElementById('results-container');
    const resetButton = document.getElementById('reset-btn');

    // --- 2. SET UP EVENT LISTENER FOR SUBMISSION ---

    // Listen for the 'submit' event on the form
    quizForm.addEventListener('submit', (event) => {
        // IMPORTANT: Prevent the form from submitting in the traditional
        // way (which would reload the page).
        event.preventDefault();

        let score = 0;
        const totalQuestions = 5;
        let resultsHTML = '<h2>Your Results:</h2>';

        // --- 3. CHECK EACH QUESTION ---

        // Get the user's answers
        const userAnswers = {
            q1: quizForm.q1.value.trim(),
            q2: quizForm.q2.value,
            q3: quizForm.q3.value,
            q4: quizForm.q4.value,
            q5: [] // We'll fill this next
        };

        // Get all checked answers for Q5 (multi-select)
        const q5Checkboxes = quizForm.querySelectorAll('input[name="q5"]:checked');
        q5Checkboxes.forEach((checkbox) => {
            userAnswers.q5.push(checkbox.value);
        });

        // --- Question 1: Fill-in-the-Blank ---
        // We use .toLowerCase() for a case-insensitive match
        if (userAnswers.q1.toLowerCase() === correctAnswers.q1.toLowerCase()) {
            score++;
            resultsHTML += `<p><b>Question 1:</b> <span class="correct">Correct!</span></p>`;
        } else {
            resultsHTML += `<p><b>Question 1:</b> <span class="incorrect">Incorrect.</span> 
                            Your answer: "${userAnswers.q1}". 
                            Correct answer: "${correctAnswers.q1}"</p>`;
        }

        // --- Question 2: Multiple Choice (Radio) ---
        if (userAnswers.q2 === correctAnswers.q2) {
            score++;
            resultsHTML += `<p><b>Question 2:</b> <span class="correct">Correct!</span> (You chose &lt;br&gt;)</p>`;
        } else {
            resultsHTML += `<p><b>Question 2:</b> <span class="incorrect">Incorrect.</span> 
                            Correct answer: &lt;br&gt;</p>`;
        }

        // --- Question 3: Multiple Choice (Radio) ---
        if (userAnswers.q3 === correctAnswers.q3) {
            score++;
            resultsHTML += `<p><b>Question 3:</b> <span class="correct">Correct!</span> (You chose src)</p>`;
        } else {
            resultsHTML += `<p><b>Question 3:</b> <span class="incorrect">Incorrect.</span> 
                            Correct answer: src</p>`;
        }

        // --- Question 4: Multiple Choice (Radio) ---
        if (userAnswers.q4 === correctAnswers.q4) {
            score++;
            resultsHTML += `<p><b>Question 4:</b> <span class="correct">Correct!</span> (You chose &lt;script src="..."&gt;)</p>`;
        } else {
            resultsHTML += `<p><b>Question 4:</b> <span class="incorrect">Incorrect.</span> 
                            Correct answer: &lt;script src="..."&gt;</p>`;
        }

        // --- Question 5: Multi-Selection (Checkbox) ---
        // This check is more complex. We sort both arrays and compare them as strings.
        // This ensures ["a", "b", "d"] is the same as ["b", "a", "d"]
        const q5Correct = userAnswers.q5.length === correctAnswers.q5.length &&
                          userAnswers.q5.sort().every((value, index) => value === correctAnswers.q5.sort()[index]);

        if (q5Correct) {
            score++;
            resultsHTML += `<p><b>Question 5:</b> <span class="correct">Correct!</span></p>`;
        } else {
            resultsHTML += `<p><b>Question 5:</b> <span class="incorrect">Incorrect.</span> 
                            Correct answers: &lt;article&gt;, &lt;section&gt;, &lt;header&gt;</p>`;
        }

        // --- 4. DISPLAY FINAL SCORE AND RESULTS --- [cite: 15, 16, 17, 18, 19]

        // Calculate final percentage
        const finalScore = (score / totalQuestions) * 100;
        
        // Determine pass/fail status (e.g., 60% is passing)
        const passFailStatus = (finalScore >= 60) ? 
            '<span class="correct">Pass</span>' : 
            '<span class="incorrect">Fail</span>';

        // Create the summary HTML to add to the top of the results
        let summaryHTML = `
            <h3>Total Score: ${finalScore}% (${score} out of ${totalQuestions})</h3>
            <h3>Status: ${passFailStatus}</h3>
            <hr>
        `;

        // Add the summary to the results and display it
        resultsContainer.innerHTML = summaryHTML + resultsHTML;

        // Make the results visible and scroll to them
        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    });

    // --- 5. SET UP EVENT LISTENER FOR RESET BUTTON --- 

    // Listen for a 'click' on the reset button
    resetButton.addEventListener('click', () => {
        // The 'type="reset"' on the button already clears the form inputs.
        // We just need to clear our results display.
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';

        // Optional: Scroll back to the top of the quiz
        quizForm.scrollIntoView({ behavior: 'smooth' });
    });

});
