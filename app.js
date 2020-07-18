const brutoForm = document.querySelector('#brutoForm');
const again = document.querySelector('.again');

// Event Listeners
brutoForm.addEventListener('submit', calculateGrossSallary);
again.addEventListener('click', () => location.reload());

// Functions
function calculateGrossSallary(e){
    // Get the input value
    const brutoInput = document.querySelector('#brutoInput').value;
    
    if(brutoInput === ''){
        // Show alert
        alert('Внесете износ во даденото поле.', 'alert-danger', 'red');
    } else if(Number(brutoInput) < 21776){
        // Show alert
        alert('Внесете износ поголем од 21.776 во даденото поле.', 'alert-danger', 'red');
    } 
    else{
        document.querySelector('.loader').className = 'loaderGif';
        document.querySelector('.calcForm').id = 'calcForm1';

        // Calculate
        calculateNet();

        // Show Alert
        setTimeout(() => {
            document.querySelector('.loaderGif').remove();
            const table = document.querySelector('.tableContainer');
            table.id = 'table';
            const calc = document.querySelector('.calc');
            calc.className = 'loader';
            const again = document.querySelector('.again');
            again.id = 'again1';
            alert('Успешно пресметано!', 'alert-success');
        }, 2000);

        // Clear Input
        clearInput();
    }

    e.preventDefault();
}

function calculateNet(){
    // Get input value
    const brutoInput = document.querySelector('#brutoInput').value;

    // Turn input from string to number
    const brutoNum = Number(brutoInput);

    // Percentage of gross pay for pension insurance
    const pension = (brutoNum * 18.8) / 100;
    document.querySelector('#pension').textContent = `${Math.round(pension)} ден.`;

    // Sallary after pension insurance
    const brutoPens = brutoNum - pension;

    // Health Insurance
    const healthInsurance = (brutoNum * 7.5) / 100;
    document.querySelector('#healthInsurance').textContent = `${Math.round(healthInsurance)} ден.`;

    // Sallary after pensian insurance, health insurance
    const brutoHealth = brutoPens - healthInsurance;

    // Injury insurance
    const injury = (brutoNum * 0.5) / 100;
    document.querySelector('#injury').textContent = `${Math.round(injury)} ден.`;

    // Sallary after injury
    const brutoI = brutoHealth - injury;

    // Unemploument insurance
    const unemployed = (brutoNum * 1.2) / 100;
    document.querySelector('#unemployment').textContent =`${Math.round(unemployed)} ден.`;

    // Sallary after unemployment insurance
    const afterP = brutoI - unemployed;

    // Total insurance
    const totalP = pension + healthInsurance + injury + unemployed;
    document.querySelector('#afterP').textContent = `${Math.round(totalP)} ден.`;

    // Taxes
    const taxLayOff = afterP - 8228;
    document.querySelector('#taxLayOff').textContent = `${Math.round(taxLayOff)} ден.`;

    const taxPercentage = (taxLayOff * 10) / 100;
    document.querySelector('#taxPercentage').textContent = `${Math.round(taxPercentage)} ден.`;

    // Calculate Net Pay
    const netPay = brutoNum - totalP - taxPercentage;
    document.querySelector('#netPay').textContent = `${Math.round(netPay)} ден.`;

    document.querySelector('.loadGross').textContent = `Бруто: ${brutoNum}  |`;
    document.querySelector('.loadNet').textContent = ` Нето: ${Math.round(netPay)}`;

    // Formula 
    document.querySelector('#gross').textContent = `(Бруто Плата) ${brutoNum}`;
    document.querySelector('#insurance').textContent = `(Вкупно Придонеси) ${Math.round(totalP)}`;
    document.querySelector('#tax').textContent = `(ПДД) ${Math.round(taxPercentage)}`;
    document.querySelector('#net').textContent = `(Нето Плата) ${Math.round(netPay)}`;
}

function clearInput(){
    document.querySelector('#brutoInput').value = '';
}

function alert(message, className, color){
    // Remove current alert
    clearAlert();
    
    // Create Div
    const div = document.createElement('div');
    // Add class
    div.className = `text-center alert ${className}`;
    // Add Text
    div.appendChild(document.createTextNode(message));
    // Get Parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#brutoForm');
    form.style.borderColor = color;
    // Insert in container before form
     container.insertBefore(div, form);

    //  Remove After 3 seconds
    setTimeout(() => {
        clearAlert();
    }, 3000);
}

function clearAlert(){
    currentAlert = document.querySelector('.alert');

    if(currentAlert){
        currentAlert.remove();
    }
}