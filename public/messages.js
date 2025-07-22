export const messagesEl = document.getElementById('messages');

export function addMessageToBottom(msg) {
  const li = document.createElement('li');
  li.textContent = `[${msg.userId}] ${msg.content}`;
  messagesEl.appendChild(li);
}

export function addMessageToTop(msg) {
  const li = document.createElement('li');
  li.textContent = `[${msg.userId}] ${msg.content}`;
  messagesEl.insertBefore(li, messagesEl.firstChild);
}