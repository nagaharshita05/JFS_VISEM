document.addEventListener("DOMContentLoaded", function () {

    let subjects = document.querySelectorAll(".subject");
    let totalBox = document.getElementById("total");
    let resultBox = document.getElementById("result");
    let form = document.getElementById("regForm");

    // Auto-calculate total fee
    subjects.forEach(item => {
        item.addEventListener("change", () => {
            let total = 0;
            subjects.forEach(sub => {
                if (sub.checked) total += parseInt(sub.value);
            });
            totalBox.innerText = "₹" + total;
        });
    });

    // Handle form submission
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // stop page refresh

        let selectedSubjects = [];
        let totalFee = 0;
        let cnt = 0;

        subjects.forEach(sub => {
            if (sub.checked) {
                cnt++;
                let subjectName = sub.parentElement.innerText.trim();
                selectedSubjects.push(cnt + ". " + subjectName);
                totalFee += parseInt(sub.value);
            }
        });

        let studentName = document.getElementById("name").value;

        if (!studentName) {
            resultBox.style.display = "block";
            resultBox.innerHTML = "<p>Please enter student name.</p>";
            return;
        }

        if (selectedSubjects.length === 0) {
            resultBox.style.display = "block";
            resultBox.innerHTML = "<p>Please select at least one subject.</p>";
            return;
        }

        resultBox.style.display = "block";
        resultBox.innerHTML =
            "<h3>Registration Details</h3>" +
            "<p><b>Student Name:</b> " + studentName + "</p>" +
            "<p><b>Selected Subjects:</b><br>" + selectedSubjects.join("<br>") + "</p>" +
            "<p><b>Total Fee:</b> ₹" + totalFee + "</p>";
    });

});
