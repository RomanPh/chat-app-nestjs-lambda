import { socket } from './socket.js';
import { messagesEl, addMessageToBottom } from './messages.js';
import { initScroll, setTotal, increaseOffset } from './scroll.js';
import { getUserId } from './user.js';

const limit = 10;

document.addEventListener('DOMContentLoaded', () => {
  initScroll();

  socket.on('connect', () => {
    socket.emit('get_latest', { limit }, ({ messages, total: totalCount }) => {
      setTotal(totalCount);
      increaseOffset(limit);
      messages.reverse().forEach(addMessageToBottom);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    });
  });

  socket.on('message', (msg) => {
    addMessageToBottom(msg);
    setTotal(prev => prev + 1);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  });

  document.getElementById('sendBtn').addEventListener('click', send);
});

function send() {
  const input = document.getElementById('input');
  const message = {
    userId: getUserId(),
    content: input.value.trim()
  };
  if (message.content) {
    socket.emit('message', message);
    setTotal(prev => prev + 1);
  }
  input.value = '';
}
