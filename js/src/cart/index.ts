import * as $ from 'jquery';
import { anyDriver as AnyDriver } from 'anydriver';
import { Arrays, Objects } from 'anydriver/src/dataTypes';

import  { Item } from "../index";


// Load cart form local storage
let prevData = localStorage.getItem('cart');
let storage: Objects = {};
try {
    storage = JSON.parse(prevData);
} catch (err) {
    console.log("Invalid data!");
}

let driver = new AnyDriver(storage);

listItem();

let cartBox = $('.cart-box');

function getIndex(event: JQuery.ClickEvent): number {
    let currentSelector = $(event.currentTarget);

    // Get item index
    return currentSelector
        .parents('tr')
        .data('index');
}

// Sub
cartBox.on('click', '.sub', (event) => {
    const index = getIndex(event);

    let list = <Arrays> driver.get('cart');

    if((<Item>list[index]).sum > 1) {

        (<Item>list[index]).sum -= 1;
    }

    driver.set('cart', list);
    listItem();
});

// Add
cartBox.on('click', '.add', (event) => {
    const index = getIndex(event);

    let list = <Arrays> driver.get('cart');
    (<Item>list[index]).sum += 1;

    driver.set('cart', list);
    listItem();
});

// Del
cartBox.on('click', '.del', (event) => {
    const index = getIndex(event);

    let list = <Arrays> driver.get('cart');
    list.splice(index, 1);

    driver.set('cart', list);
    listItem();
});


function listItem() {
    let htmlList =
        '<tr>' +
            '<th width="150px">菜图</th>' +
            '<th>菜名</th>' +
            '<th width="100px">单价</th>' +
            '<th width="100px">数量</th>' +
            '<th width="100px">金额</th>' +
            '<th width="100px">操作</th>' +
        '</tr>';

    let list = <Arrays> driver.get('cart');
    let price:number = 0;

    for(let i = 0; i < list.length; i++) {
        let tmpItem = <Item> list[i];

        htmlList +=
            '<tr data-index="' + i + '">' +
                '<td width="60px"><img src="' + tmpItem.img + '" alt="" width="100px;" style="border-radius: 5px;"></td>' +
                '<td>' + tmpItem.name + '</td>' +
                '<td>￥' + tmpItem.price + '</td>' +
                '<td style="display: flex; justify-content: space-between; align-items: center;">' +
                    '<button class="sub">-</button><span>' + tmpItem.sum + '</span>' +
                    '<button class="add">+</button>' +
                '</td>' +
                '<td class="price">￥'+ (tmpItem.sum * tmpItem.price).toFixed(2) + '</td>' +
                '<td><input type="button" value="删除" class="del">' +
                '</td>' +
            '</tr>';

        price += tmpItem.sum * tmpItem.price
    }


    $('.cart-box table').html(htmlList);
    $('.total-price span').text(price.toFixed(2));
}

// Submit
$('.total-price button').on('click', () => {
    // Store
    localStorage.setItem('cart', JSON.stringify(driver.data));

    // Redirect
    $(location).attr('href', 'index.html');
});
