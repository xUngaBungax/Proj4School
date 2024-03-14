function showInstructions(language) {
    // Скрываем все языковые инструкции
    const allInstructions = document.getElementsByClassName('language-instructions');
    for (let i = 0; i < allInstructions.length; i++) {
        allInstructions[i].style.display = 'none';
    }

    // Показываем инструкции для выбранного языка
    const selectedInstructions = document.getElementById(language + '-instructions');
    if (selectedInstructions) {
        selectedInstructions.style.display = 'block';
    }
}