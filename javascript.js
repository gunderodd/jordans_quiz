function finish() {
	var ext = '.html';
	var results = new Array("none","apple","orange","banana");
	var nums = new Array(4);
	for(var i = 0; i < nums.length; i++) nums[i] = 0;
	for(var i = 1; i <= 9; i++) {
		var q = document.forms['quiz'].elements['question_'+i];
		if(q[0].type=='checkbox') {
			var n = 0;
		}
		for(var j = 0; j < q.length; j++) {
			if(q[j].checked) {
				var a = q[j].value.split(',');
				for(var k = 0; k < a.length; k++) {
					nums[a[k]]++;
				}
				if(q[j].type=='radio') break;
                // n is only used for checkboxes/multiple answers
				else n++;
			}
            // this logs every marked radio input and its value property
            // console.log(q)
			if(j == q.length-1&&q[j].type=='radio') {nums[0]++;}
		}
		if(q[0].type=='checkbox'&&
        ((document.forms['quiz'].elements['question_'+i+'_min']&&
        n<document.forms['quiz'].elements['question_'+i+'_min'].value)||
        (document.forms['quiz'].elements['question_'+i+'_max']&&
        n>document.forms['quiz'].elements['question_'+i+'_max'].value))) nums[0]++;
	}
    var j = new Array('0');
    // this is the line where 'j', the result, is added to the list of all results (for multiple options)
    for (i in nums) if (nums[i] > nums[j[0]]) { j = new Array('' + i); }
    else if (nums[i] == nums[j[0]]) j[j.length] = i;

    if (j == 1) {
        console.log("apple")
    } else if (j == 2) {
        console.log("orange")
    } else {
        console.log("banana")
    }
	
    // the part that was commented out by generator
    //var o = '';for(var i in results)o+=results[i]+'='+nums[i]+'\n';
	//alert(o);
	
    if(nums[0]!=0) {
		alert('You missed or incorrectly answered '+nums[0]+' questions!');
	}
	else if(j[0]==0) {
		alert('No result could be determined.');
	}
	else {
		location = results[j[0]]+ext;
	}
}

// source: http://www.founderweb.com/quiz_generator/