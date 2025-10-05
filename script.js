// 結合文字のUnicode範囲
const combiningChars = [
  // 結合ダイアクリティカルマーク (U+0300–U+036F)
  ...Array.from({ length: 0x036F - 0x0300 + 1 }, (_, i) => String.fromCharCode(0x0300 + i)),
  // 結合ダイアクリティカルマーク補助 (U+1AB0–U+1AFF)
  ...Array.from({ length: 0x1AFF - 0x1AB0 + 1 }, (_, i) => String.fromCharCode(0x1AB0 + i)),
  // 結合ダイアクリティカルマーク拡張 (U+1DC0–U+1DFF)
  ...Array.from({ length: 0x1DFF - 0x1DC0 + 1 }, (_, i) => String.fromCharCode(0x1DC0 + i)),
  // 結合半記号 (U+20D0–U+20FF)
  ...Array.from({ length: 0x20FF - 0x20D0 + 1 }, (_, i) => String.fromCharCode(0x20D0 + i)),
  // 結合ダイアクリティカルマーク拡張補助 (U+1E000–U+1E02F)
  ...Array.from({ length: 0x1E02F - 0x1E000 + 1 }, (_, i) => String.fromCodePoint(0x1E000 + i)),
];

// DOM要素
const baseTextInput = document.getElementById('baseText');
const lengthSlider = document.getElementById('length');
const lengthNumber = document.getElementById('lengthNumber');
const lengthValue = document.getElementById('lengthValue');
const densitySlider = document.getElementById('density');
const densityNumber = document.getElementById('densityNumber');
const densityValue = document.getElementById('densityValue');
const generateBtn = document.getElementById('generateBtn');
const outputDiv = document.getElementById('output');
const copyBtn = document.getElementById('copyBtn');
const copyMessage = document.getElementById('copyMessage');

// スライダーと数値入力の同期
lengthSlider.addEventListener('input', (e) => {
  const value = e.target.value;
  lengthValue.textContent = value;
  lengthNumber.value = value;
});

lengthNumber.addEventListener('input', (e) => {
  const value = e.target.value;
  lengthSlider.value = value;
  lengthValue.textContent = value;
});

densitySlider.addEventListener('input', (e) => {
  const value = e.target.value;
  densityValue.textContent = value;
  densityNumber.value = value;
});

densityNumber.addEventListener('input', (e) => {
  const value = e.target.value;
  densitySlider.value = value;
  densityValue.textContent = value;
});

// 結合文字を生成する関数
function generateCombiningText(baseText, length, density) {
  if (!baseText) {
    return 'ベース文字を入力してください';
  }

  let result = '';
  const baseChars = baseText.split('');
  
  for (let i = 0; i < length; i++) {
    // ベース文字を順番に使用
    const baseChar = baseChars[i % baseChars.length];
    result += baseChar;
    
    // ランダムな結合文字を追加
    for (let j = 0; j < density; j++) {
      const randomCombining = combiningChars[Math.floor(Math.random() * combiningChars.length)];
      result += randomCombining;
    }
  }
  
  return result;
}

// 生成ボタンのイベント
generateBtn.addEventListener('click', () => {
  const baseText = baseTextInput.value;
  const length = parseInt(lengthNumber.value);
  const density = parseInt(densityNumber.value);
  
  if (!baseText) {
    alert('ベース文字を入力してください');
    return;
  }
  
  const generated = generateCombiningText(baseText, length, density);
  outputDiv.textContent = generated;
  copyMessage.textContent = '';
});

// コピーボタンのイベント
copyBtn.addEventListener('click', async () => {
  const text = outputDiv.textContent;
  
  if (!text || text === 'ここに生成された文字が表示されます') {
    copyMessage.textContent = 'コピーする文字がありません';
    copyMessage.style.color = '#e74c3c';
    return;
  }
  
  try {
    await navigator.clipboard.writeText(text);
    copyMessage.textContent = 'コピーしました！';
    copyMessage.style.color = '#27ae60';
    
    setTimeout(() => {
      copyMessage.textContent = '';
    }, 2000);
  } catch (err) {
    copyMessage.textContent = 'コピーに失敗しました';
    copyMessage.style.color = '#e74c3c';
  }
});

// Enterキーで生成
baseTextInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    generateBtn.click();
  }
});

lengthNumber.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    generateBtn.click();
  }
});

densityNumber.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    generateBtn.click();
  }
});
