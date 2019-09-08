/*********** Marie Ehrman's Unit 3 Project. Interactive Form ***********/



//global variables for inputs

const $name = $('#name').val();
const $email = $('#email').val();
const $ccNum = $('#cc-num').val();
const $ccZip = $('#zip').val();
const $cvv = $('#cvv').val();


//focus the name field when the page loads
$('#name').focus();


/********** JOB ROLE SECTION **********/


//initially the 'other job' description in job role section
$('#other_title').hide();


//show the "Other" field if other is chosen under Job Role
$('#title').change( function () {

    if( $(this).val() === 'other'){

         $('#other_title').show();

    } else {

        $('#other_title').hide();
    }
});

//hide the “Select Theme” <option> element from showing up in the in the dropdwon menu.
$('#design option').eq(0).hide();

//update the “Color” field to say “Please select a T-shirt theme”.
$('#color').prepend('<option selected>Please select a T-shirt theme</option>');

//initially hide the colors in the “Color” drop down menu.
$('#color option').each(function (i) {
    if (i>=0){
    $('#color option').eq(i).hide();
    }
});


/********** T-SHIRT SECTION **********/


//create change event to handle the choice between shirt design
$('#design').change(function (){

    $('#color option').each(function (i) {

        $('#color option').eq(0).hide();
        
        //if "JS Puns" is chosen as the shirt design, enter into this conditional
        if ( $('#design').val() === 'js puns' ){

            //show the first 3 options of shirt color
            if ( i < 4 )  {  

                $('#color option').eq(i).removeAttr('selected', true);
                $('#color option').eq(1).attr('selected', true);
                $('#color option').eq(i).show();
                
            //hide the last 3 options of shirt color
            } else {

                $('#color option').eq(i).hide();

            }

        //if "I <3 JS" is chosen as the shirt design, enter into this conditional
        } else if ( $('#design').val() === 'heart js' ){

            if ( i > 3 )  {
            
            //show the last 3 options of shirt color
            $('#color option').eq(i).removeAttr('selected', true);
            $('#color option').eq(4).attr('selected', true);
            $('#color option').eq(i).show();
            
            //hide the first 3 options of shirt color
            } else {

                $('#color option').eq(i).hide();
            }
        }

    });

});


/********** ACTIVITY SECTION **********/

//CALCULATE COST

//Create an element to display the total activity cost and append it to activities
let $totalCostElement = $('<label></label>');

$('.activities').append($totalCostElement);

//set activities total cost to 0 initially
let $totalCost = 0;

//Listen for changes in the Activity section
$('.activities').change( function (e) {



    //variable to see if the boxes are checked
    const $checkbox = e.target;

 

    //variable to collect the 'data-cost' from the checked box
    let $activityCost = $($checkbox).attr('data-cost');

    //convert 'data-cost' string to an integer and bypass the $
    $activityCost =  parseInt($activityCost.replace("$", ""));

    //Update and display the total activity cost 
    if ($($checkbox).prop('checked') == true){
        $totalCost += parseInt($activityCost);
    } else {
        $totalCost -= parseInt($activityCost);
    }

    //set the text of the total cost element equal to the string ‘Total:
    //$’ with the current value of the total cost variable
    $($totalCostElement).text('Total: $' + $totalCost);


    //DISABLE CONFLICTING ACTIVITIES


    //set the clicked activity
    let $selectedActivity = $($checkbox).attr(`data-day-and-time`);

    //get the input elements in the activities fieldset
    let $activityInput = $('.activities input');

    //loop through the activities input elements that were declared above
    $($activityInput).each( function (i) {

        //if activity time is the same as selected input's AND the indexed 
        //activities name doesn't match the one that was clicked
        if ( $selectedActivity === $activityInput.eq(i).attr(`data-day-and-time`) && 
             $($activityInput).eq(i).attr(`name`) !== $($checkbox).attr(`name`)){

                //If the clicked activity was checked, then set the matching 
                //activity element's `disabled` property to `true`
                if ($($checkbox).prop('checked')){

                    $($activityInput).eq(i).attr('disabled', true);

                // If the clicked activity was unchecked, then set the matching 
                //activity element's `disabled` property to `false`.
                } else {

                    $($activityInput).eq(i).attr('disabled', false);

                }
        }

    });

});



