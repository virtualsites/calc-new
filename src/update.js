moneySlider.addEventListener('input', _.debounce(update))
timeSlider.addEventListener('input', _.debounce(update))
insurance = false

$('#custom-html-value > label').click(() => {
    if (document.querySelector('#custom-html-value > label > input').checked == false) {
        mbankMath.isInsurance = false
        insurance = false
        $('.insuranceText, .monthlyInsurance').hide()
        //$('.monthlyInsurance').hide()
    } else {
        mbankMath.isInsurance = true
        insurance = true
        $('.insuranceText, .monthlyInsurance').show()
        //$('.monthlyInsurance').show()
    }
    update()
})

function update() {
    let mbank = new MBannk(
        new Commision(
            new NetValue(moneySlider.value)
        ),
        new NetValue(moneySlider.value),
        new Percent(
            new NetValue(
                moneySlider.value, insurance
            )
        ),
        timeSlider.value,
        insurance
    )
    // document.querySelector('.commissionValue > p').innerHTML = mbank.displayCommision()
    // document.querySelector('.interestValue > p').innerHTML = mbank.displayPercent()

    mbankMath.netValue = Math.round(moneySlider.value / 100) * 100
    mbankMath.period = timeSlider.value
    console.log((mbankMath.getCommission() * 100).toFixed(2) + '%');
    console.log();
    console.log(mbank.displayCommision());
    document.querySelector('.commissionValue > p').innerHTML = (mbankMath.getCommission() * 100).toFixed(2) + '%'
    document.querySelector('.interestValue > p').innerHTML = (mbankMath.getPercent() * 100).toFixed(2) + '%'
    document.querySelector('.monthlyInsurance > p').innerHTML = mbankMath.getInsurance().toFixed(2) + ' zł'
    mbankMath.getTotalInsurance()
    document.querySelector('.monthlyValue > p').innerHTML = Math.round(mbankMath.getMonthlyRate()) + ' zł'
    document.querySelector('.totalCost > p').innerHTML = ((mbankMath.getMonthlyRate() * mbankMath.period) - mbankMath.netValue).toFixed(2) + ' zł'
    document.querySelector('.rrso > p').innerHTML = mbankMath.getRRSO().toFixed(2) + '%'
}

update()