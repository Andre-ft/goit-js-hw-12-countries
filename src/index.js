import css from './styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from "lodash.debounce";
import makeListOfCountries from './templates/listOfCountries.hbs';
import makeSingleCountryTmp from './templates/singleCountry.hbs';
import { alert, error, success, Stack, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

defaultModules.set(PNotifyMobile, {});

const myStack = new Stack({
    push: 'top',
    dir1: 'up',
    maxStrategy: 'close',
})

// const { log } = console;

const refs = {
    outputField: document.querySelector('.output'),
    inputField: document.querySelector('.input-countries-name'),
}

refs.inputField.addEventListener('input', debounce(() => {
    refs.outputField.innerHTML = '';
    if (!refs.inputField.value) {
        alert(notificationOptions.text = 'Please input your query.')
        return;
    } 
    fetchCountries(refs.inputField.value).then(onHandleData);
}, 500)
);

const notificationOptions = {
    animateSpeed: 'fast',
    hide: false,
    delay: 1000,
    mouseReset: true,
    closerHover: false,
    remove: true,
    destroy: true,
    autoOpen: true,
    stack: myStack,
};

function onHandleData(data) {
    if (data.status === 404) {
        error(notificationOptions.text = 'No such contry. Please try again')
        return;
    }

    if (data.length > 10) {
        alert(notificationOptions.text = 'Too long list of contries. Please enter more specific query.')
        return;
    }

    if (data.length > 1 && data.length <= 10) {
        const list = {};
        list.arr = data;
        alert(notificationOptions.text = 'Input more letters to find single country.');
        refs.outputField.innerHTML = makeListOfCountries(list);
        return;
    }

    if (data.length === 1) {
        refs.outputField.innerHTML = makeSingleCountryTmp(data[0]);
        success(notificationOptions.text = 'Congratulations!')
    }
}