/********** PAYMENT SECTION **********/

//Hide “Select Payment Method” so it doesn’t show up in the drop down menu.
$('#payment option').eq(0).hide();

//loop through elements of the payment section
$('#payment').change(function (){

    //if Credit Card is selected, only display this section of the form
    if ( $('#payment').val() === 'Credit Card'){
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();
    } 
       
    //else if PayPal is selected, only display this section of the form
    else if ( $('#payment').val() === 'PayPal'){
        $('#paypal').show();
        $('#bitcoin').hide();
        $('#credit-card').hide();
    }
    
    //else if Bitcoin is selected, only display this section of the form
    else if ( $('#payment').val() === 'Bitcoin'){
        $('#bitcoin').show();
        $('#credit-card').hide();
        $('#paypal').hide();
    }
});



/********** FORM VALIDATION SECTION **********/

function nameValidation ($name){

    if (/^[A-Za-z]+(\s[A-Za-z]+)?(\s[A-Za-z]+)?$/.test($name) === false){

        $('#name').append('<span>Please enter your name</span>');
        $('#name').css('border', 'red');
        return /^[A-Za-z]+(\s[A-Za-z]+)?(\s[A-Za-z]+)?$/.test($('#name').val());

    } else {

        $('#name').css('border', 'green');
        return /^[A-Za-z]+(\s[A-Za-z]+)?(\s[A-Za-z]+)?$/.test($('#name').val());

    }
}

function emailValidation ($email){

    if( /^[^@]+@[^@.]+\.[a-z]+(\.[a-z]+)?$/i.test($email) === false){

        $('#email').append('<span>Please enter your email address</span>');
        $('#email').css('border', 'red');
        return /^[^@]+@[^@.]+\.[a-z]+(\.[a-z]+)?$/i.test($email);

    } else {

        $('#email').css('border', 'green');
        return /^[^@]+@[^@.]+\.[a-z]+(\.[a-z]+)?$/i.test($email);

    }
}

//Activity 
function activityValidation ($activityInput){

    $($activityInput).each( function (i) {

        if ( $($checkbox).eq(i).prop('checked') === false){

            $('.activities input').css('border', 'red');
            return false;
        }
    });
}

//$('button').on('click', activityValidation ($activityInput));

//Credit Card validation (only if Credit Card is picked)
//ensure 13-16 #s are entered
function ccNumValidation ($ccNum){
    
    if (/^(\d{4}\s?){3}\d{4}$/.test($ccNum) === false){

        $('#cc-num').append('<span>Please enter a valid Credit Card Number</span>');
        $('#cc-num').css('border', 'red');
        return /^(\d{4}\s?){3}\d{4}$/.test($ccNum);

    } else {

        $('#cc-num').css('border', 'green');
        return /^(\d{4}\s?){3}\d{4}$/.test($ccNum);

    }
}

//Credit Card Zip validation (only if Credit Card is picked)
function ccZipValidation ($ccZip){
   
    if (/^\d{5}$/.test($ccZip) === false){
        
        $('#zip').append('<span>Please enter a Zip Code</span>');
        $('#zip').css('border', 'red');
        return /^\d{5}$/.test($ccZip);

    } else {

        $('#zip').css('border', 'green');
        return /^\d{5}$/.test($ccZip);

    }
}

//Credit Card CVV# validation (only if Credit Card is picked)
function cvvValidation ($cvv){
    
    if (/^\d{3}&/.test($cvv) === false){

        $('#cvv').append('<span>Please enter a cvv(found on back of card)</span>');
        $('#cvv').css('border', 'red');
        return /^\d{3}&/.test($cvv);

    } else {

        $('#cvv').css('border', 'green');
        return /^\d{3}&/.test($cvv);

    }
}

function isValid(){

    if(!nameValidation($name) || !emailValidation($email)|| !activityValidation($activityInput)){

        return false;
    }


}


$('form').on('submit', function(isValid){

        if(isValid){
        $('form').preventDefault();
        }
});