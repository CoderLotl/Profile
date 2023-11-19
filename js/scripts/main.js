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
    buttons = 
    {
        btn1: document.getElementById('btn1'),
        btn2: document.getElementById('btn2'),
        btn3: document.getElementById('btn3'),
        flip1: document.getElementById('flip1'),
        flip2: document.getElementById('flip2'),
    };

    Init();
});

function Init()
{
    container = document.getElementsByClassName('portfolio')[0];    
    buttons['btn1'].addEventListener('click', ()=>
    {
        SwitchButton('btn1');
        //ShowHTML();    
        storageManager.WriteSS('lastPage', 'btn1');                
        container.classList.add('red');
        container.classList.remove('yellow', 'blue');
    });

    buttons['btn2'].addEventListener('click', ()=>
    {
        SwitchButton('btn2');
        storageManager.WriteSS('lastPage', 'btn2');        
        container.classList.add('yellow');
        container.classList.remove('red', 'blue');
    });

    buttons['btn3'].addEventListener('click', ()=>
    {
        SwitchButton('btn3');
        storageManager.WriteSS('lastPage', 'btn3');        
        container.classList.add('blue');
        container.classList.remove('red', 'yellow');
    });

    buttons['flip1'].addEventListener('click', ()=>
    {
        main.style.transform = 'rotateY(180deg)';
        //document.getElementById('front').style.visibility = 'hidden';
        //document.getElementById('back').style.visibility = 'unset';
    });

    buttons['flip2'].addEventListener('click', ()=>
    {
        main.style.transform = 'rotateY(0deg)';
        //document.getElementById('front').style.visibility = 'unset';
        //document.getElementById('back').style.visibility = 'hidden';
    });
}

function SwitchButton(selected)
{
    for(let key in buttons)
    {
        if(key != selected)
        {
            buttons[key].style.backgroundColor = '';
        }
        else
        {
            buttons[key].style.backgroundColor = 'yellowgreen';
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
    let data = links[0];
    for(let key in data)
    {
        let p = document.createElement('p');
        p.textContent = key + ": ";
        p.classList.add('link-tittle');
        let a = dd.CreateAnchor(null, 'links', data[key], data[key]);
        p.appendChild(a);
        container.appendChild(p);
    }   
}

async function ShowPHP()
{
    
}