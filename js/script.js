document.addEventListener('DOMContentLoaded', function() {
    // Simple Calendar
    function renderCalendar() {
        const calendar = document.getElementById('calendar');
        if (!calendar) return;
        const today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();

        function drawCalendar(month, year) {
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            let firstDay = new Date(year, month, 1).getDay();
            let daysInMonth = 32 - new Date(year, month, 32).getDate();
            let html = `<div class='d-flex justify-content-between align-items-center mb-2'>
                <button class='btn btn-sm btn-light' id='prevMonth'>&lt;</button>
                <span class='fw-bold text-primary'>${monthNames[month]} ${year}</span>
                <button class='btn btn-sm btn-light' id='nextMonth'>&gt;</button>
            </div>`;
            html += `<table class='table table-bordered calendar-table mb-0'><thead><tr>`;
            ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach(d => html += `<th class='small'>${d}</th>`);
            html += `</tr></thead><tbody><tr>`;
            let day = 1;
            let startDay = (firstDay === 0) ? 6 : firstDay - 1;
            for (let i = 0; i < startDay; i++) html += '<td></td>';
            for (let i = startDay; i < 7; i++) {
                html += `<td class='calendar-day' data-day='${day}'>${day}</td>`;
                day++;
            }
            html += '</tr>';
            while (day <= daysInMonth) {
                html += '<tr>';
                for (let i = 0; i < 7; i++) {
                    if (day > daysInMonth) {
                        html += '<td></td>';
                    } else {
                        html += `<td class='calendar-day' data-day='${day}'>${day}</td>`;
                        day++;
                    }
                }
                html += '</tr>';
            }
            html += '</tbody></table>';
            calendar.innerHTML = html;
            document.getElementById('prevMonth').onclick = () => {
                month--;
                if (month < 0) { month = 11; year--; }
                drawCalendar(month, year);
            };
            document.getElementById('nextMonth').onclick = () => {
                month++;
                if (month > 11) { month = 0; year++; }
                drawCalendar(month, year);
            };
            calendar.querySelectorAll('.calendar-day').forEach(td => {
                td.onclick = function() {
                    calendar.querySelectorAll('.calendar-day').forEach(cell => cell.classList.remove('bg-primary', 'text-white'));
                    this.classList.add('bg-primary', 'text-white');
                };
            });
        }
        drawCalendar(month, year);
    }
    renderCalendar();

    // Demo Form Submission
    const demoForm = document.getElementById('demoForm');
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! We will contact you soon to schedule your demo.');
            demoForm.reset();
        });
    }
    // Callback Form Submission if needed
    const callbackForm = document.getElementById('callbackForm');
    if (callbackForm) {
        callbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! We will call you back soon.');
            callbackForm.reset();
        });
    }

    // Read More functionality in Why Choose Us
    const readMoreLink = document.getElementById('readMoreLink');
    const readMoreText = document.getElementById('readMoreText');
    if (readMoreLink && readMoreText) {
        readMoreLink.addEventListener('click', function(e) {
            e.preventDefault();
            readMoreText.style.display = 'block';
            readMoreLink.style.display = 'none';
        });
    }
}); 