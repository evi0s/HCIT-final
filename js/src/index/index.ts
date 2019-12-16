import * as $ from 'jquery';
import { anyDriver as AnyDriver } from 'anyDriver';
import { Arrays, Objects } from 'anyDriver/src/dataTypes';


// Try to load from local storage
let prevData = localStorage.getItem('cart');
let storage: Objects = {};
try {
    storage = JSON.parse(prevData);
} catch (err) {
    console.log('Invalid data!');
}

let driver = new AnyDriver(storage);

// Set a cart
let cart: Arrays = [];
driver.set('cart', cart);

// Clear cart
listItem();

// Item interface
interface Item extends Objects {
    img: string,
    name: string,
    price: number,
    sum: number
}

// Register click event
$('.item button').on('click', (event) => {
    let currentSelector = $(event.currentTarget);

    // Get dish image
    const img = currentSelector
        .parents('.item')
        .find('img')
        .attr('src');

    // Get dish name
    const name = currentSelector
        .parents('.item')
        .find('.name').text();

    // Get dish price
    const price: number =
        parseFloat(currentSelector
            .parents('.item')
            .find('.price').text());

    let item: Item = {
        img: img,
        name: name,
        price: price,
        sum: 1
    };

    let cart = <Arrays> driver.get('cart');

    for(let i = 0; i < cart.length; i++) {
        let tmpItem = <Item> cart[i];

        if(tmpItem.name === name) {
            tmpItem.sum += 1;

            driver.set('cart', cart);
            listItem();
            return;
        }
    }

    cart.push(item);
    driver.set('cart', cart);
    listItem();
});

// Get cart element
let dishBox = $('.dish-box');

function getIndex(event: JQuery.ClickEvent): number {
    let currentSelector = $(event.currentTarget);

    // Get item index
    return currentSelector
        .parents('.item-dish')
        .data('index');
}

// Sub
dishBox.on('click', '.item-dish .sub', (event) => {
    const index = getIndex(event);

    let list = <Arrays> driver.get('cart');

    if((<Item>list[index]).sum > 1) {
        (<Item>list[index]).sum -= 1;
    }

    driver.set('cart', list);
    listItem();
});

// Add
dishBox.on('click', '.item-dish .add', (event) => {
    const index = getIndex(event);

    let list = <Arrays> driver.get('cart');
    (<Item>list[index]).sum += 1;

    driver.set('cart', list);
    listItem();
});

// Del
dishBox.on('click', '.item-dish .del', (event) => {
    const index = getIndex(event);

    let list = <Arrays> driver.get('cart');
    list.splice(index, 1);

    driver.set('cart', list);
    listItem();
});

// Redirect
$('.order a button').on('click', () => {
    // Store
    localStorage.setItem('cart', JSON.stringify(driver.data));

    // Redirect
    $(location).attr('href', 'cart.html');
});


function listItem() {
    let htmlList: string = "";
    let cart = <Arrays> driver.get('cart');
    let sumPrice = 0;

    for(let i = 0; i < cart.length; i++) {
        let tmpItem = <Item> cart[i];
        htmlList += '<div class="item-dish" data-index="' + i + '">' +
            '<div class="name">' + tmpItem.name + '</div>' +
            '<img src="' + tmpItem.img + '" alt="">' +
                '<div class="flex-sb">' +
                    '<div class="flex-sb" style="width: 90px;">' +
                    '<button class="sub">-</button><span>' + tmpItem.sum + '</span>' +
                    '<button class="add">+</button>' +
                '</div>' +
                '<button class="del">删除</button>' +
                '</div>' +
            '</div>';
        sumPrice += tmpItem.sum * tmpItem.price;
    }

    $('.dish-box').html(htmlList);
    $('.order span').text(sumPrice.toFixed(2));
}

export { Item }
