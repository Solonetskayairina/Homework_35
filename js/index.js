    const userData = {
        USD: 1000,
        EUR: 900,
        UAH: 15000,
        BIF: 20000,
        AOA: 100
    };

    const bankData = {
        USD: {
            max: 3000,
            min: 100,
            img: '💵'
        },
        EUR: {
            max: 1000,
            min: 50,
            img: '💶'
        },
        UAH: {
            max: 0,
            min: 0,
            img: '💴'
        },
        GBP: {
            max: 10000,
            min: 100,
            img: '💷'
        }
    }

    const getMoney = new Promise((resolve, reject) => {
            const question = confirm('Подивитися баланс на карті?');
            question ? resolve(userData) : reject(userData);
    })

    let questionCurrency;
    let questionWithdrawCurrency;
    let currencyData;
    let currencyWithdrawalAmount;

    getMoney
        .then(
            function (userData) {

                do{
                    questionCurrency = prompt("Введіть валюту (USD,EUR,UAH,BIF,AOA)");
                    questionCurrency = questionCurrency ? questionCurrency.toUpperCase() : null;
                } while ( !questionCurrency || !userData[questionCurrency] );

                return { currencies: questionCurrency, balance: userData[questionCurrency] }
            },
            function (userData) {

                do{
                    questionWithdrawCurrency = prompt("Введіть валюту, за якою буде знято кошти (USD,EUR,UAH,BIF,AOA)");
                    questionWithdrawCurrency = questionWithdrawCurrency ? questionWithdrawCurrency.toUpperCase() : null;
                } while ( !questionWithdrawCurrency || !userData[questionWithdrawCurrency] );

                currencyData = bankData[questionWithdrawCurrency];

                currencyWithdrawalAmount = +prompt("Введіть сумму зняття коштів");

                if( currencyWithdrawalAmount > currencyData.max || currencyWithdrawalAmount > userData[questionWithdrawCurrency] ) {
                    return Promise.reject(`Введена сума більша за доступну. Максимальна сума зняття: ${Math.min(currencyData.max, userData[questionWithdrawCurrency])}`)
                } else if( currencyWithdrawalAmount <= currencyData.min ) {
                    return Promise.reject(`Введена сума менша за доступну. Мінімальна сума зняття: ${currencyData.min}`)
                }
            }
        )
        .then(
            function (result) {
                if ( questionWithdrawCurrency && currencyWithdrawalAmount ) {
                    console.log(`От Ваші гроші ${currencyWithdrawalAmount} ${questionWithdrawCurrency} ${bankData[questionWithdrawCurrency].img}`);
                } else {
                    console.log(`Баланс становить: ${result.balance} ${result.currencies}`);
                }
            }
        )
        .catch(
            function (error) {
                console.log(error);
            }
        )
        .finally(
            function () {
                console.log('Дякую, гарного дня 😊')
            }
        )