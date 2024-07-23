const box = document.querySelector(".box");
const btn = document.querySelector(".searchbtn");
const search = document.querySelector(".search");
const back = document.querySelector(".searchback");
const ingredients = document.querySelector(".ingredients");
const icon = document.querySelector(".fa-magnifying-glass");
btn.addEventListener("click", () => {
    search.classList.contains('active');
    ingredients.classList.contains('items-hide');
    if (search.classList.contains('active')) {
        box.value = ''
    }
    else {
        search.classList.add('active');
        box.focus();
    }
    if (ingredients.classList.contains('items-hide')) {
        box.value = ''
    }
    else {
        ingredients.classList.add('items-hide');
        box.focus();
    }
    icon.classList.remove('fa-beat');


});
back.addEventListener("click", () => {
    box.value = '';
    search.classList.remove('active');
    ingredients.classList.remove('items-hide');
    if (!icon.classList.contains('fa-bounce')) {
        icon.classList.add('fa-beat')
    }
});


function hideShowPass() {
    let passText = document.getElementById('pass');
    let showBtn = document.getElementById('hide1');
    let hideBtn = document.getElementById('hide2');

    if (passText.type === 'password') {
        passText.type = 'text';
        showBtn.style.display = 'block';
        hideBtn.style.display = 'none';
    } else {
        passText.type = 'password';
        showBtn.style.display = 'none';
        hideBtn.style.display = 'block';
    }

}

function checkStrengthAndValidate() {
    const pass = document.getElementById('pass');
    const strength = document.getElementById('strength');
    const strengthText = document.getElementById('strength-text');
    const requirementList = document.querySelectorAll('.rules li');

    if (pass.value.length > 0) {
        strength.style.display = 'block';

        if (pass.value.length < 6) {
            strengthText.innerHTML = 'Weak';
            strength.style.color = 'red';
        }
        if (pass.value.length >= 6) {
            strengthText.innerHTML = 'Medium'; strength.style.color = 'red';
        }
        if (pass.value.length >= 8) {
            strengthText.innerHTML = 'Good'; strength.style.color = 'rgb(4, 113, 238)';
        }
        if (pass.value.length >= 10) {
            strengthText.innerHTML = 'Very Strong'; strength.style.color = 'green';
        }
    }
    else {
        strength.style.display = 'none';
    }

    const requirements = [
        { regex: /.{8,}/, index: 0 }, //minimum 8 chars
        { regex: /[0-9]/, index: 1 }, // atleast one number
        { regex: /[a-z]/, index: 2 }, // atleast one lowercase letter
        { regex: /[^A-Za-z0-9]/, index: 3 }, // atleast one spacial character
        { regex: /[A-Z]/, index: 4 }, // atleast one uppercase letter
    ];

    requirements.forEach(item => {
        const isValid = item.regex.test(pass.value);
        const requirementItem = requirementList[item.index];
        if (isValid) {
            requirementItem.firstElementChild.classList.add('fa-check');
            requirementItem.firstElementChild.classList.remove('fa-circle');
            requirementItem.classList.add('valid');

        } else {
            requirementItem.firstElementChild.classList.add('fa-circle');
            requirementItem.firstElementChild.classList.remove('fa-check');
            requirementItem.classList.remove('valid');
        }
    });

}

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en'
    }, 'google_translate_element');
}

function languageChanger() {
    var language = document.getElementById('google_translate_element').value;
    var selectField = document.querySelector('#google_translate_element select');
    for (var i = 0; i < selectField.children.length; i++) {
        var option = selectField.children[i];
        if (option.value == language) {
            selectField.selectedIndex = i;
            selectField.dispatchEvent(new Event('change'));
        }
    }
}

