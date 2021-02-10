const axios = require('axios');
const { getColorFromURL } = require('color-thief-node');

const fs = require('fs').promises;

async function getData() {
    const { data } = await axios.get('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json');
    const init = async () => {
        let heroes = [];
        const hex = await asyncForEach(data, async (hero) => {
            const rgb = await getColorFromURL(hero.images.lg);
            heroes.push({
                ...hero,
                color: rgb
            })
        })
        await fs.writeFile('upd.json', JSON.stringify({ heroes }, null, 2));
    }
    init();
}

getData();

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}