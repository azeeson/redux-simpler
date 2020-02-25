import {asyncActionCreator, createTypes} from './index';

const a = asyncActionCreator('sdad', (sds) => {
    return fetch('', sds)
})

const ras = createTypes(['ABC', 'Sex', 'Mix', 'Gaga', 'Gaga'], 'test');
ras;