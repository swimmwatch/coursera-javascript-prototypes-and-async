'use strict';

(function () {
    function validateNumber(value, min, max) {
        value = parseInt(value);

        if (isNaN(value)) {
            return false;
        }

        if (min && parseInt(min) > value) {
            return false;
        }

        if (max && parseInt(max) < value) {
            return false;
        }

        return true;
    }

    function validateRegexp(value, pattern, flags) {
        const re = new RegExp(pattern, flags);

        return re.test(value);
    }

    function validateValue(value, dataset) {
        switch (dataset.validator) {
            case 'number':
                return validateNumber(value, dataset.validatorMin, dataset.validatorMax);
            case 'letters':
                return validateRegexp(value, '^[a-zа-яё]+$', 'i');
            case 'regexp':
                return validateRegexp(value, dataset.validatorPattern);
            default:
                return true;
        }
    }

    function checkInput(input) {
        const value = input.value;

        if (input.dataset.hasOwnProperty('required') && !value) {
            return false;
        }

        const validator = input.dataset.validator;

        return (validator && value)
            ? validateValue(value, input.dataset)
            : true;
    }

    window.validateForm = (options) => {
        const form = document.getElementById(options.formId);
        const inputs = Array.from(
            document.querySelectorAll('#' + options.formId + ' input')
        );

        form.addEventListener('focus', (event) => {
            const target = event.target;

            if (target.tagName === 'INPUT') {
                target.classList.remove(options.inputErrorClass);
            }
        }, true);

        form.addEventListener('blur', (event) => {
            const target = event.target;

            if (target.tagName === 'INPUT') {
                if (!checkInput(target)) {
                    target.classList.add(options.inputErrorClass);
                }
            }
        }, true);

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            form.classList.remove(options.formValidClass);
            form.classList.remove(options.formInvalidClass);

            let hasError = false;
            for (let i = 0; i < inputs.length; i++) {
                const input = inputs[i];

                if (!checkInput(input)) {
                    input.classList.add(options.inputErrorClass);
                    hasError = true;
                }
            }

            form.classList.add(hasError ? options.formInvalidClass : options.formValidClass);
        });
    };
}());
