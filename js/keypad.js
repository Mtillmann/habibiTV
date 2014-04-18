var Keypad = (function($){
    var keymap = {
        0 : ['-','_','.'],
        1 : [' '],
        2 : ['a','b','c'],
        3 : ['d','e','f'],
        4 : ['g','h','i'],
        5 : ['j','k','l'],
        6 : ['m','n','o'],
        7 : ['p','q','r','s'],
        8 : ['t','u','v'],
        9 : ['w','x','y','z']
    },delay = 600,
    public = {},
    lastInput = 0,
    lastKey = null,
    lastKeyIndex = 0,
    string = [];

    public.isOpen = false;

    public.open = function(input){
        string = (input || '').split('');
        lastKey = null;
        lastKeyIndex = 0;
        lastInput = null;
        public.isOpen = true;
        $('#keypad').show();
    };

    public.hide = function(){
        $('#keypad').hide();
    }

    public.input = function(key){
        if(key === 'e'){
            $('#go').click();
            public.hide();
            return;
        }
        if(key === 'b'){
            string.pop();
            $('#search').val(string.join(''));    
            return;
        }


        var now = Date.now();
        if(lastKey == key && lastInput + delay > now){
            string[string.length-1] = keymap[key][lastKeyIndex]
        }else{
            lastKeyIndex = 0;
            string[string.length] = keymap[key][lastKeyIndex]
        }
        lastKey = key;
        lastKeyIndex++;
        if(lastKeyIndex === keymap[key].length){
            lastKeyIndex = 0;
        }
        lastInput = now;
        $('#search').val(string.join(''));
    }

    public.moveLeft = function(){
        var active = $('#keypad .active'),
            index = active.data('index'),
            next = null;

        if(index == 1)next = 3;
        if(index == 2)next = 1;
        if(index == 3)next = 2;
        if(index == 4)next = 6;
        if(index == 5)next = 4;
        if(index == 6)next = 5;
        if(index == 7)next = 9;
        if(index == 8)next = 7;
        if(index == 9)next = 8;
        if(index == 'e')next = 'backspace';
        if(index == 0)next = 'enter';
        if(index == 'b')next = 0;

        $('#keypad .active').removeClass('active');
        $('#button_'+next).addClass('active');

    }
    public.moveRight = function(){
        var active = $('#keypad .active'),
            index = active.data('index'),
            next = null;

        if(index == 1)next = 2;
        if(index == 2)next = 3;
        if(index == 3)next = 1;
        if(index == 4)next = 5;
        if(index == 5)next = 6;
        if(index == 6)next = 4;
        if(index == 7)next = 8;
        if(index == 8)next = 9;
        if(index == 9)next = 7;
        if(index == 'e')next = 0;
        if(index == 0)next = 'backspace';
        if(index == 'b')next = 'enter';

        $('#keypad .active').removeClass('active');
        $('#button_'+next).addClass('active');

    }
    public.moveUp = function(){
        var active = $('#keypad .active'),
            index = active.data('index'),
            next = null;

        if(index == 1)next = 'enter';
        if(index == 2)next = 0;
        if(index == 3)next = 'backspace';
        if(index == 4)next = 1;
        if(index == 5)next = 2;
        if(index == 6)next = 3;
        if(index == 7)next = 4;
        if(index == 8)next = 5;
        if(index == 9)next = 6;
        if(index == 'e')next = 7;
        if(index == 0)next = 8;
        if(index == 'b')next = 9;

        $('#keypad .active').removeClass('active');
        $('#button_'+next).addClass('active');

    }
    public.moveDown = function(){
        var active = $('#keypad .active'),
            index = active.data('index'),
            next = null;

        if(index == 1)next = 4;
        if(index == 2)next = 5;
        if(index == 3)next = 6;
        if(index == 4)next = 7;
        if(index == 5)next = 8;
        if(index == 6)next = 9;
        if(index == 7)next = 'enter';
        if(index == 8)next = 0;
        if(index == 9)next = 'backspace';
        if(index == 'e')next = 1;
        if(index == 0)next = 2;
        if(index == 'b')next = 3;

        $('#keypad .active').removeClass('active');
        $('#button_'+next).addClass('active');

    }

    public.enter = function(){
        //$('#go').click();
        var active = $('#keypad .active'),
            index = active.data('index');

        public.input(index);
    }

    return public;
})(jQuery);