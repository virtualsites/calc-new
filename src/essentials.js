let interestValue = document.querySelector('.interestValue')
let commissionValue = document.querySelector('.commissionValue')
let moneySlider = document.querySelector('.moneySlider')
let timeSlider = document.querySelector('.timeSlider')
let moneyField = document.querySelector('.moneyValue')
let timeField = document.querySelector('.timeValue')

$('.insuranceText').hide()
$('.monthlyInsurance').hide()

moneySlider.value = Math.round(moneySlider.value / 100) * 100
moneyField.innerHTML = moneySlider.value
timeField.innerHTML = timeSlider.value

moneySlider.oninput = function() {
    moneyField.innerHTML = Math.round(this.value / 100) * 100
}


timeSlider.oninput = function() {
    timeField.innerHTML = this.value
}

timeSlider.addEventListener('input', _.debounce(forceMonth))
moneySlider.addEventListener('input', _.debounce(forceMonth))
timeSlider.addEventListener('input', _.debounce(showAlert))

function forceMonth() {
    if (timeSlider.value > 96 && moneySlider.value < 30000) {
        moneySlider.value = 30000
        moneyField.innerHTML = 30000
    }
}

function showAlert() {
    if (timeSlider.value > 96) {
        $('.timeAlert').show()
    } else {
        $('.timeAlert').hide()
    }
}

$('.timeInfo').hide()
$('.timeInfo').removeClass('timeInfo')
$('.timeAlert').hover(() => {
    $('#JGUFd6yEyV2UFIaMzLT6y7NALhsghcMk').toggleClass('timeInfo')
})