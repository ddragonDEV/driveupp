import _ from 'lodash';

const setItem = (keyName, data) => {
    let parsed = data;
    const isObject = _.isObject(data);
    const isArray = _.isArray(data);

    if (isObject || isArray) parsed = JSON.stringify(data);
    window.localStorage.setItem(keyName, parsed);
};

const getItem = (keyName) => {
    if (!keyName || _.isEmpty(keyName)) return null;
    let value = window.localStorage.getItem(keyName);

    if ((!_.isEmpty(value) && _.get(value, 0) === '[') || _.get(value, 0) === '{')
        value = JSON.parse(value);

    if (value === 'true') value = true;
    if (value === 'false') value = false;

    return value;
};

const removeItem = (keyName) => {
    window.localStorage.removeItem(keyName);
};

export { getItem, setItem, removeItem };
