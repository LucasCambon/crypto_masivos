import { getWallet } from '../api/wallet-api.js';

window.addEventListener('DOMContentLoaded', async () => {
  const totalCard = document.querySelector('.total-card p:last-child');
  const walletList = document.querySelector('.wallet-list');
  const greet = document.querySelector('.portfolio-main p');

  const walletData = await getWallet();
  if (!walletData) return;

  // Renderize total
  const total = walletData.reduce((acc, w) => acc + (w.balance || 0), 0);
  if (totalCard) totalCard.textContent = `$${total}`;

  // Renderize list of currencies
  if (walletList) {
    walletList.innerHTML = walletData.map(w => `
      <div class="wallet-item" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <span style="font-size: 2.2rem;">${getCryptoIcon(w.symbol)}</span>
          <div>
            <span style="font-weight: bold; color: #fff;">${w.symbol}</span>
            <span style="color: #aaa; margin-left: 0.5rem;">${w.name}</span>
          </div>
        </div>
        <span style="font-weight: bold; color: #fff; font-size: 1.2rem;">$${w.balance}</span>
      </div>
    `).join('');
  }

  if (greet) greet.innerHTML = `Hola <b>${userName}</b> 👋`;
});

// Aux function for icons
function getCryptoIcon(symbol) {
  switch (symbol) {
    case 'BTC': return '🟧';
    case 'ETH': return '🟦';
    default: return '🪙';
  }
} 