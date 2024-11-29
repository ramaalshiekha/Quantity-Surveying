document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var length = parseFloat(document.getElementById('length').value);
    var width = parseFloat(document.getElementById('width').value);
    var depth = parseFloat(document.getElementById('depth').value);

    if (isNaN(length) ||isNaN(width)|| isNaN(depth)) {
        alert("الرجاء إدخال قيم صحيحة!");
        return;
    }

    var volume = length * width * depth;
    var cement = volume * 0.15;
    var sand = volume * 0.30;
    var gravel = volume * 0.55;

    var results = `
        <h2>النتائج</h2>
        <p>حجم الخرسانة المطلوب: ${volume.toFixed(2)} متر مكعب</p>
        <p>كمية الاسمنت: ${cement.toFixed(2)} متر مكعب</p>
        <p>كمية الرمل: ${sand.toFixed(2)} متر مكعب</p>
        <p>كمية الحصى: ${gravel.toFixed(2)} متر مكعب</p>`
    ;

    document.getElementById('results').innerHTML = results;

    var ctx = document.getElementById('materialChart').getContext('2d');
    var materialChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['الاسمنت', 'الرمل', 'الحصى'],
            datasets: [{
                label: 'كميات المواد',
                data: [cement, sand, gravel],
                backgroundColor: [
                    '#007bff',
                    '#ffc107',
                    '#28a745'
                ],
                borderColor: '#fff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + ' متر مكعب';
                        }
                    }
                }
            }
        }
    });
});