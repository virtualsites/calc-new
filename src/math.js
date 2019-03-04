< script src = "./index_files/moment.min.js.download" > < /script>

mbankApp.update(period, netValue, commission, percent, insurance, insuranceMultiplier)
let rrso = mbankApp.getRRSO()
let total = mbankApp.getTotal()
let monthlyRate = mbankApp.getMonthlyRate()

const mbankApp = {
    period: 100,
    netValue: 100000,
    commission: 0.0799,
    percent: 0.0399,
    insurance: false,
    insuranceMultiplier: 0.00218,

    update: function(period, netValue, commission, percent, insurance, insuranceMultiplier) {
        this.period = period,
            this.netValue = netValue,
            this.commission = commission,
            this.percent = percent,
            this.insurance = insurance,
            this.insuranceMultiplier = insuranceMultiplier
    },

    getRRSO: function() {
        function getDaysInCurrentYear(year) {
            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                return 366
            } else return 365
        }

        function tki(i) {
            let start = moment()
            start.add(i, 'M')
            let currentYear = start.format('YYYY')
            return ((i * 30.41666) / getDaysInCurrentYear(currentYear))
        }

        function aki(i) {
            if (i === 0) {
                return netValue
            } else if (i - 1 <= period) {
                return monthlyRate * -1
            } else {
                return 0
            }
        }


        function fun(i, percent, aki, tki) {
            if (i === 0) {
                return netValue
            } else if (aki / Math.pow(1 + percent, tki) === 0) {
                return null
            } else {
                return (aki / Math.pow(1 + percent, tki))
            }
        }

        function deriv(i, percent, aki, tki) {
            if (i === 0) {
                return null
            } else if ((aki * tki) / Math.pow(1 + percent, tki + 1) === 0) {
                return 0
            } else {
                return (-(aki * tki) / Math.pow(1 + percent, tki + 1))
            }
        }

        function resultantRate1() {
            return percent - sum1.fun / sum1.deriv
        }

        function resultantRate2() {
            return resultantRate1() - fun2Sum / deriv2Sum
        }

        function resultantRate3() {
            return resultantRate2() - fun3Sum / deriv3Sum
        }

        function resultantRate4() {
            return resultantRate3() - fun4Sum / deriv4Sum
        }

        function resultantRate5() {
            return resultantRate4() - fun5Sum / deriv5Sum
        }

        function myRRSO() {
            return (resultantRate5() * 100).toFixed(2) + '%'
        }

        const tabela = []

        for (var i = 0; i <= period; i++) {
            tabela[i] = {
                tki: tki(i),
                aki: aki(i),
            }
        }

        tabela.forEach((row, i) => {
            row.fun1 = fun(i, percent, row.aki, row.tki)
            row.deriv1 = deriv(i, percent, row.aki, row.tki)
        })

        const sum1 = tabela.reduce(function(total, row) {
            total.fun += row.fun1
            total.deriv += row.deriv1
            return total
        }, {
            fun: 0,
            deriv: 0
        })

        const oprocentowanie2 = percent - (sum1.fun / sum1.deriv)

        tabela.forEach((row, i) => {
            row.fun2 = fun(i, oprocentowanie2, row.aki, row.tki)
            row.deriv2 = deriv(i, oprocentowanie2, row.aki, row.tki)
        })

        const fun2Sum = tabela.reduce(function(total, row) {
            return total + row.fun2
        }, 0)

        const deriv2Sum = tabela.reduce(function(total, row) {
            return total + row.deriv2
        }, 0)

        const oprocentowanie3 = oprocentowanie2 - (fun2Sum / deriv2Sum)

        tabela.forEach((row, i) => {
            row.fun3 = fun(i, oprocentowanie3, row.aki, row.tki)
            row.deriv3 = deriv(i, oprocentowanie3, row.aki, row.tki)
        })

        const fun3Sum = tabela.reduce(function(total, row) {
            return total + row.fun3
        }, 0)

        const deriv3Sum = tabela.reduce(function(total, row) {
            return total + row.deriv3
        }, 0)

        const oprocentowanie4 = oprocentowanie3 - (fun3Sum / deriv3Sum)

        tabela.forEach((row, i) => {
            row.fun4 = fun(i, oprocentowanie4, row.aki, row.tki)
            row.deriv4 = deriv(i, oprocentowanie4, row.aki, row.tki)
        })

        const fun4Sum = tabela.reduce(function(total, row) {
            return total + row.fun4
        }, 0)

        const deriv4Sum = tabela.reduce(function(total, row) {
            return total + row.deriv4
        }, 0)

        const oprocentowanie5 = oprocentowanie4 - (fun4Sum / deriv4Sum)

        tabela.forEach((row, i) => {
            row.fun5 = fun(i, oprocentowanie5, row.aki, row.tki)
            row.deriv5 = deriv(i, oprocentowanie5, row.aki, row.tki)
        })

        const fun5Sum = tabela.reduce(function(total, row) {
            return total + row.fun5
        }, 0)

        const deriv5Sum = tabela.reduce(function(total, row) {
            return total + row.deriv5
        }, 0)
    },

    getMonthlyRate: function() {
        if (document.querySelector('#custom-html-value > label > input').checked == false) {
            let monthlyRate = (((netValue * 1) + netValue * commission) * percent / 12 / (1 - Math.pow((1 + percent / 12), (-period))))
        } else {
            let monthlyRate = (((netValue * 1) + (netValue * commission) + (totalInsurance * 1)) * percent / 12 / (1 - Math.pow((1 + percent / 12), (-period))))
        }
    },

    getTotal: function() {
        ((monthlyRate * period) - netValue).toFixed(2)
    },
}