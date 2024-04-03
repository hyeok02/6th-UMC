document.getElementById('submit').addEventListener('click', function() {
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('name-error');

    if (!nameInput.value.trim()) {
        nameError.textContent = '이름을 입력하세요.';
    } else {
        nameError.textContent = '';
        document.getElementById('modal').style.display = 'block'; // 모달 표시
    }
});

document.getElementById('close1').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none'; // 모달 숨김
});