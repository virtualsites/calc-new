class MBannk
{
    constructor(commision, netValue, percent, period = 100, insurance = false)
    {
        this.period = $('.loader')
        this._progressMessage = $('.loader-progress-message')
        this._progressBar = $('.loader-progress-bar')

        this.period = period
        this.netValue = netValue
        this.commission = commision
        this.percent = percent
        this.insuranceMultiplier = 0.00218
        this.isInsurance = insurance

        this.insurance = 0
        this.totalInsurance = 0
        this.monthlyRate = 0
        this.rrso = 0
    }

    displayCommision()
    {
        return (this.getCommision() * 100).toFixed(2) + '%'
    }

    displayPercent()
    {
        return (this.percent.toFloat() * 100).toFixed(2) + '%'
    }

    getCommision()
    {
        return this.commission.toFloat()
    }

    countPercent()
    {
        if (this.netValue <= 5000) {
            return this.percent = 0.0999
        } else if (this.netValue > 5000 && this.netValue <= 15000) {
            return this.percent = 0.0949
        } else if (this.netValue > 15000 && this.netValue <= 50000) {
            return this.percent = 0.0899
        } else if (this.netValue > 50000) {
            return this.percent = 0.0799
        }
    }

    getPercentDependOnInsurance()
    {
        if (this.isInsurance == false) {
            return this.percent = this.countPercent()
        } else if (this.isInsurance == true) {
            return this.percent = this.countPercent() - 0.005
        }
    }

    countInsurance()
    {
        this.insurance = (this.netValue * 1 + (this.netValue * this.commission)) * this.insuranceMultiplier
    }

    getTotalInsurance()
    {
        return this.totalInsurance = this.countInsurance() * this.period
    }

    getMonthlyRate()
    {
        if (this.isInsurance == false) {
            return this.monthlyRate = ((this.netValue + this.netValue * this.commission) * this.percent / 12 / (1 - Math.pow((1 + this.percent / 12), (-this.period))))
        } else if (this.isInsurance == true) {
            return this.monthlyRate = ((this.netValue + this.netValue * this.commission + this.totalInsurance) * this.percent / 12 / (1 - Math.pow((1 + this.percent / 12), (-this.period))))
        }
    }
}

class NetValue
{
    constructor(value = 109900)
    {
        this.value = value
    }

    count()
    {
        return Math.round(this.value / 100) * 100
    }
}

class Commision
{
    constructor(netValue)
    {
        this.commission = 0.0399
        this.netValue = netValue
    }

    toFloat()
    {
        let net = this.netValue.count()

        if (net >= 500 && net <= 5000) {
            this.commission = 0.0699
        } else if (net > 5000 && net <= 15000) {
            this.commission = 0.0649
        } else if (net > 15000 && net <= 30000) {
            this.commission = 0.0549
        } else if (net > 30000 && net <= 50000) {
            this.commission = 0.0499
        } else if (net > 50000 && net <= 100000) {
            this.commission = 0.0449
        } else if (net > 100000) {
            this.commission = 0.0399
        }

        return this.commission;
    }
}

class Percent
{
    constructor(netValue, insurance = false)
    {
        this.percent = 0.0799
        this.netValue = netValue
        this.insurance = insurance
    }

    toFloat()
    {
        let net = this.netValue.count()

        if (net <= 5000) {
            this.percent = 0.0999
        } else if (net > 5000 && net <= 15000) {
            this.percent = 0.0949
        } else if (net > 15000 && net <= 50000) {
            this.percent = 0.0899
        } else if (net > 50000) {
            this.percent = 0.0799
        }

        if (this.insurance == false) {
            return this.percent
        }

        if (this.insurance == true) {
            return this.percent - 0.005
        }
    }
}

class Util
{
    getDaysInCurrentYear(year)
    {
        if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
        {
            return 366
        }

        return 365
    }
}

class Tki
{
    constructor(util, i)
    {
        this.util = util
        this.i = i
    }

    count()
    {
        let start = moment()
        start.add(i, 'M')
        let currentYear = start.format('YYYY')

        return ((i * 30.41666) / this.util.getDaysInCurrentYear(currentYear))
    }
}

class Aki
{
    constructor (mbank, i)
    {
        this.mbank = mbank;
        this.i = i
    }

    count()
    {
        if (this.i === 0) {
            return this.mbank.netValue
        } else if (this.i - 1 <= this.mbank.period) {
            return this.mbank.getMonthlyRate() * -1
        } else {
            return 0
        }
    }
}

class RRSO
{
    constructor(mbank, util)
    {
        this.mbank = mbank
        this.util = util
    }

    getPercent()
    {
        return this.mbank.percent.toFloat();
    }
}

main = function () {
    // rrso = new RRSO(
    //     new MBannk(),
    //     new Util()
    // );
    //
    // return rrso.getPercent();
    // mbank = new MBannk();
    // mbank.getCommision();
    // mbank.countPercent();
    // mbank.getPercentDependOnInsurance();
    // mbank.countInsurance();
    // mbank.countInsurance();
    //
    //
    //
    // return mbank.percent;
}

// console.log(main());

