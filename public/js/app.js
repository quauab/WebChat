$(document)
.ready(function(){    
    $('#textInput').on('click', function(){
		addTextInput();
	});
    
    $('#passwordInput').on('click', function(){
		addPasswordInput();
	});
   
    $('#emailInput').on('click', function(){
		addEmailInput();
	});
    
    $('#numberInput').on('click', function(){
		addNumberInput();
	});

	if (document.title === 'Chat Admin') {
        initDateTime();
    }	
     
    /*
   $('.update-button').on('click', function(){
        var id = $(this).data('id');
        var url = '/user/account/' + id;
        $.ajax({
            url:url,
            type:'GET',
            success:function(data){window.location.href=url;},
            error:function(err) {console.log(err);}
        });
    });
    
    $('.delete-button').on('click', function(){
        var id = $(this).data('id') + ':' + $(this).data('rev');
        var url = '/user/delete/' + id;
        var csrf = $(this).data('csrf');
        if (confirm('Are you sure you want to delete this record?')) {
            $.ajax({
                url:url,
                data:{_csrf:csrf},
                type:'DELETE',
                success:function(data){window.location.href = '/user/accounts';},
                error:function(err) {console.log(err);}
            });
        }
    });//*/
})
.foundation()

function addTextInput() {
	var divParent = newElement('div'),
		span = newElement('span'),
        italic = newElement('i'),
		remove = newElement('span'),
        italicRemove = newElement('i'),
		input = newElement('input');

	var count = childCount(element('form')) + 1,
        name = 'input' + count;
        
    if (confirm('Do you want to name the input?')) {
        var newName = prompt('Enter input name');
        if (newName.length) {
            name = newName;
        }
    }
    
    /*
    
        <div class="input-group" >
            <span class="input-group-label"><i class="fi-pencil"></i></span>
            <input class="input-group-field" type="text" placeholder="Name">
        </div>
    */

	addAttribute('class', 'input-group', divParent);
	addAttribute('class', 'input-group-label', span);
    addAttribute('class', 'fa fa-pencil', italic);
    
    addAttribute('class', 'input-group-field', input);
	addAttribute('placeholder', cfc(name), input);
    addAttribute('type', 'text', input);
    addAttribute('id', name, input);
    
	addAttribute('class', 'input-group-label', remove);
    addAttribute('class', 'fi-x', italicRemove);
    
	addAttribute('name', name, input);

	addHandler(remove, 'click', function() {
		element('form').removeChild(divParent);
	});
    
    $(italic).appendTo(span);    
    $(italicRemove).appendTo(remove);
    $(span).appendTo(divParent);
    $(input).appendTo(divParent);
    $(remove).appendTo(divParent);
	$(divParent).appendTo('.form');
}

function addNumberInput() {
	var divParent = newElement('div'),
		span = newElement('span'),
        italic = newElement('i'),
		remove = newElement('span'),
        italicRemove = newElement('i'),
		input = newElement('input');

	var count = childCount(element('form')) + 1,
        name = 'input' + count;
        
    if (confirm('Do you want to name the input?')) {
        var newName = prompt('Enter input name');
        if (newName.length) {
            name = newName;
        }
    }
    
    /*
    
        <div class="input-group" >
            <span class="input-group-label"><i class="fi-pencil"></i></span>
            <input class="input-group-field" type="text" placeholder="Name">
        </div>
    */

	addAttribute('class', 'input-group', divParent);
	addAttribute('class', 'input-group-label', span);
    addAttribute('class', 'fa fa-sort-numeric-asc', italic);
    
    addAttribute('class', 'input-group-field', input);
	addAttribute('placeholder', cfc(name), input);
    addAttribute('type', 'number', input);
    addAttribute('id', name, input);
    
	addAttribute('class', 'input-group-label', remove);
    addAttribute('class', 'fi-x', italicRemove);
    
	addAttribute('name', name, input);

	addHandler(remove, 'click', function() {
		element('form').removeChild(divParent);
	});
    
    $(italic).appendTo(span);    
    $(italicRemove).appendTo(remove);
    $(span).appendTo(divParent);
    $(input).appendTo(divParent);
    $(remove).appendTo(divParent);
	$(divParent).appendTo('.form');
}

function addPasswordInput() {
    var divParent = newElement('div'),
		span = newElement('span'),
        italic = newElement('i'),
		remove = newElement('span'),
        italicRemove = newElement('i'),
		input = newElement('input');

	var count = childCount(element('form')) + 1,
        name = 'input' + count;
        
    if (confirm('Do you want to name the input?')) {
        var newName = prompt('Enter input name');
        if (newName.length) {
            name = newName;
        }
    }
    
    /*
    
        <div class="input-group" >
            <span class="input-group-label"><i class="fi-pencil"></i></span>
            <input class="input-group-field" type="text" placeholder="Name">
        </div>
    */

	addAttribute('class', 'input-group', divParent);
	addAttribute('class', 'input-group-label', span);
    addAttribute('class', 'fa fa-lock', italic);
    
    addAttribute('class', 'input-group-field', input);
	addAttribute('placeholder', cfc(name), input);
    addAttribute('type', 'password', input);
    addAttribute('id', name, input);
    
	addAttribute('class', 'input-group-label', remove);
    addAttribute('class', 'fi-x', italicRemove);
    
	addAttribute('name', name, input);

	addHandler(remove, 'click', function() {
		element('form').removeChild(divParent);
	});
    
    $(italic).appendTo(span);    
    $(italicRemove).appendTo(remove);
    $(span).appendTo(divParent);
    $(input).appendTo(divParent);
    $(remove).appendTo(divParent);
	$(divParent).appendTo('.form');
}

function addEmailInput() {
	var divParent = newElement('div'),
		span = newElement('span'),
        italic = newElement('i'),
		remove = newElement('span'),
        italicRemove = newElement('i'),
		input = newElement('input');

	var count = childCount(element('form')) + 1,
        name = 'input' + count;
        
    if (confirm('Do you want to name the input?')) {
        var newName = prompt('Enter input name');
        if (newName.length) {
            name = newName;
        }
    }
    
    /*
    
        <div class="input-group" >
            <span class="input-group-label"><i class="fi-pencil"></i></span>
            <input class="input-group-field" type="text" placeholder="Name">
        </div>
    */

	addAttribute('class', 'input-group', divParent);
	addAttribute('class', 'input-group-label', span);
    addAttribute('class', 'fa fa-envelope', italic);
    
    addAttribute('class', 'input-group-field', input);
	addAttribute('placeholder', cfc(name), input);
    addAttribute('type', 'email', input);
    addAttribute('id', name, input);
    
	addAttribute('class', 'input-group-label', remove);
    addAttribute('class', 'fi-x', italicRemove);
    
	addAttribute('name', name, input);

	addHandler(remove, 'click', function() {
		element('form').removeChild(divParent);
	});
    
    $(italic).appendTo(span);    
    $(italicRemove).appendTo(remove);
    $(span).appendTo(divParent);
    $(input).appendTo(divParent);
    $(remove).appendTo(divParent);
	$(divParent).appendTo('.form');
}

function clock() {
    interval = doInterval(dateTime,1);
}

function dateTime() {
	elements().clock.innerHTML = stamp();
}

function elements() {
	return {
		clock:element('clock')
	};
}

function initDateTime() {
    interval = doInterval(dateTime,1);
}

function dateTime() {
	elements().navbottom.innerHTML = stamp();
}

function elements() {
	return {
		navtop:element('navbarheadertop'),
		navbottom:element('navbarheaderbottom')
	};
}
