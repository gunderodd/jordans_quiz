// notes:

// some of the logic for checkboxes and so on has to do with if i create the quiz to let multiple answers work on each question


function finish() {
    // this is just added to the result for the redirect link set by the 'location' property at the end
    var ext = '.html';
    // why is none part of this? it would make sense if the result was inconclusive, but that isn't how this works currently
    var results = new Array("none", "apple", "banana", "orange");
    var nums = new Array(4);


    // for loop, one-liner, 0-1-2-3, where...as it runs, it sets each value in var nums to 0?
    for (var i = 0; i < nums.length; i++) nums[i] = 0;
    // 3 cycles, selects the 'name' property of each question, setting equal to 'q' 
    // (a question is defined by the inputs that use the same 'name' property)
    for (var i = 1; i <= 3; i++) {
        var q = document.forms['quiz'].elements['question_' + i];
        // this probably can be deleted, i'm doing radio buttons
        if (q[0].type == 'checkbox') {
            var n = 0;
        }
        // for each possible answer
        for (var j = 0; j < q.length; j++) {
            // if it is selected
            if (q[j].checked) {
                // retrieve the 'value' which is a number i set, 1-3, to match each possible outcome
                var a = q[j].value.split(',');
                // add up the total for that outcome
                for (var k = 0; k < a.length; k++) {
                    nums[a[k]]++;
                }
                // hmmm...if it is a radio button, stop. if it is something else, add +1? why?
                if (q[j].type == 'radio') break;
                else n++;
            }
            // if 
            if (j == q.length - 1 && q[j].type == 'radio') { nums[0]++; }
        }
        // again, no checkbox, so i don't have to worry about it? not really sure
        if (q[0].type == 'checkbox' 
        && ((document.forms['quiz'].elements['question_' + i + '_min'] 
        && n < document.forms['quiz'].elements['question_' + i + '_min'].value) 
        || (document.forms['quiz'].elements['question_' + i + '_max'] 
        && n > document.forms['quiz'].elements['question_' + i + '_max'].value))) nums[0]++;
    }
    // j again, but it is out of scope or whatever so we can use it. same with i
    var j = new Array('0');
    for (i in nums) if (nums[i] > nums[j[0]]) { j = new Array('' + i); } else if (nums[i] == nums[j[0]]) j[j.length] = i;
    
    // i didn't write these. wonder what they would have done?
    //var o = '';for(var i in results)o+=results[i]+'='+nums[i]+'\n';
    //alert(o);
    
    // check if any were missed
    if (nums[0] != 0) {
        alert('You missed or incorrectly answered ' + nums[0] + ' questions!');
    }
    // ummmm...not sure
    else if (j[0] == 0) {
        alert('No result could be determined.');
    }
    // back to the first comment, this actually loads the result page by setting location equal to it
    else {
        location = results[j[0]] + ext;
    }
}