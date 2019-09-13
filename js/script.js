/*********** Marie Ehrman's Unit 3 Project. Interactive Form ***********/


//focus the name field when the page loads
$('#name').focus();


/****************************** NAME SECTION ******************************/

// wanted to find a way to check validation on changes in a form field
// discovered the "keyup()" method after some research and decided to use it
// to handle such events


//if cursor goes to next field, the name field will be checked for errors
$('#name').keyup( function (){ nameValidation();} );


/****************************** EMAIL SECTION ******************************/

//if cursor goes to next field, the email field will be checked for errors
$('#mail').keyup( function (){ emailValidation();} );


/****************************** JOB ROLE SECTION ******************************/


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


/****************************** T-SHIRT SECTION ******************************/

$('#colors-js-puns').hide();

//create change event to handle the choice between shirt design
$('#design').change(function (){

    $('#colors-js-puns').show();

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



/****************************** ACTIVITY SECTION ******************************/

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

//validate activities list after each box is checked discovered the "change()"
// method after some research and decided to use it to handle this for checkboxes
$('.activities').change( function () { activityValidation(); });


/********** PAYMENT SECTION **********/

//Hide “Select Payment Method” so it doesn’t show up in the drop down menu.
$('#payment option').eq(0).hide();
$('#payment option').eq(1).attr('selected', true);

let ccSelected = true;

//set CC as the default payment option on page load
if ( $('#payment').val() === 'Credit Card'){
        ccSelected = true;
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();
} 

//listen for change event in the payment drop down menu
$('#payment').change(function (){

         //if Credit Card is selected, only display this section of the form
        if ( $('#payment').val() === 'Credit Card'){
                ccSelected = true;
                $('#credit-card').show();
                $('#paypal').hide();
                $('#bitcoin').hide();


        } 

        // else if PayPal is selected, only display this section of the form
        else if ( $('#payment').val() === 'PayPal'){
                ccSelected = false;
                $('#paypal').show();
                $('#bitcoin').hide();
                $('#credit-card').hide();

        }

        //else if Bitcoin is selected, only display this section of the form
        else if ( $('#payment').val() === 'Bitcoin'){
                ccSelected = false;
                $('#bitcoin').show();
                $('#credit-card').hide();
                $('#paypal').hide();

        }
});


//if cursor goes to next field, the credit card number field will be checked for errors
$('#cc-num').on( 'keyup', function (){ ccNumValidation(); });

//if cursor goes to next field, the zip field will be checked for errors
$('#zip').on('keyup', function (){ ccZipValidation(); });

//if cursor goes to next field, the cvv field will be checked for errors
$('#cvv').on('keyup', function (){ cvvValidation(); });


/****************************** FORM VALIDATION SECTION ******************************/

//validate name input
function nameValidation (){

    const $nameValue = $('#name').val();

    //if the name input doesn't meet the requirements highlight the field
    //red and append a message, also return false 
    if (/^[A-Za-z]+(\s[A-Za-z]+)?(\s[A-Za-z]+)?$/i.test($nameValue) === true){
    
            $('#name').css('border-color', '#6f9ddc');

            return true;

    } else {
     
            $('#name').attr('placeholder', 'Please enter your name');
            $('#name').css('border-color', 'salmon');

            return false;

    }
}

//validate email input

function emailValidation (){

    const $emailValue = $('#mail').val();

    //if the email input doesn't meet the requirements highlight the field
    //red and append a message, also return false

    if( /^[^@]+@[^@.]+\.[a-z]+(\.[a-z]+)?$/i.test($emailValue) === true){

        $('#mail').css('border-color', '#6f9ddc');
        
            return true;

    } else {

            $('#mail').attr('placeholder', 'Please enter your email');
            $('#mail').css('border-color', 'salmon');

            return false;

    }
}

//Validate Activity field by checking the cost. If no activities are checked cost will be $0
function activityValidation (){
let $activityError = '<span>*Please select at least one Activity</span>';

    if($totalCost > 0){

            $('.activities legend').css('color', 'black');
            $('span').remove();

            return true;
        
    } else {

            $('span').remove();
            $('.activities legend').append($activityError);

            return false;

    }
}

//Credit Card validation (only if Credit Card is picked)
//ensure 13-16 #s are entered

function ccNumValidation (){

    const $ccNumValue = $('#cc-num').val();

    //if the credit card number input doesn't meet the requirements highlight the field
    //red and append a message, also return false 
    if (/^(\d{4}\s?){3}(\d?){4}$/.test($ccNumValue) === true){

            $('#cc-num').css('border-color', '#6f9ddc');

            return true;

    } else {

            $('#cc-num').attr('placeholder', 'Please enter a Credit Card Number');
            $('#cc-num').css('border-color', 'salmon');

            return false;

    }
}

// //Credit Card Zip validation (only if Credit Card is picked)
function ccZipValidation (){
   
    const $ccZipValue = $('#zip').val();

    //if the zip input doesn't meet the requirements highlight the field
    //red and append a message, also return false 
    if (/^\d{5}$/.test($ccZipValue) === true){

            $('#zip').css('border-color', '#6f9ddc');

            return true;

    } else {

                
            $('#zip').attr('placeholder', 'Enter Zip Code');
            $('#zip').css('border-color', 'salmon');

            return false;


    }
}

// //Credit Card CVV# validation (only if Credit Card is picked)
function cvvValidation (){
    
    const $cvvValue = $('#cvv').val();

    //if the cvv input doesn't meet the requirements highlight the field
    //red and append a message, also return false 
    if (/^\d{3}$/.test($cvvValue) === true){

            $('#cvv').css('border-color', '#6f9ddc');

            return true;

    } else {

            $('#cvv').attr('placeholder', 'Enter CVV');
            $('#cvv').css('border-color', 'salmon');

            return false;
    }
}



//function to test validation functions
function isValid(){
    
    //call functions to initialize values
    nameValidation();
    emailValidation();
    activityValidation();
    ccNumValidation();
    ccZipValidation();
    cvvValidation();

    //ic CC is selected we want to test all validation functions
    if(ccSelected === true){

            if (nameValidation() && 
            emailValidation() && 
            activityValidation() && 
            ccNumValidation() && 
            ccZipValidation() && 
            cvvValidation()){

                        nameValidation();
                        emailValidation();
                        activityValidation();
                        ccNumValidation();
                        ccZipValidation();
                        cvvValidation();
                return true;
                }
    //if CC is not selected we only test the name, email and activity fields for validity
    } else if (nameValidation() && emailValidation() && activityValidation()){

                nameValidation();
                emailValidation();
                activityValidation();

            return true;

            } else {

                nameValidation();
                emailValidation();
                activityValidation();
                if (ccSelected === true){
                ccNumValidation();
                ccZipValidation();
                cvvValidation();
            }

            return false;

        }
}

//handler on submit button to call parent validation function 'isValid' and prevent default submit
//behavior if any of them are false
$('form').on('submit', function (e){


        if(!isValid()){

            e.preventDefault();
        }

});