const mbankMath = {
    period: 100,
    netValue: 109900,
    commission: 0.0399,
    percent: 0.0799,
    insuranceMultiplier: 0.00218,
    isInsurance: false,

    insurance: 0,
    totalInsurance: 0,
    monthlyRate: 0,
    rrso: 0,

    getCommission: function() {
        if (this.netValue >= 500 && this.netValue <= 5000) {
            return this.commission = 0.0699
        } else if (this.netValue > 5000 && this.netValue <= 15000) {
            return this.commission = 0.0649
        } else if (this.netValue > 15000 && this.netValue <= 30000) {
            return this.commission = 0.0549
        } else if (this.netValue > 30000 && this.netValue <= 50000) {
            return this.commission = 0.0499
        } else if (this.netValue > 50000 && this.netValue <= 100000) {
            return this.commission = 0.0449
        } else if (this.netValue > 100000) {
            return this.commission = 0.0399
        }
    },

    myPercent: function() {
        if (this.netValue <= 5000) {
            return this.percent = 0.0999
        } else if (this.netValue > 5000 && this.netValue <= 15000) {
            return this.percent = 0.0949
        } else if (this.netValue > 15000 && this.netValue <= 50000) {
            return this.percent = 0.0899
        } else if (this.netValue > 50000) {
            return this.percent = 0.0799
        }
    },

    getPercent: function() {
        if (this.isInsurance == false) {
            return this.percent = this.myPercent()
        } else if (this.isInsurance == true) {
            return this.percent = this.myPercent() - 0.005
        }
    },

    getInsurance: function() {
        return this.insurance = (this.netValue * 1 + (this.netValue * this.commission)) * this.insuranceMultiplier
    },

    getTotalInsurance: function() {
        return this.totalInsurance = this.getInsurance() * this.period
    },

    getMonthlyRate: function() {
        if (this.isInsurance == false) {
            return this.monthlyRate = ((this.netValue + this.netValue * this.commission) * this.percent / 12 / (1 - Math.pow((1 + this.percent / 12), (-this.period))))
        } else if (this.isInsurance == true) {
            return this.monthlyRate = ((this.netValue + this.netValue * this.commission + this.totalInsurance) * this.percent / 12 / (1 - Math.pow((1 + this.percent / 12), (-this.period))))
        }
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
                return this.netValue
            } else if (i - 1 <= mbankMath.period) {
                return mbankMath.getMonthlyRate() * -1
            } else {
                return 0
            }
        }


        function fun(i, percent, aki, tki) {
            if (i === 0) {
                return mbankMath.netValue
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
            return mbankMath.percent - sum1.fun / sum1.deriv
        }

        function resultantRate2() {
            return resultantRate1() - sum2.fun / sum2.deriv
        }

        function resultantRate3() {
            return resultantRate2() - sum3.fun / sum3.deriv
        }

        function resultantRate4() {
            return resultantRate3() - sum4.fun / sum4.deriv
        }

        function resultantRate5() {
            return resultantRate4() - sum5.fun / sum5.deriv
        }

        function myRRSO() {
            return (resultantRate5() * 100).toFixed(2)
        }

        const tabela = []

        for (var i = 0; i <= mbankMath.period; i++) {
            tabela[i] = {
                tki: tki(i),
                aki: aki(i),
            }
        }

        tabela.forEach((row, i) => {
            row.fun1 = fun(i, mbankMath.getPercent(), row.aki, row.tki)
            row.deriv1 = deriv(i, mbankMath.getPercent(), row.aki, row.tki)
        })

        const sum1 = tabela.reduce(function(total, row) {
            total.fun += row.fun1
            total.deriv += row.deriv1
            return total
        }, {
            fun: 0,
            deriv: 0
        })

        const percent2 = mbankMath.getPercent() - (sum1.fun / sum1.deriv)

        tabela.forEach((row, i) => {
            row.fun2 = fun(i, percent2, row.aki, row.tki)
            row.deriv2 = deriv(i, percent2, row.aki, row.tki)
        })

        const sum2 = tabela.reduce(function(total, row) {
            total.fun += row.fun2
            total.deriv += row.deriv2
            return total
        }, {
            fun: 0,
            deriv: 0
        })

        const percent3 = percent2 - (sum2.fun / sum2.deriv)

        tabela.forEach((row, i) => {
            row.fun3 = fun(i, percent3, row.aki, row.tki)
            row.deriv3 = deriv(i, percent3, row.aki, row.tki)
        })

        const sum3 = tabela.reduce(function(total, row) {
            total.fun += row.fun3
            total.deriv += row.deriv3
            return total
        }, {
            fun: 0,
            deriv: 0
        })

        const percent4 = percent3 - (sum3.fun / sum3.deriv)

        tabela.forEach((row, i) => {
            row.fun4 = fun(i, percent4, row.aki, row.tki)
            row.deriv4 = deriv(i, percent4, row.aki, row.tki)
        })

        const sum4 = tabela.reduce(function(total, row) {
            total.fun += row.fun4
            total.deriv += row.deriv4
            return total
        }, {
            fun: 0,
            deriv: 0
        })

        const percent5 = percent4 - (sum4.fun / sum4.deriv)

        tabela.forEach((row, i) => {
            row.fun5 = fun(i, percent5, row.aki, row.tki)
            row.deriv5 = deriv(i, percent5, row.aki, row.tki)
        })


        const sum5 = tabela.reduce(function(total, row) {
            total.fun += row.fun5
            total.deriv += row.deriv5
            return total
        }, {
            fun: 0,
            deriv: 0
        })

        return this.rrso = myRRSO() * 1
    }
}