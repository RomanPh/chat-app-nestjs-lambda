import { socket } from './socket.js';
import { messagesEl, addMessageToTop } from './messages.js';

export let offset = 0;
export let total = 0;
export let loading = false;
export let allLoaded = false;
const limit = 10;

export function initScroll() {
  messagesEl.addEventListener('scroll', () => {
    if (messagesEl.scrollTop < 50 && !loading && !allLoaded) {
      loadMessages();
    }
  });
}

export function setTotal(val) {
  total = val;
}

export function increaseOffset(amount) {
  offset += amount;
}

function loadMessages() {
  if (loading || allLoaded || offset >= total) return;

  loading = true;
  socket.emit('get_history', { limit, offset }, (messages) => {
    if (messages.length === 0) {
      allLoaded = true;
      loading = false;
      return;
    }

    const prevHeight = messagesEl.scrollHeight;
    messages.forEach(addMessageToTop);
    increaseOffset(messages.length);
    loading = false;

    const newHeight = messagesEl.scrollHeight;
    messagesEl.scrollTop += newHeight - prevHeight;
  });
}