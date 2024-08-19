document.addEventListener('DOMContentLoaded', function() {
    loadForm('length.html'); // Load the length form by default
});

function loadForm(file) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
            document.getElementById('form-container').innerHTML = html;
            document.querySelectorAll('.tab-button').forEach(button => {
                button.classList.remove('active');
            });
            document.querySelector(`[onclick="loadForm('${file}')"]`).classList.add('active');
            document.getElementById('result-container').style.display = 'none';
        });
}

function convert(event, type) {
    event.preventDefault();

    let value, fromUnit, toUnit, convertedValue;

    if (type === 'length') {
        value = parseFloat(document.getElementById('length-value').value);
        fromUnit = document.getElementById('length-from').value;
        toUnit = document.getElementById('length-to').value;
        convertedValue = convertLength(value, fromUnit, toUnit);
    } else if (type === 'weight') {
        value = parseFloat(document.getElementById('weight-value').value);
        fromUnit = document.getElementById('weight-from').value;
        toUnit = document.getElementById('weight-to').value;
        convertedValue = convertWeight(value, fromUnit, toUnit);
    } else if (type === 'temperature') {
        value = parseFloat(document.getElementById('temperature-value').value);
        fromUnit = document.getElementById('temperature-from').value;
        toUnit = document.getElementById('temperature-to').value;
        convertedValue = convertTemperature(value, fromUnit, toUnit);
    }

    document.getElementById('result-text').textContent = `Converted Value: ${convertedValue}`;
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
}

function convertLength(value, fromUnit, toUnit) {
    const lengthUnits = {
        'meters': 1,
        'kilometers': 0.001,
        'feet': 3.28084,
        'miles': 0.000621371
    };
    const valueInMeters = value / lengthUnits[fromUnit];
    return valueInMeters * lengthUnits[toUnit];
}

function convertWeight(value, fromUnit, toUnit) {
    const weightUnits = {
        'grams': 1,
        'kilograms': 0.001,
        'pounds': 0.00220462,
        'ounces': 0.035274
    };
    const valueInGrams = value / weightUnits[fromUnit];
    return valueInGrams * weightUnits[toUnit];
}

function convertTemperature(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;

    let celsiusValue;
    if (fromUnit === 'celsius') {
        celsiusValue = value;
    } else if (fromUnit === 'fahrenheit') {
        celsiusValue = (value - 32) * 5 / 9;
    } else if (fromUnit === 'kelvin') {
        celsiusValue = value - 273.15;
    }

    if (toUnit === 'celsius') return celsiusValue;
    if (toUnit === 'fahrenheit') return celsiusValue * 9 / 5 + 32;
    if (toUnit === 'kelvin') return celsiusValue + 273.15;
}

function reset() {
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('form-container').style.display = 'block';
}

