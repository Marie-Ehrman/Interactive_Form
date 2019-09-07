/*********** Marie Ehrman's Unit 3 Project. Interactive Form ***********/


//focus the name field when the page loads
$('#name').focus();

//initially the 'other job' description in job role section
$('#other_title').hide();


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
        if($('#design').val() === 'js puns'){

            //show the first 3 options of shirt color
            if ( i < 4)  {  

                $('#color option').eq(i).removeAttr('selected', true);
                $('#color option').eq(1).attr('selected', true);
                $('#color option').eq(i).show();
            //hide the last 3 options of shirt color
            } else {

                $('#color option').eq(i).hide();

            }

        //if "I <3 JS" is chosen as the shirt design, enter into this conditional
        } else if($('#design').val() === 'heart js'){

            if ( i > 3)  {
            
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

//Create an element to display the total activity cost and append it to activities
$('.activities').append('<label>Total Cost: </label>');

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

    //Update and display the total activity cost learned about .prop() on stack overflow
    if ($($checkbox).prop('checked') == true){
        $totalCost += parseInt($activityCost);
    } else {
        $totalCost -= parseInt($activityCost);
    }
    console.log($totalCost);

    //Disable conflicting activities
    const $activityTime = $($checkbox).attr(`data-day-and-time`);

    $('.activities').each(function (i) {

        $($checkbox).eq(i)
    }

});








/********** PAYMENT SECTION **********/

$('#payment option').eq(0).hide();

$('#payment').change(function (){
    if ( $('#payment').val() === 'Credit Card'){
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();
    } 
    else if ( $('#payment').val() === 'PayPal'){
        $('#paypal').show();
        $('#bitcoin').hide();
        $('#credit-card').hide();
    }
    else if ( $('#payment').val() === 'Bitcoin'){
        $('#bitcoin').show();
        $('#credit-card').hide();
        $('#paypal').hide();
    }


});


/********** FORM VALIDATION SECTION **********/
