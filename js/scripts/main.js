import { StorageManager } from '../classes/StorageManager.js';
let storageManager = new StorageManager();
let buttons;
let inner;

document.addEventListener('DOMContentLoaded', ()=>
{
    inner = document.getElementsByClassName('inner')[0];
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
    buttons['btn1'].addEventListener('click', ()=>
    {
        SwitchButton('btn1');
        storageManager.WriteSS('lastPage', 'btn1');        
        let container = document.getElementsByClassName('portfolio')[0];
        container.classList.add('red');
        container.classList.remove('yellow', 'blue');
    });

    buttons['btn2'].addEventListener('click', ()=>
    {
        SwitchButton('btn2');
        storageManager.WriteSS('lastPage', 'btn2');
        let container = document.getElementsByClassName('portfolio')[0];
        container.classList.add('yellow');
        container.classList.remove('red', 'blue');
    });

    buttons['btn3'].addEventListener('click', ()=>
    {
        SwitchButton('btn3');
        storageManager.WriteSS('lastPage', 'btn3');
        let container = document.getElementsByClassName('portfolio')[0];
        container.classList.add('blue');
        container.classList.remove('red', 'yellow');
    });

    buttons['flip1'].addEventListener('click', ()=>
    {
        inner.style.transform = 'rotateY(180deg)';
    });

    buttons['flip2'].addEventListener('click', ()=>
    {
        inner.style.transform = 'rotateY(0deg)';
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

function ContinueSession()
{
    let session = storageManager.ReadSS('lastPage');
    if(session !== null)
    {
        buttons[session].click();
    }
}