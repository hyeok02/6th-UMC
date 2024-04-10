document.getElementById('submit').addEventListener('click', function() {
    // 이름 입력 필드와 에러 메시지 요소 가져오기
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('name-error');

    // 이름이 빈 문자열인 경우 에러 메시지 출력
    if (!nameInput.value.trim()) {
        nameError.textContent = '이름을 입력하세요.';
    } else {
        nameError.textContent = '';
        // 이름이 입력되어 있으면 모달 표시
        document.getElementById('modal').style.display = 'block';
    }
});

// 모달 닫기 버튼 클릭 시 실행될 함수
document.getElementById('close1').addEventListener('click', function() {
    // 모달 숨김
    document.getElementById('modal').style.display = 'none';
});

// 문서가 로드될 때 실행될 함수
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const emailInput = document.getElementById('email');
    const ageInput = document.getElementById('age');
    const passwordInput = document.getElementById('password');
    const password2Input = document.getElementById('password2');
    const submitBtn = document.getElementById('submit');

    // 폼 제출 시 실행될 함수
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // 이메일, 나이, 비밀번호가 모두 유효한 경우 모달 표시
        if (validateEmail(emailInput.value) && validateAge(ageInput.value) && validatePassword()) {
            document.getElementById('modal').style.display = 'block';
        }
    });

    // 이메일 입력 필드 값이 변경될 때 실행될 함수
    emailInput.addEventListener('input', function () {
        validateEmail(emailInput.value);
        validateSubmitButton();
    });

    // 나이 입력 필드 값이 변경될 때 실행될 함수
    ageInput.addEventListener('input', function () {
        validateAge(ageInput.value);
        validateSubmitButton();
    });

    // 비밀번호 입력 필드 값이 변경될 때 실행될 함수
    passwordInput.addEventListener('input', function () {
        validatePassword();
        validateSubmitButton();
    });

    // 비밀번호 확인 입력 필드 값이 변경될 때 실행될 함수
    password2Input.addEventListener('input', function () {
        validatePassword();
        validateSubmitButton();
    });

    // 이메일 유효성 검사 함수
    function validateEmail(email) {
        const emailError = document.getElementById('email-error');
        if (!email.includes('@')) {
            emailError.textContent = '올바른 이메일 주소를 입력하세요.';
            return false;
        }
        emailError.textContent = '';
        return true;
    }

    // 나이 유효성 검사 함수
    function validateAge(age) {
        const ageError = document.getElementById('age-error');
        const parsedAge = parseInt(age);
        if (isNaN(parsedAge) || parsedAge < 0 || parsedAge !== parseFloat(age)) {
            ageError.textContent = '올바른 나이를 입력하세요.';
            return false;
        } else if (parsedAge < 19) {
            ageError.textContent = '우리 영화 사이트는 19살 이상만 가입이 가능합니다.';
            return false;
        }
        ageError.textContent = '';
        return true;
    }

    // 비밀번호 유효성 검사 함수
    function validatePassword() {
        const password = passwordInput.value;
        const password2 = password2Input.value;
        const passwordError = document.getElementById('password-error');

        if (password.length < 4) {
            passwordError.textContent = '비밀번호는 최소 4자리 이상이어야 합니다.';
            return false;
        } else if (password.length > 12) {
            passwordError.textContent = '비밀번호는 최대 12자리까지 가능합니다.';
            return false;
        } else if (!/[A-Za-z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
            passwordError.textContent = '비밀번호는 영어, 숫자, 특수 문자를 모두 포함해야 합니다.';
            return false;
        } else if (password !== password2) {
            passwordError.textContent = '비밀번호 확인이 일치하지 않습니다.';
            return false;
        }
        passwordError.textContent = '';
        return true;
    }

    // 제출 버튼 활성화/비활성화 함수
    function validateSubmitButton() {
        const emailValid = validateEmail(emailInput.value);
        const ageValid = validateAge(ageInput.value);
        const passwordValid = validatePassword();
        submitBtn.disabled = !(emailValid && ageValid && passwordValid);
    }
});