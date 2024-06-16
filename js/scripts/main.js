import { StorageManager } from '../classes/StorageManager.js';
import { DynamicDrawer } from '../classes/DynamicDrawer.js';
let storageManager = new StorageManager();
let buttons;
let main;
let container;
let dd = new DynamicDrawer();

document.addEventListener('DOMContentLoaded', ()=>
{
    main = document.getElementsByTagName('main')[0];    
    BrowserAdapt();
    buttons = 
    {
        btn1: document.getElementById('btn1'),
        btn2: document.getElementById('btn2'),
        btn3: document.getElementById('btn3'),
        flip1: document.getElementById('flip1'),
        flip2: document.getElementById('flip2'),
    };

    Init();
    buttons['btn1'].click();
});

function BrowserAdapt()
{
    let userAgent = navigator.userAgent;
    let head = document.getElementsByTagName('head')[0];
    let css = dd.CreateLink('stylesheet', null);
    head.appendChild(css);
    if(userAgent.indexOf("Firefox") !== -1)
    {
        css.href = './css/flip_ff.css';
    }
    else
    {
        css.href = './css/flip_nf.css';
    }
}

function Init()
{
    container = document.getElementById('portfolio');
    buttons['btn1'].addEventListener('click', ()=>
    {
        SwitchButton('btn1');
        ShowHTML();    
        storageManager.WriteSS('lastPage', 'btn1');                
        container.classList.add('red');
        container.classList.remove('yellow', 'blue');
    });

    buttons['btn2'].addEventListener('click', ()=>
    {
        SwitchButton('btn2');
        ShowPHP();
        storageManager.WriteSS('lastPage', 'btn2');        
        container.classList.add('yellow');
        container.classList.remove('red', 'blue');
    });

    buttons['btn3'].addEventListener('click', ()=>
    {
        SwitchButton('btn3');
        ShowOtherStuff();
        storageManager.WriteSS('lastPage', 'btn3');        
        container.classList.add('blue');
        container.classList.remove('red', 'yellow');
    });

    buttons['flip1'].addEventListener('click', ()=>
    {
        main.style.transform = 'rotateY(180deg)';        
    });

    buttons['flip2'].addEventListener('click', ()=>
    {
        main.style.transform = 'rotateY(0deg)';        
    });
}

function SwitchButton(selected)
{
    for(let key in buttons)
    {
        if(key != selected)
        {
            buttons[key].classList.remove('nav-active-btn');
        }
        else
        {
            buttons[key].classList.add('nav-active-btn');
        }
    }    
}

async function ReadJSON(name)
{
    let response = await fetch(`./resources/${name}.json`);
    let data = await response.json();
    return data;
}

async function ShowHTML()
{
    container.innerHTML = '';
    let links = await ReadJSON('html');
    let ul = document.createElement('ul');
    container.appendChild(ul);
    let data = links[0];
    for(let key in data)
    {
        let li = document.createElement('li');
        ul.appendChild(li);
        ul.classList.add('fade-in');
        let p = document.createElement('p');
        p.textContent = key + ": ";
        p.classList.add('link-title');
        let a = dd.CreateAnchor(null, 'links', data[key], data[key], true);
        p.appendChild(a);
        li.appendChild(p);
    }   
}

async function ShowPHP()
{
    container.innerHTML = '';
}

async function ShowOtherStuff()
{
    container.innerHTML = '';
}