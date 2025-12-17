document.addEventListener("DOMContentLoaded", function () {

    const subjects = document.querySelectorAll(".subject");
    const totalBox = document.getElementById("total");
    const resultBox = document.getElementById("result");
    const submitBtn = document.getElementById("submitBtn");

    // Update total fee dynamically
    subjects.forEach(sub => {
        sub.addEventListener("change", function() {
            let total = 0;
            subjects.forEach(s => {
                if (s.checked) total += parseInt(s.value);
            });
            totalBox.innerText = "₹" + total;
        });
    });

    // Handle registration click
    submitBtn.addEventListener("click", function() {

        const studentName = document.getElementById("name").value.trim();
        if (!studentName) {
            resultBox.style.display = "block";
            resultBox.className = "error";
            resultBox.innerHTML = "<p>Please enter student name.</p>";
            return;
        }

        let selectedSubjects = [];
        let totalFee = 0;

        subjects.forEach((sub, idx) => {
            if (sub.checked) {
                selectedSubjects.push(`${idx + 1}. ${sub.parentElement.innerText.trim()}`);
                totalFee += parseInt(sub.value);
            }
        });

        if (selectedSubjects.length === 0) {
            resultBox.style.display = "block";
            resultBox.className = "error";
            resultBox.innerHTML = "<p>Please select at least one subject.</p>";
            return;
        }

        // Display result inside page (no popup)
        resultBox.style.display = "block";
        resultBox.className = "success";
        resultBox.innerHTML = `
            <h3>Registration Successful!</h3>
            <p><b>Student Name:</b> ${studentName}</p>
            <p><b>Selected Subjects:</b><br>${selectedSubjects.join("<br>")}</p>
            <p><b>Total Fee:</b> ₹${totalFee}</p>
        `;

        // Reset form
        document.getElementById("name").value = "";
        subjects.forEach(s => s.checked = false);
        totalBox.innerText = "₹0";
    });

});
