const tg = (window as any).Telegram.WebApp;

export default function useTelegram() {
  function onClose() {
    tg.close();
  }
  return { tg, onClose };
}
