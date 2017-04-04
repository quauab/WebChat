$(document).ready(function(){
	if (document.title === 'Chat Admin') {
        initDateTime();
    }
});

function initDateTime() {
    interval = doInterval(dateTime,1);
}

function dateTime() {
	elements().timestamp.innerHTML = stamp();
}

function elements() {
	return {
		top:element('top-header'),
		timestamp:element('time-stamp')
	};
}
