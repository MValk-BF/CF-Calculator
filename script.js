document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('carbon-footprint-form');
    const steps = document.querySelectorAll('.step');
    let currentStep = 0;

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
    }

    function nextStep() {
        if (currentStep < steps.length - 1) {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        }
    }

    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    }

    function validateStep(stepIndex) {
        let isValid = true;
        const percentageFields = document.querySelectorAll('.step#step-3 input[type="number"]');
        const foodFields = document.querySelectorAll('.step#step-6 input[type="number"]');

        if (stepIndex === 3) {
            let totalPercentage = 0;
            percentageFields.forEach(field => {
                if (field.id !== 'commuteKm') {
                    totalPercentage += parseInt(field.value) || 0;
                }
            });
            if (totalPercentage !== 100) {
                document.getElementById('percentage-warning').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('percentage-warning').style.display = 'none';
            }
        }

        if (stepIndex === 6) {
            let totalDays = 0;
            foodFields.forEach(field => {
                totalDays += parseInt(field.value) || 0;
            });
            if (totalDays !== 7) {
                document.getElementById('food-warning').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('food-warning').style.display = 'none';
            }
        }

        return isValid;
    }

    function fillEmptyFields() {
        const numberFields = document.querySelectorAll('input[type="number"]');
        numberFields.forEach(field => {
            if (field.value === '') {
                if (field.id === 'householdSize') {
                    field.value = 1;
                } else {
                    field.value = 0;
                }
            }
        });
    }
    
    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep === steps.length - 2) {
                fillEmptyFields();
            }
            nextStep();
        });
    });

    document.querySelectorAll('.prev-btn').forEach(button => {
        button.addEventListener('click', prevStep);
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        fillEmptyFields();

        // Gather form data
        const formData = {
            email: document.getElementById('email').value,
            busFlights: document.getElementById('busFlights').value,
            persFlights: document.getElementById('persFlights').value,
            commuteKm: document.getElementById('commuteKm').value,
            commuteHome: document.getElementById('commuteHome').value,
            commuteTrain: document.getElementById('commuteTrain').value,
            commuteOV: document.getElementById('commuteOV').value,
            commuteCar: document.getElementById('commuteCar').value,
            commuteEV: document.getElementById('commuteEV').value,
            commuteMove: document.getElementById('commuteMove').value,
            bustravelTrain: document.getElementById('bustravelTrain').value,
            bustravelOV: document.getElementById('bustravelOV').value,
            bustravelCar: document.getElementById('bustravelCar').value,
            bustravelEV: document.getElementById('bustravelEV').value,
            perstravelTrain: document.getElementById('perstravelTrain').value,
            perstravelOV: document.getElementById('perstravelOV').value,
            perstravelCar: document.getElementById('perstravelCar').value,
            perstravelEV: document.getElementById('perstravelEV').value,
            vegan: document.getElementById('vegan').value,
            veggie: document.getElementById('veggie').value,
            fish: document.getElementById('fish').value,
            meat: document.getElementById('meat').value,
            elecUse: document.getElementById('elecUse').value,
            elecType: document.getElementById('elecType').value,
            heatingUse: document.getElementById('heatingUse').value,
            heatingType: document.getElementById('heatingType').value,
            householdSize: document.getElementById('householdSize').value,
            clothing: document.getElementById('clothing').value,
            smallElec: document.getElementById('smallElec').value,
            largeElec: document.getElementById('largeElec').value,
            furniture: document.getElementById('furniture').value,
            shareData: document.getElementById('shareData').checked
        };

        function submitHiddenForm() {
            const hiddenForm = document.getElementById('hiddenZapierForm');
    
            Object.keys(formData).forEach(key => {
                if (hiddenForm[key]) {
                hiddenForm[key].value = formData[key];
                }
            });

            hiddenForm.submit();

            // Redirect to results page after a short delay
            setTimeout(() => {
                window.location.href = "https://carbon-footprint-demo.webflow.io/results";
            }, 1000); // Adjust delay if needed
        }

        
        // Submit the hidden form
        submitHiddenForm();
            alert('Form submitted successfully!');
            window.location.href = "#/results";
    });

    showStep(currentStep);
});
